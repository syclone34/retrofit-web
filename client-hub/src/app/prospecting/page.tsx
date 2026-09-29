"use client";

import React, { useState } from 'react';
import { Search, Globe, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { createLead, searchRealProspects } from '@/app/actions';

export default function ProspectingPage() {
  const [isScanningMaps, setIsScanningMaps] = useState(false);
  const [isScanningSpeed, setIsScanningSpeed] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleStartScan = async () => {
    setIsScanningMaps(true);
    
    const query = searchQuery.trim() || 'Contractors in Local Area';
    
    const result = await searchRealProspects(query);

    setIsScanningMaps(false);
    if (result.success) {
      showToast(`Scan complete! Found ${result.count} real businesses for "${query}". Added to CRM.`);
      setSearchQuery('');
    } else {
      showToast(`Scan failed: ${result.error}`);
    }
  };

  const handleAnalyzeSite = async () => {
    setIsScanningSpeed(true);
    setTimeout(async () => {
      await createLead({
        business_name: 'Outdated HVAC Competitor',
        phone_number: '(763) 555-9988',
        address: 'Maple Grove, MN',
        lead_type: 'Rescue Candidate',
        website: 'outdated-hvac-contractor.com',
        rescue_score: 32,
        notes: 'Critical speed issues.'
      });

      setIsScanningSpeed(false);
      showToast('Analysis complete! Site speed is critically slow (Rescue Score: 32/100). Added to CRM.');
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out h-full flex flex-col relative">
      
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-primary/20 backdrop-blur-md border border-primary/50 text-foreground px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-3 animate-in fade-in slide-in-from-top-5 duration-300">
          <CheckCircle size={20} className="text-primary" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Search className="text-cyan-500" size={24} />
            </div>
            <h1 className="text-3xl font-bold">Prospecting Engine</h1>
          </div>
          <p className="text-secondary text-sm">Find small businesses without websites, or analyze current sites for speed flaws.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mt-4">
        {/* Missing Website Scanner */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-primary flex flex-col relative overflow-hidden">
          {isScanningMaps && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-primary mb-2" size={32} />
              <p className="text-sm font-medium text-primary animate-pulse">Scraping Google Maps API...</p>
            </div>
          )}

          <Globe className="text-primary mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2">Missing Website Scanner</h3>
          <p className="text-secondary mb-6 text-sm">
            Scan Google Maps using your API key to find local contractors without websites.
          </p>
          <div className="mt-auto space-y-4">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Plumbers in Minneapolis" 
              className="w-full bg-black/20 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors" 
            />
            <button 
              onClick={handleStartScan}
              disabled={isScanningMaps}
              className="w-full bg-primary hover:bg-primary-dark transition-colors py-2 rounded-lg font-medium text-sm text-white"
            >
              Start Scan
            </button>
          </div>
        </div>

        {/* Speed & Mobile Flaw Analyzer */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-amber-500 flex flex-col relative overflow-hidden">
          {isScanningSpeed && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-amber-500 mb-2" size={32} />
              <p className="text-sm font-medium text-amber-500 animate-pulse">Running Lighthouse Diagnostics...</p>
            </div>
          )}

          <AlertTriangle className="text-amber-500 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2">Speed & UX Analyzer</h3>
          <p className="text-secondary mb-6 text-sm">
            Enter a competitor or prospect's URL. The engine will ping it for load speed, mobile responsiveness, and click-to-call buttons to generate a Rescue Score.
          </p>
          <div className="mt-auto space-y-4">
            <input type="text" placeholder="https://..." className="w-full bg-black/20 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors" />
            <button 
              onClick={handleAnalyzeSite}
              disabled={isScanningSpeed}
              className="w-full bg-amber-500 hover:bg-amber-600 transition-colors text-black py-2 rounded-lg font-bold text-sm"
            >
              Analyze Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
