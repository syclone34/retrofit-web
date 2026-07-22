import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Moon, Sun, Search, FileText, History, HelpCircle } from 'lucide-react';
import WebAnalyzer from './components/WebAnalyzer';
import ContractBuilder from './components/ContractBuilder';
import HistoryTracker from './components/HistoryTracker';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedAudits, setSelectedAudits] = useState([]);
  const [prefilledDomain, setPrefilledDomain] = useState('');

  // Handle theme switching
  useEffect(() => {
    const savedTheme = localStorage.getItem('retrofit_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;

    setDarkMode(initialDark);
    if (initialDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    localStorage.setItem('retrofit_theme', nextDark ? 'dark' : 'light');
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleAddAuditToScope = (auditTitle) => {
    setSelectedAudits(prev =>
      prev.includes(auditTitle)
        ? prev.filter(t => t !== auditTitle)
        : [...prev, auditTitle]
    );
  };

  const handleSelectDomainFromHistory = (domain) => {
    setPrefilledDomain(domain);
    setActiveTab('analyzer');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">

      {/* Header Shell */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] sticky top-0 z-30 no-print">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight flex items-center gap-1.5">
                RetroFit Audit & Contract Suite
                <span className="text-[10px] font-bold uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <Sparkles className="h-2.5 w-2.5" /> Client Tool
                </span>
              </h1>
              <p className="text-[10px] text-zinc-500">Website Diagnostic Analyzer & Project Contract Builder</p>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            title="Toggle theme mode"
          >
            {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">

        {/* Navigation Tabs bar */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 mb-8 no-print">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-all -mb-px ${activeTab === 'analyzer'
              ? 'border-blue-600 text-blue-600 dark:text-blue-500'
              : 'border-transparent text-zinc-400 hover:text-zinc-600 hover:border-zinc-300'
              }`}
          >
            <Search className="h-4 w-4" /> Web Analyzer
          </button>
          <button
            onClick={() => setActiveTab('contract')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-all -mb-px ${activeTab === 'contract'
              ? 'border-blue-600 text-blue-600 dark:text-blue-500'
              : 'border-transparent text-zinc-400 hover:text-zinc-600 hover:border-zinc-300'
              }`}
          >
            <FileText className="h-4 w-4" /> Contract Builder
            {selectedAudits.length > 0 && (
              <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                {selectedAudits.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-all -mb-px ${activeTab === 'history'
              ? 'border-blue-600 text-blue-600 dark:text-blue-500'
              : 'border-transparent text-zinc-400 hover:text-zinc-600 hover:border-zinc-300'
              }`}
          >
            <History className="h-4 w-4" /> Audit History
          </button>
        </div>

        {/* Tab View Switcher */}
        <div className="animate-fade-in">
          {activeTab === 'analyzer' && (
            <WebAnalyzer
              onAddAuditToScope={handleAddAuditToScope}
              selectedAudits={selectedAudits}
              prefilledUrl={prefilledDomain}
              clearPrefilled={() => setPrefilledDomain('')}
            />
          )}
          {activeTab === 'contract' && (
            <ContractBuilder
              selectedAudits={selectedAudits}
            />
          )}
          {activeTab === 'history' && (
            <HistoryTracker
              onSelectDomain={handleSelectDomainFromHistory}
            />
          )}
        </div>

      </main>

    </div>
  );
}
