import React, { useState, useEffect } from 'react';
import { Search, Trash2, FolderOpen, Calendar, DollarSign, Globe, User, Save, Clock, StickyNote, CheckCircle2, MapPin } from 'lucide-react';

export default function ClientDatabase({ onLoadProfile }) {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingNotesId, setSavingNotesId] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Local state copy of notes being edited
  const [editingNotes, setEditingNotes] = useState({});

  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    try {
      if (window.api && window.api.getClients) {
        const records = await window.api.getClients();
        // Sort clients by newest first
        records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setClients(records);

        // Prepopulate editing notes state
        const notesObj = {};
        records.forEach(c => {
          notesObj[c.id] = c.notes || '';
        });
        setEditingNotes(notesObj);
      } else {
        // Fallback to browser localStorage
        const records = JSON.parse(localStorage.getItem('retrofit_clients') || '[]');
        records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setClients(records);

        const notesObj = {};
        records.forEach(c => {
          notesObj[c.id] = c.notes || '';
        });
        setEditingNotes(notesObj);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch client records from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSaveNotes = async (client) => {
    setSavingNotesId(client.id);
    try {
      const updatedClient = {
        ...client,
        notes: editingNotes[client.id] || ''
      };
      
      if (window.api && window.api.saveClient) {
        await window.api.saveClient(updatedClient);
      } else {
        // Fallback write
        const localData = JSON.parse(localStorage.getItem('retrofit_clients') || '[]');
        const updatedData = localData.map(c => c.id === client.id ? updatedClient : c);
        localStorage.setItem('retrofit_clients', JSON.stringify(updatedData));
      }
      
      // Update local clients list state
      setClients(prev => prev.map(c => c.id === client.id ? updatedClient : c));
      
      showToast('Notes updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to save client notes.');
    } finally {
      setSavingNotesId(null);
    }
  };

  const handleDeleteClient = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete the client record for "${name}"? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      if (window.api && window.api.deleteClient) {
        await window.api.deleteClient(id);
      } else {
        // Fallback delete
        const localData = JSON.parse(localStorage.getItem('retrofit_clients') || '[]');
        const filteredData = localData.filter(c => c.id !== id);
        localStorage.setItem('retrofit_clients', JSON.stringify(filteredData));
      }
      setClients(prev => prev.filter(c => c.id !== id));
      showToast('Client record deleted');
    } catch (err) {
      console.error(err);
      alert('Failed to delete client record.');
    }
  };

  const handleLoadProfile = (client) => {
    onLoadProfile(client);
    showToast(`Loaded profile for ${client.businessName || 'client'}`);
  };

  const showToast = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Filter clients based on search query
  const filteredClients = clients.filter(c => {
    const q = searchQuery.toLowerCase();
    return (
      (c.clientName || '').toLowerCase().includes(q) ||
      (c.businessName || '').toLowerCase().includes(q) ||
      (c.url || '').toLowerCase().includes(q)
    );
  });

  const getEstimatedFee = (c) => {
    let base = 299;
    let includedPages = 5;

    if (c.packageType === 'new-build') {
      base = 499;
      includedPages = 5;
    } else if (c.packageType === 'overhaul') {
      base = 599;
      includedPages = 10;
    } else {
      base = 299;
      includedPages = 5;
    }

    let extraPageCost = 0;
    const pages = c.pages || 1;
    if (pages > includedPages) {
      extraPageCost = (pages - includedPages) * 75;
    }

    let addOnCosts = 0;
    if (c.bookingFeature) addOnCosts += 150;
    if (c.seoFeature) addOnCosts += 149;
    if (c.logoFeature) addOnCosts += 99;

    return base + extraPageCost + addOnCosts;
  };

  return (
    <div className="space-y-6 font-sans text-zinc-900 dark:text-zinc-100 max-w-6xl mx-auto">
      
      {/* Toast Alert Banner */}
      {successMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce transition-all">
          <CheckCircle2 className="h-5 w-5" /> {successMsg}
        </div>
      )}

      {/* Header controls bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            Client Archive Database
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Review saved client records, manage followups, and reload estimates.</p>
        </div>
        
        {/* Search Input bar */}
        <div className="relative w-full sm:w-80">
          <span className="absolute left-3 top-2.5 text-zinc-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search by client, business, or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>

      {/* Database Error Alert */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <span className="text-sm text-zinc-400 font-semibold">Reading archive database...</span>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 p-12 text-center shadow-sm">
          <Clock className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-300">No client records found</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
            {searchQuery ? 'No records match your query. Try a different search term.' : 'Records will appear here once you save a client from the Estimates sheet tab.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClients.map((client) => {
            const fee = getEstimatedFee(client);
            return (
              <div
                key={client.id}
                className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-4"
              >
                
                {/* Client Profile Header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Client Record #{client.id}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                          {client.packageType === 'new-build' ? 'New Build ($499)' : client.packageType === 'overhaul' ? 'Overhaul ($599)' : 'Rescue ($299)'}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-50 mt-0.5">
                        {client.businessName || '[Unnamed Business]'}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold font-mono px-2.5 py-1 rounded-lg text-xs">
                      <DollarSign className="h-3 w-3" /> {fee}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-zinc-100 dark:border-zinc-900 py-3">
                    <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                      <User className="h-3.5 w-3.5 text-zinc-400" />
                      <span className="truncate">{client.clientName || 'No Name'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{new Date(client.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 col-span-2">
                      <Globe className="h-3.5 w-3.5 text-zinc-400" />
                      <a
                        href={client.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 font-mono hover:underline truncate"
                      >
                        {client.url}
                      </a>
                    </div>
                    {client.address && (
                      <div className="flex items-center gap-1.5 text-zinc-650 dark:text-zinc-400 col-span-2 pt-2 border-t border-zinc-100/30 dark:border-zinc-900/30">
                        <MapPin className="h-3.5 w-3.5 text-zinc-400 flex-shrink-0" />
                        <span className="truncate">{client.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Follow-up Notes Editor */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-400 flex items-center gap-1">
                      <StickyNote className="h-3.5 w-3.5" /> Followup Notes
                    </span>
                    <button
                      onClick={() => handleSaveNotes(client)}
                      disabled={savingNotesId === client.id}
                      className="text-blue-500 hover:text-blue-600 flex items-center gap-1 font-semibold"
                    >
                      <Save className="h-3 w-3" /> 
                      {savingNotesId === client.id ? 'Saving...' : 'Save Notes'}
                    </button>
                  </div>
                  <textarea
                    rows="2.5"
                    placeholder="Enter notes (e.g. Outreach email sent, call scheduled, client reviewing contract...)"
                    value={editingNotes[client.id] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingNotes(prev => ({ ...prev, [client.id]: val }));
                    }}
                    className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-800 dark:text-zinc-200 resize-none leading-relaxed"
                  />
                </div>

                {/* Card Actions Footer */}
                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 pt-3">
                  <button
                    onClick={() => handleDeleteClient(client.id, client.businessName)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/5 dark:hover:bg-red-500/10 p-2 rounded-lg transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleLoadProfile(client)}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-3.5 rounded-lg text-xs transition-colors"
                  >
                    <FolderOpen className="h-3.5 w-3.5" /> Load client workspace
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
