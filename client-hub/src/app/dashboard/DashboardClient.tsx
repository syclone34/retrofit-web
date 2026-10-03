"use client";

import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Users, PhoneCall, FileText, ArrowUpRight, ArrowDownRight, MapPin, CheckCircle, Download, Activity, Mail } from 'lucide-react';
import type { Lead, AnalyticsRecord } from '@/lib/db';
import { generateAndSendMonthlyReports } from '@/app/actions';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function DashboardClient({ 
  initialLeads, 
  analyticsData 
}: { 
  initialLeads: Lead[], 
  analyticsData: AnalyticsRecord[] 
}) {
  const [timeframe, setTimeframe] = useState('Last 6 Months');
  const [toastMessage, setToastMessage] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<number | 'all'>('all');

  const currentData = useMemo(() => {
    let relevantAnalytics = analyticsData;
    if (selectedClientId !== 'all') {
      relevantAnalytics = analyticsData.filter(a => a.lead_id === selectedClientId);
    }
    
    const grouped = new Map();
    relevantAnalytics.forEach(row => {
      const key = `${row.year}-${row.month}`;
      if (!grouped.has(key)) {
        grouped.set(key, { monthStr: monthNames[row.month - 1], traffic: 0, calls: 0, requests: 0, monthNum: row.month });
      }
      const existing = grouped.get(key);
      existing.traffic += row.traffic;
      existing.calls += row.calls;
      existing.requests += row.quote_requests;
    });

    let chartData = Array.from(grouped.values()).sort((a, b) => a.monthNum - b.monthNum);
    
    chartData = chartData.map(d => ({
      name: d.monthStr,
      traffic: d.traffic
    }));

    if (timeframe === 'Last 6 Months') {
      return chartData.slice(-6);
    }
    
    return chartData;
  }, [selectedClientId, timeframe, analyticsData]);

  const kpiStats = useMemo(() => {
    let relevantAnalytics = analyticsData;
    if (selectedClientId !== 'all') {
      relevantAnalytics = analyticsData.filter(a => a.lead_id === selectedClientId);
    }
    
    let totalTraffic = 0;
    let totalCalls = 0;
    let totalRequests = 0;
    
    let maxMonth = 0;
    relevantAnalytics.forEach(a => {
      if (a.month > maxMonth) maxMonth = a.month;
    });
    
    const lastMonthData = relevantAnalytics.filter(a => a.month === maxMonth);
    lastMonthData.forEach(a => {
      totalTraffic += a.traffic;
      totalCalls += a.calls;
      totalRequests += a.quote_requests;
    });

    return {
      traffic: totalTraffic,
      calls: totalCalls,
      requests: totalRequests
    };
  }, [selectedClientId, analyticsData]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleExport = () => {
    showToast('Exporting data to CSV...');
    setTimeout(() => {
      showToast('export_data.csv downloaded!');
    }, 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-primary/20 backdrop-blur-md border border-primary/50 text-foreground px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-3 animate-in fade-in slide-in-from-top-5 duration-300">
          <CheckCircle size={20} className="text-primary" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 gradient-text">Dashboard</h1>
          <p className="text-secondary text-lg">Performance metrics and analytics</p>
        </div>

        {/* Client Selector Dropdown */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Select Client View</label>
            <select 
              className="glass-panel text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary text-foreground cursor-pointer appearance-none min-w-[280px]"
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1.2em 1.2em", paddingRight: "3rem" }}
            >
              <option value="all" className="bg-[#0b1120] text-foreground">🌐 All Clients (Aggregated)</option>
              {initialLeads.map(lead => (
                <option key={lead.id} value={lead.id} className="bg-[#0b1120] text-foreground">
                  {lead.business_name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col items-end">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 opacity-0">Actions</label>
            <button 
              onClick={async () => {
                setToastMessage("Generating and sending reports...");
                setTimeout(() => setToastMessage(""), 3000);
                const res = await generateAndSendMonthlyReports();
                setTimeout(() => {
                  if (res.success) {
                    setToastMessage(res.message);
                  } else {
                    setToastMessage(res.error);
                  }
                  setTimeout(() => setToastMessage(""), 5000);
                }, 100);
              }}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <Mail size={18} /> Send Monthly Reports
            </button>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover-glow cursor-pointer border-t-2 border-t-primary/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-secondary">Total Traffic (30d)</h3>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-primary">
              <Users size={64} />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-foreground">{kpiStats.traffic.toLocaleString()}</span>
            <span className="flex items-center text-sm font-medium text-primary mb-1 bg-primary/10 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={14} className="mr-1"/> Live
            </span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover-glow cursor-pointer border-t-2 border-t-cyan-400/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-secondary">Phone Calls (30d)</h3>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-cyan-400">
              <PhoneCall size={64} />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-foreground">{kpiStats.calls.toLocaleString()}</span>
            <span className="flex items-center text-sm font-medium text-cyan-400 mb-1 bg-cyan-400/10 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={14} className="mr-1"/> Live
            </span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover-glow cursor-pointer border-t-2 border-t-emerald-400/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-secondary">
              {selectedClientId === 'all' ? 'Total DB Leads' : 'Quote Requests (30d)'}
            </h3>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-emerald-400">
              <FileText size={64} />
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-foreground">
              {selectedClientId === 'all' ? initialLeads.length : kpiStats.requests.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl relative">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h2 className="text-xl font-bold text-foreground flex items-center">
              <Activity size={20} className="mr-2 text-primary" />
              Traffic Growth
            </h2>
            <select 
              className="bg-[#131c2b] border border-border/50 font-medium text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary text-secondary cursor-pointer appearance-none pr-8"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1em 1em" }}
            >
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="This Year">This Year</option>
            </select>
          </div>
          
          <div className="h-72 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} key={`${selectedClientId}-${timeframe}`}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(240, 235, 216, 0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 500}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(19, 28, 43, 0.9)', backdropFilter: 'blur(12px)', borderRadius: '12px', border: '1px solid rgba(240, 235, 216, 0.1)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', color: '#f8f5f0' }}
                  itemStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
                  cursor={{stroke: 'rgba(240, 235, 216, 0.2)', strokeWidth: 1, strokeDasharray: '4 4'}}
                />
                <Area type="monotone" dataKey="traffic" stroke="#06b6d4" strokeWidth={4} fillOpacity={1} fill="url(#colorTraffic)" animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real Leads Section */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col max-h-[420px]">
          <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
            <h2 className="text-xl font-bold text-foreground">
              {selectedClientId === 'all' ? 'All Live Leads' : 'Client Profile'}
            </h2>
            <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
              {selectedClientId === 'all' ? initialLeads.length + ' Total' : 'Active'}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {selectedClientId === 'all' ? (
              <div className="space-y-3">
                {initialLeads.map((lead) => (
                  <div 
                    key={lead.id} 
                    onClick={() => setSelectedClientId(lead.id)}
                    className="p-4 rounded-xl bg-white/5 border border-transparent hover:border-primary/50 transition-all group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{lead.business_name}</h4>
                    </div>
                    <div className="text-sm text-secondary mb-3 font-medium truncate">{lead.keyword}</div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs font-medium text-secondary truncate max-w-[150px]">
                        <MapPin size={12} className="mr-1" /> {lead.address}
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md bg-white/10 text-secondary`}>
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))}
                
                {initialLeads.length === 0 && (
                  <div className="text-center p-8 text-secondary">
                    No leads found in database.
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {initialLeads.filter(l => l.id === selectedClientId).map(lead => (
                  <div key={lead.id} className="p-5 rounded-xl border border-primary/30 bg-primary/5">
                    <h4 className="text-xl font-bold text-foreground mb-1">{lead.business_name}</h4>
                    <div className="text-sm text-secondary mb-6 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {lead.address}
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Target Keyword</p>
                        <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg inline-block">{lead.keyword}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex justify-between">
                          <span>Rescue Score</span>
                          <span className={lead.rescue_score < 50 ? "text-amber-400" : "text-emerald-400"}>{lead.rescue_score}/100</span>
                        </p>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${lead.rescue_score < 50 ? "bg-amber-400" : "bg-emerald-400"} shadow-[0_0_10px_currentColor]`} 
                            style={{ width: `${lead.rescue_score}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Status</p>
                        <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white/10 text-foreground inline-block">
                          {lead.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={handleExport}
            className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Download size={18} />
            Export Live Data
          </button>
        </div>

      </div>
    </div>
  );
}
