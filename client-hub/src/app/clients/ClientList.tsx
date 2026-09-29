'use client';

import { useState } from 'react';
import { Lead } from '@/lib/db';
import { deleteLeads, updateLeadStatus, updateLead } from '../actions';
import { Trash2, Edit3, Mail, CheckSquare, X, Save } from 'lucide-react';

export default function ClientList({ initialLeads }: { initialLeads: Lead[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Lead>>({});

  const toggleSelect = (id: number) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === initialLeads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(initialLeads.map(l => l.id)));
    }
  };

  const handleDeleteSelected = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.size} clients?`)) return;
    setIsDeleting(true);
    await deleteLeads(Array.from(selectedIds));
    setSelectedIds(new Set());
    setIsDeleting(false);
  };

  const handleEditClick = (lead: Lead) => {
    setEditingId(lead.id);
    setEditForm({ business_name: lead.business_name, phone_number: lead.phone_number, status: lead.status });
  };

  const handleSaveEdit = async (id: number) => {
    await updateLead(id, editForm);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      {/* Action Bar */}
      <div className="flex justify-between items-center p-4 border-b border-border/30 bg-black/20">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="form-checkbox h-4 w-4 rounded border-secondary/50 bg-transparent text-primary focus:ring-primary focus:ring-offset-0"
              checked={selectedIds.size === initialLeads.length && initialLeads.length > 0}
              onChange={toggleSelectAll}
            />
            <span className="text-sm font-medium text-secondary">
              {selectedIds.size > 0 ? `${selectedIds.size} Selected` : 'Select All'}
            </span>
          </label>
        </div>
        
        {selectedIds.size > 0 && (
          <div className="flex space-x-2 animate-in fade-in slide-in-from-right-4">
            <button className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors">
              <Mail size={14} />
              <span>Draft Pitch</span>
            </button>
            <button 
              onClick={handleDeleteSelected}
              disabled={isDeleting}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-colors"
            >
              <Trash2 size={14} />
              <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="overflow-auto flex-1">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="sticky top-0 bg-[#131c2b] border-b border-border/50 text-secondary z-10">
            <tr>
              <th className="w-12 p-4"></th>
              <th className="p-4 font-semibold tracking-wide">Business Name</th>
              <th className="p-4 font-semibold tracking-wide">Status</th>
              <th className="p-4 font-semibold tracking-wide">Rescue Score</th>
              <th className="p-4 font-semibold tracking-wide">Phone</th>
              <th className="p-4 font-semibold tracking-wide text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {initialLeads.map((lead) => {
              const isSelected = selectedIds.has(lead.id);
              return (
                <tr 
                  key={lead.id} 
                  className={`hover:bg-white/5 transition-colors group cursor-default ${isSelected ? 'bg-primary/5' : ''}`}
                >
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-4 w-4 rounded border-secondary/50 bg-transparent text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                      checked={isSelected}
                      onChange={() => toggleSelect(lead.id)}
                    />
                  </td>
                  <td className="p-4">
                    {editingId === lead.id ? (
                      <input 
                        type="text" 
                        value={editForm.business_name || ''} 
                        onChange={(e) => setEditForm({...editForm, business_name: e.target.value})}
                        className="w-full bg-black/40 border border-border/50 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary"
                      />
                    ) : (
                      <>
                        <div className="font-semibold text-foreground max-w-[300px] truncate" title={lead.business_name}>
                          {lead.business_name}
                        </div>
                        <div className="text-xs text-secondary truncate">
                          {lead.website || 'No Website'}
                        </div>
                      </>
                    )}
                  </td>
                  <td className="p-4">
                    {editingId === lead.id ? (
                      <select 
                        value={editForm.status || 'New'} 
                        onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                        className="bg-black/40 border border-border/50 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary text-foreground"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Pitched">Pitched</option>
                        <option value="Closed">Closed</option>
                      </select>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-secondary">
                        {lead.status}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${Math.min(100, Math.max(0, lead.rescue_score))}%` }} 
                        />
                      </div>
                      <span className="text-xs font-semibold">{lead.rescue_score}</span>
                    </div>
                  </td>
                  <td className="p-4 text-secondary">
                    {editingId === lead.id ? (
                      <input 
                        type="text" 
                        value={editForm.phone_number || ''} 
                        onChange={(e) => setEditForm({...editForm, phone_number: e.target.value})}
                        className="w-28 bg-black/40 border border-border/50 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary"
                      />
                    ) : (
                      lead.phone_number || 'N/A'
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {editingId === lead.id ? (
                      <div className="flex justify-end space-x-1">
                        <button onClick={() => handleSaveEdit(lead.id)} className="p-1.5 text-primary hover:bg-white/5 rounded-md">
                          <Save size={16} />
                        </button>
                        <button onClick={handleCancelEdit} className="p-1.5 text-secondary hover:text-red-400 hover:bg-white/5 rounded-md">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleEditClick(lead)} className="p-2 text-secondary hover:text-primary transition-colors rounded-lg hover:bg-white/5">
                        <Edit3 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {initialLeads.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-secondary">
                  No clients found in the database. 
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
