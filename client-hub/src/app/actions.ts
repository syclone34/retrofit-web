'use server';

import { getDb, Lead } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';

function getPlacesApiKey() {
  try {
    const envPath = path.resolve(process.cwd(), '../agency-hub/.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^PLACES_API_KEY=(.*)$/m);
    if (match && match[1]) {
      return match[1].trim();
    }
  } catch(e) {}
  return process.env.PLACES_API_KEY || '';
}

export async function deleteLeads(ids: number[]) {
  const db = getDb();
  try {
    const deleteAnalyticsStmt = db.prepare('DELETE FROM client_analytics WHERE lead_id = ?');
    const deleteLeadStmt = db.prepare('DELETE FROM leads WHERE id = ?');
    const deleteMany = db.transaction((deleteIds: number[]) => {
      for (const id of deleteIds) {
        try { deleteAnalyticsStmt.run(id); } catch(e) {}
        deleteLeadStmt.run(id);
      }
    });
    deleteMany(ids);
    revalidatePath('/clients');
    return { success: true };
  } catch (error) {
    console.error('Error deleting leads:', error);
    return { success: false, error: 'Failed to delete leads' };
  } finally {
    db.close();
  }
}

export async function updateLeadStatus(id: number, status: string) {
  const db = getDb();
  try {
    const stmt = db.prepare('UPDATE leads SET status = ? WHERE id = ?');
    stmt.run(status, id);
    revalidatePath('/clients');
    return { success: true };
  } catch (error) {
    console.error('Error updating status:', error);
    return { success: false, error: 'Failed to update status' };
  } finally {
    db.close();
  }
}

export async function updateLead(id: number, data: Partial<Lead>) {
  const db = getDb();
  try {
    const stmt = db.prepare(`
      UPDATE leads SET 
        business_name = COALESCE(?, business_name),
        phone_number = COALESCE(?, phone_number),
        status = COALESCE(?, status)
      WHERE id = ?
    `);
    stmt.run(data.business_name || null, data.phone_number || null, data.status || null, id);
    revalidatePath('/clients');
    return { success: true };
  } catch (error) {
    console.error('Error updating lead:', error);
    return { success: false, error: 'Failed to update lead' };
  } finally {
    db.close();
  }
}

export async function searchRealProspects(query: string) {
  const apiKey = getPlacesApiKey();
  if (!apiKey) {
    return { success: false, error: 'PLACES_API_KEY not found in agency-hub/.env' };
  }

  try {
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri'
      },
      body: JSON.stringify({ textQuery: query })
    });

    const data = await response.json();

    if (!data.places || data.places.length === 0) {
      return { success: true, count: 0 };
    }

    // Filter strictly to only businesses WITHOUT a website
    const targets = data.places.filter((p: any) => !p.websiteUri).slice(0, 5);
    
    if (targets.length === 0) {
      return { success: true, count: 0 };
    }

    const db = getDb();
    const insertStmt = db.prepare(`
      INSERT INTO leads (business_name, phone_number, address, email, keyword, date_found, status, lead_type, website, rescue_score, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((places: any[]) => {
      for (const place of places) {
        insertStmt.run(
          place.displayName?.text || 'Unknown Business',
          place.nationalPhoneNumber || 'N/A',
          place.formattedAddress || 'Unknown Address',
          '',
          query,
          new Date().toISOString(),
          'New',
          place.websiteUri ? 'Rescue Candidate' : 'No Website',
          place.websiteUri || '',
          0,
          'Sourced from Google Places API'
        );
      }
    });

    insertMany(targets);
    db.close();

    revalidatePath('/clients');
    return { success: true, count: targets.length };
  } catch (error) {
    console.error('Error fetching places:', error);
    return { success: false, error: 'Failed to fetch from Google Places' };
  }
}

export async function createLead(data: Partial<Lead>) {
  const db = getDb();
  try {
    const stmt = db.prepare(`
      INSERT INTO leads (business_name, phone_number, address, email, keyword, date_found, status, lead_type, website, rescue_score, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.business_name || '',
      data.phone_number || '',
      data.address || '',
      data.email || '',
      data.keyword || '',
      data.date_found || new Date().toISOString(),
      data.status || 'New',
      data.lead_type || 'No Website',
      data.website || '',
      data.rescue_score || 0,
      data.notes || ''
    );
    revalidatePath('/clients');
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    console.error('Error creating lead:', error);
    return { success: false, error: 'Failed to create lead' };
  } finally {
    db.close();
  }
}

