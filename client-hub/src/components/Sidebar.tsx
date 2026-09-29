"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Home, Users, Settings, PlusCircle, Search, X } from 'lucide-react';
import { createLead } from '@/app/actions';

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ business_name: '', phone_number: '', website: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createLead({
      ...formData,
      status: 'New',
      lead_type: 'Manual Entry'
    });
    setIsSubmitting(false);
    setIsModalOpen(false);
    setFormData({ business_name: '', phone_number: '', website: '' });
  };

  return (
    <div className="h-screen w-64 glass-panel border-r border-border/50 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold gradient-text mb-2">Client Hub</h1>
        <p className="text-xs text-secondary uppercase tracking-widest font-semibold">Command Center</p>
      </div>
      
      <nav className="flex-1 px-4 mt-6 space-y-2">
        <Link href="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-foreground transition-colors group">
          <Home size={18} className="text-secondary group-hover:text-primary transition-colors" />
          <span className="font-medium text-sm">Command Center</span>
        </Link>
        <Link href="/clients" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-foreground transition-colors group">
          <Users size={18} className="text-secondary group-hover:text-primary transition-colors" />
          <span className="font-medium text-sm">Client CRM</span>
        </Link>
        <Link href="/prospecting" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-foreground transition-colors group">
          <Search size={18} className="text-secondary group-hover:text-primary transition-colors" />
          <span className="font-medium text-sm">Prospecting</span>
        </Link>
        <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-foreground transition-colors group">
          <svg className="w-[18px] h-[18px] text-secondary group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          <span className="font-medium text-sm text-[#308882]">Dashboard</span>
        </Link>
      </nav>
      
      <div className="p-4 mt-auto">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl shadow-lg transition-colors"
        >
          <PlusCircle size={18} />
          <span className="font-semibold text-sm">New Client</span>
        </button>
      </div>

      {isModalOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0b1120] border border-border/50 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">Add New Client</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-secondary hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Business Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.business_name}
                  onChange={e => setFormData({...formData, business_name: e.target.value})}
                  className="w-full bg-black/40 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={formData.phone_number}
                  onChange={e => setFormData({...formData, phone_number: e.target.value})}
                  className="w-full bg-black/40 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Website URL (Optional)</label>
                <input 
                  type="url" 
                  value={formData.website}
                  onChange={e => setFormData({...formData, website: e.target.value})}
                  className="w-full bg-black/40 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-secondary hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-primary hover:bg-primary-dark text-white transition-colors"
                >
                  {isSubmitting ? 'Saving...' : 'Save Client'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
