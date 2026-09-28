'use server';

import { getDb, Lead } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteLeads(ids: number[]) {
  const db = getDb();
  try {
    const stmt = db.prepare('DELETE FROM leads WHERE id = ?');
    const deleteMany = db.transaction((deleteIds: number[]) => {
      for (const id of deleteIds) {
        stmt.run(id);
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