export async function generateAndSendMonthlyReports() {
  const db = getDb();
  
  // Read SMTP Config
  const envPath = path.resolve(process.cwd(), '../agency-hub/.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const getEnv = (key: string) => {
    const match = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
    return match ? match[1].trim() : '';
  };

  const smtpServer = getEnv('SMTP_SERVER');
  const smtpPort = parseInt(getEnv('SMTP_PORT')) || 587;
  const smtpUser = getEnv('SMTP_USERNAME');
  const smtpPass = getEnv('SMTP_PASSWORD');

  if (!smtpUser || !smtpPass) {
    return { success: false, error: 'SMTP credentials missing in .env' };
  }

  const transporter = nodemailer.createTransport({
    host: smtpServer,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass }
  });

  try {
    const clients = db.prepare(`SELECT * FROM leads WHERE status IN ('Active', 'Client')`).all() as Lead[];
    
    let sentCount = 0;

    for (const client of clients) {
      if (!client.email) continue;

      // Generate PDF
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];
      doc.on('data', chunk => chunks.push(chunk));
      
      const pdfPromise = new Promise<Buffer>((resolve) => {
        doc.on('end', () => resolve(Buffer.concat(chunks)));
      });

      doc.fontSize(24).font('Helvetica-Bold').text('RetroFit Web Design', { align: 'center' });
      doc.fontSize(14).font('Helvetica').text('Monthly Performance Digest', { align: 'center' });
      doc.moveDown(2);
      
      doc.fontSize(16).font('Helvetica-Bold').text(`Client: ${client.business_name}`);
      doc.moveDown(0.5);
      doc.fontSize(12).font('Helvetica').text(`Generated on: ${new Date().toLocaleDateString()}`);
      doc.moveDown(2);
      
      // Pull recent analytics if available
      const analytics = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='client_analytics'").get()
        ? db.prepare('SELECT * FROM client_analytics WHERE lead_id = ? ORDER BY year DESC, month DESC LIMIT 1').get(client.id) as any
        : null;
      
      doc.fontSize(14).font('Helvetica-Bold').text('Performance Snapshot:');
      doc.moveDown(0.5);
      if (analytics) {
        doc.fontSize(12).font('Helvetica').text(`Website Traffic: ${analytics.traffic} visits`);
        doc.text(`Phone Calls Routed: ${analytics.calls}`);
        doc.text(`Quote Requests: ${analytics.quote_requests}`);
      } else {
        doc.fontSize(12).font('Helvetica').text(`Website Traffic: Data gathering...`);
        doc.text(`Phone Calls Routed: Tracking active`);
        doc.text(`Quote Requests: Tracking active`);
      }
      
      doc.moveDown(3);
      doc.fontSize(12).font('Helvetica-Oblique').text('Thank you for choosing RetroFit. Your speed and conversion metrics are continually being monitored to maximize your local lead capture.', { align: 'center' });
      
      doc.end();
      const pdfBuffer = await pdfPromise;

      // Send Email
      await transporter.sendMail({
        from: `"RetroFit Systems" <${smtpUser}>`,
        to: client.email,
        subject: `${client.business_name} - Monthly Performance Report`,
        text: `Hi ${client.business_name},\n\nPlease find your monthly web performance digest attached.\n\nBest,\nCole Fuller\nRetroFit Web Design`,
        attachments: [
          {
            filename: `Performance_Report_${new Date().toLocaleString('default', { month: 'short' })}.pdf`,
            content: pdfBuffer
          }
        ]
      });

      sentCount++;
    }

    return { success: true, message: `Sent ${sentCount} monthly reports.` };
  } catch (error) {
    console.error('Failed to send reports:', error);
    return { success: false, error: 'Failed to process reports.' };
  } finally {
    db.close();
  }
}

export async function generateSingleReport(clientId: number) {
  const db = getDb();
  try {
    const client = db.prepare('SELECT * FROM leads WHERE id = ?').get(clientId) as Lead;
    if (!client) return { success: false, error: 'Client not found' };

    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];
    doc.on('data', chunk => chunks.push(chunk));
    
    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
    });

    doc.fontSize(24).font('Helvetica-Bold').text('RetroFit Web Design', { align: 'center' });
    doc.fontSize(14).font('Helvetica').text('Monthly Performance Digest', { align: 'center' });
    doc.moveDown(2);
    
    doc.fontSize(16).font('Helvetica-Bold').text(`Client: ${client.business_name}`);
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text(`Generated on: ${new Date().toLocaleDateString()}`);
    doc.moveDown(2);
    
    const analytics = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='client_analytics'").get()
      ? db.prepare('SELECT * FROM client_analytics WHERE lead_id = ? ORDER BY year DESC, month DESC LIMIT 1').get(client.id) as any
      : null;
    
    doc.fontSize(14).font('Helvetica-Bold').text('Performance Snapshot:');
    doc.moveDown(0.5);
    if (analytics) {
      doc.fontSize(12).font('Helvetica').text(`Website Traffic: ${analytics.traffic} visits`);
      doc.text(`Phone Calls Routed: ${analytics.calls}`);
      doc.text(`Quote Requests: ${analytics.quote_requests}`);
    } else {
      doc.fontSize(12).font('Helvetica').text(`Website Traffic: Data gathering...`);
      doc.text(`Phone Calls Routed: Tracking active`);
      doc.text(`Quote Requests: Tracking active`);
    }
    
    doc.moveDown(3);
    doc.fontSize(12).font('Helvetica-Oblique').text('Thank you for choosing RetroFit. Your speed and conversion metrics are continually being monitored to maximize your local lead capture.', { align: 'center' });
    
    doc.end();
    const pdfBuffer = await pdfPromise;

    return { success: true, base64: pdfBuffer.toString('base64'), filename: `Performance_Report_${client.business_name.replace(/\s+/g, '_')}.pdf` };
  } catch (error) {
    console.error('Failed to generate report:', error);
    return { success: false, error: 'Failed to generate report.' };
  } finally {
    db.close();
  }
}
