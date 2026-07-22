import React, { useState, useEffect } from 'react';
import { History, Globe, Trash2, Calendar, FileCheck, ArrowRight } from 'lucide-react';

export default function HistoryTracker({ onSelectDomain }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const saved = JSON.parse(localStorage.getItem('retrofit_history') || '[]');
    setItems(saved);
  };

  const clearHistory = () => {
    localStorage.removeItem('retrofit_history');
    setItems([]);
  };

  const deleteItem = (id, e) => {
    e.stopPropagation();
    const updated = items.filter(item => item.id !== id);
    localStorage.setItem('retrofit_history', JSON.stringify(updated));
    setItems(updated);
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20';
    if (score >= 50) return 'bg-amber-500/10 text-amber-600 border border-amber-500/20';
    return 'bg-rose-500/10 text-rose-600 border border-rose-500/20';
  };

  return (
    <div className="bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
            <History className="h-5 w-5 text-zinc-500" /> Audit Log History
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Review previously audited client domains and load them for estimates.</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 hover:underline"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="p-12 text-center text-zinc-500 dark:text-zinc-400">
          <Globe className="h-10 w-10 mx-auto text-zinc-300 dark:text-zinc-700 mb-3" />
          <p className="font-semibold text-sm">No Audit Logs Found</p>
          <p className="text-xs text-zinc-400 mt-1">Audit logs will populate here once you run website reports.</p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectDomain(item.url)}
              className="p-5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-500 transition-colors">
                    {item.url}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {item.date}
                    </span>
                    <span className="h-1 w-1 bg-zinc-700 rounded-full"></span>
                    <span className="flex items-center gap-1 font-semibold text-zinc-300">
                      Lighthouse score: <span className={`px-1.5 py-0.5 rounded text-[10px] ${getScoreBadge(item.avgScore)}`}>{item.avgScore}%</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => deleteItem(item.id, e)}
                  className="p-2 text-zinc-400 hover:text-rose-500 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-1 text-xs font-semibold text-blue-500 group-hover:translate-x-1 transition-transform">
                  Load Audit <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
