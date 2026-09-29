'use server';

import { getDb, Lead } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

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
