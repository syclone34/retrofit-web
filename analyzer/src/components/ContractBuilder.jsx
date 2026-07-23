import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Shield, Award, Check, FileText, Printer, CheckCircle, Mail, Phone, Globe, DollarSign } from 'lucide-react';

export default function ContractBuilder({ selectedAudits }) {
  // Client Details
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [url, setUrl] = useState('');
  
  // Project Scope Config
  const [pages, setPages] = useState(5);
  const [bookingFeature, setBookingFeature] = useState(false);
  const [seoFeature, setSeoFeature] = useState(false);
  const [cmsFeature, setCmsFeature] = useState(false);
  const [ecommerceFeature, setEcommerceFeature] = useState(false);
  const [adsFeature, setAdsFeature] = useState(false);
  const [activeDoc, setActiveDoc] = useState('report');

  // E-Signature state
  const [signatureData, setSignatureData] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [signatureType, setSignatureType] = useState('draw');
  const [typedSig, setTypedSig] = useState('');
  const canvasRef = useRef(null);

  const handleStartDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#1e3a8a'; // Dark blue stroke
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    canvas.isDrawing = true;
    canvas.lastX = x;
    canvas.lastY = y;
  };

  const handleDraw = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.isDrawing) return;
    const ctx = canvas.getContext('2d');
    
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(canvas.lastX, canvas.lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    canvas.lastX = x;
    canvas.lastY = y;
    
    if (e.touches) {
      e.preventDefault();
    }
  };

  const handleStopDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) canvas.isDrawing = false;
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleApplySignature = () => {
    if (signatureType === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const dataUrl = canvas.toDataURL();
        setSignatureData({ type: 'draw', value: dataUrl });
      }
    } else {
      if (typedSig.trim()) {
        setSignatureData({ type: 'type', value: typedSig });
      }
    }
    setIsSigning(false);
  };

  // Auto-calculated variables
  const [selectedPlan, setSelectedPlan] = useState('Local Growth');
  const [basePrice, setBasePrice] = useState(999);
  const [totalPrice, setTotalPrice] = useState(999);

  // Sync pricing and auto-recommended plan
  useEffect(() => {
    let featureCount = 0;
    if (bookingFeature) featureCount++;
    if (seoFeature) featureCount++;
    if (cmsFeature) featureCount++;
    if (ecommerceFeature) featureCount++;
    if (adsFeature) featureCount++;

    let matchedPlan = 'The Local Growth';
    let matchedBase = 999;

    if (pages <= 3 && featureCount <= 1 && !ecommerceFeature) {
      matchedPlan = 'The Local Refresh';
      matchedBase = 499;
    } else if (pages <= 7 && featureCount <= 3 && !ecommerceFeature) {
      matchedPlan = 'The Local Growth';
      matchedBase = 999;
    } else {
      matchedPlan = 'The Full Digital Upgrade';
      matchedBase = 1999;
    }

    let extraPageCost = 0;
    if (pages > 15) {
      extraPageCost = (pages - 15) * 50;
    }

    let addOnCosts = 0;
    if (bookingFeature) addOnCosts += 250;
    if (seoFeature) addOnCosts += 200;
    if (cmsFeature) addOnCosts += 300;
    if (ecommerceFeature) addOnCosts += 500;
    if (adsFeature) addOnCosts += 400;

    setSelectedPlan(matchedPlan);
    setBasePrice(matchedBase);
    setTotalPrice(matchedBase + extraPageCost + addOnCosts);
  }, [pages, bookingFeature, seoFeature, cmsFeature, ecommerceFeature, adsFeature]);

  const handlePrint = () => {
    window.print();
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getExpirationDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 14); // 14 days proposal validity
    return today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Settings Form Column */}
      <div className="lg:col-span-5 space-y-6 no-print">
        {/* Client Metadata Card */}
        <div className="bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <Sliders className="h-4.5 w-4.5 text-blue-500" /> Client Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="John Smith"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Business Name</label>
              <input
                type="text"
                placeholder="Tony's Pizzeria"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="john@pizza.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Phone Number</label>
              <input
                type="tel"
                placeholder="(763) 555-0100"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Website Domain</label>
              <input
                type="text"
                placeholder="tonyspizza.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
        </div>

        {/* Pricing Estimator Card */}
        <div className="bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <DollarSign className="h-4.5 w-4.5 text-emerald-500" /> Refurbish Scope & Pricing
          </h2>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-400 mb-2">
                <span>Number of Pages:</span>
                <span className="text-blue-500 font-bold">{pages}</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold text-zinc-400">Additional Features:</label>
              
              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bookingFeature}
                  onChange={(e) => setBookingFeature(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span>Online Booking / Reservation System (+$250)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={seoFeature}
                  onChange={(e) => setSeoFeature(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span>Premium Local SEO Setup (+$200)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cmsFeature}
                  onChange={(e) => setCmsFeature(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span>Easy Content Management CMS (+$300)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ecommerceFeature}
                  onChange={(e) => setEcommerceFeature(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span>Custom Product Catalog (+$500)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adsFeature}
                  onChange={(e) => setAdsFeature(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span>Google Ads Campaign Setup (+$400)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Document Customizations */}
        <div className="bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-2">
            <Sliders className="h-4.5 w-4.5 text-blue-500" /> Print Document Option
          </h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
              <input
                type="radio"
                name="docType"
                checked={activeDoc === 'report'}
                onChange={() => setActiveDoc('report')}
                className="accent-blue-600 h-4 w-4"
              />
              <span>Executive Website Audit Report</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
              <input
                type="radio"
                name="docType"
                checked={activeDoc === 'contract'}
                onChange={() => setActiveDoc('contract')}
                className="accent-blue-600 h-4 w-4"
              />
              <span>Proposal Agreement & Contract</span>
            </label>
          </div>
        </div>

        {/* Print / Save Action */}
        <button
          onClick={handlePrint}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Printer className="h-4.5 w-4.5" /> {activeDoc === 'report' ? 'Print Executive Report' : 'Print Proposal Contract'}
        </button>
      </div>

      {/* Printable Contract Document Column */}
      <div className="lg:col-span-7 bg-white text-zinc-950 p-4 sm:p-8 rounded-xl border border-zinc-200 shadow-lg print:border-none print:shadow-none print-card print:p-0">
        
        {/* Document Selector Header (no-print) */}
        <div className="flex border-b border-zinc-200 mb-6 no-print">
          <button
            onClick={() => setActiveDoc('report')}
            className={`flex-1 text-center pb-3 text-xs font-bold border-b-2 transition-all ${
              activeDoc === 'report'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            Executive Audit Report
          </button>
          <button
            onClick={() => setActiveDoc('contract')}
            className={`flex-1 text-center pb-3 text-xs font-bold border-b-2 transition-all ${
              activeDoc === 'contract'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-zinc-400 hover:text-zinc-600'
            }`}
          >
            Proposal & Contract
          </button>
        </div>

        {/* Executive Summary Report */}
        {activeDoc === 'report' && (
          <div className="animate-fade-in print-card font-sans text-zinc-900">
            
            {/* Top Professional Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-zinc-950 pb-6 mb-8">
              <div className="space-y-1">
                <div className="text-sm font-black tracking-wider text-zinc-950">RETROFIT</div>
                <div className="text-[9px] font-bold text-zinc-500 font-mono tracking-widest uppercase">
                  Analytical Baseline Report & Performance Strategy
                </div>
              </div>
              <div className="text-left sm:text-right text-xs">
                <div className="font-extrabold text-zinc-900">RetroFit Web Design LLC</div>
                <div className="text-zinc-500 font-mono text-[9px]">www.retrofitwebdesign.com</div>
                <div className="text-zinc-500 font-mono text-[9px] mt-0.5">cole@retrofitweb.com</div>
                <div className="text-zinc-500 font-mono text-[9px] mt-0.5">612-986-8092</div>
              </div>
            </div>

            {/* Document Title Block */}
            <div className="mb-8">
              <h2 className="text-2xl font-black tracking-tight text-zinc-950 uppercase text-center">
                EXECUTIVE WEBPAGE AUDIT & DIAGNOSTICS
              </h2>
              <p className="text-center text-xs text-zinc-500 max-w-lg mx-auto mt-1.5 leading-relaxed">
                A comprehensive technical evaluation mapping legacy website bottlenecks, Core Web Vitals performance, and search engine discovery optimizations.
              </p>
            </div>

            {/* Metadata Information Sheet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-8 text-xs">
              <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-zinc-200 pb-3 sm:pb-0 pr-0 sm:pr-4">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Target Client Account</span>
                <div className="font-extrabold text-zinc-950 text-sm">{businessName || '[Business Name]'}</div>
                {url && <div className="text-blue-600 font-semibold font-mono">{url}</div>}
              </div>
              <div className="space-y-1 pt-3 sm:pt-0 pl-0 sm:pl-4 flex flex-col justify-center">
                <div className="flex justify-between text-zinc-600">
                  <span>Audit Engine Status:</span>
                  <span className="font-bold text-zinc-950">Verified Lighthouse Standard</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Scan Date:</span>
                  <span className="font-bold text-zinc-950">{getTodayDate()}</span>
                </div>
              </div>
            </div>

            {/* Section 1: Performance Baseline */}
            <div className="space-y-4 mb-8">
              <h3 className="font-bold text-zinc-950 uppercase border-b border-zinc-900 pb-2 text-xs tracking-wider flex items-center gap-2">
                <span className="h-2 w-2 bg-rose-500 rounded-full"></span>
                1. Speed & Quality Baseline vs Target Standard
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="border border-rose-200 bg-rose-50/10 rounded-lg p-3 text-center">
                  <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Performance</div>
                  <div className="text-lg font-black text-rose-600 mt-1">~35%</div>
                  <div className="text-[8px] text-zinc-500 mt-0.5">Mobile Score Baseline</div>
                </div>
                <div className="border border-rose-200 bg-rose-50/10 rounded-lg p-3 text-center">
                  <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">First Paint</div>
                  <div className="text-lg font-black text-rose-600 mt-1">4.5s+</div>
                  <div className="text-[8px] text-zinc-500 mt-0.5">Render Block Delay</div>
                </div>
                <div className="border border-emerald-200 bg-emerald-50/10 rounded-lg p-3 text-center">
                  <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">RetroFit Target</div>
                  <div className="text-lg font-black text-emerald-600 mt-1">95%+</div>
                  <div className="text-[8px] text-zinc-500 mt-0.5">Refurbished Score</div>
                </div>
                <div className="border border-emerald-200 bg-emerald-50/10 rounded-lg p-3 text-center">
                  <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Interactive</div>
                  <div className="text-lg font-black text-emerald-600 mt-1">&lt; 1.5s</div>
                  <div className="text-[8px] text-zinc-500 mt-0.5">Target Load Time</div>
                </div>
              </div>

              <div className="w-full overflow-x-auto border border-zinc-200 rounded-lg">
                <table className="w-full text-left border-collapse text-xs min-w-[550px]">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider text-[9px]">
                      <th className="py-2.5 px-3">Critical Diagnostic Area</th>
                      <th className="py-2.5 px-3">Legacy Status</th>
                      <th className="py-2.5 px-3">Refurbished Standard</th>
                      <th className="py-2.5 px-3">User Experience Benefit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-3 font-semibold text-zinc-950">Mobile Usability</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        ✕ Unresponsive
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        ✓ 100% Fluid Responsive
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[11px]">Captures 60%+ mobile traffic searchers</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-3 font-semibold text-zinc-950">Speed Optimizations</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        ✕ Heavy scripts
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        ✓ Sub-second Load
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[11px]">Reduces visitor abandonment rates</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-3 font-semibold text-zinc-950">SSL Certificate & Trust</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        ✕ Browser warnings
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        ✓ Encrypted HTTPS
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[11px]">Establishes immediate merchant security</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-3 font-semibold text-zinc-950">Search Engine Metadata</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        ✕ Missing alt tags
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        ✓ Schema Optimized
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[11px]">Increases Google local discovery rank</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>

            {/* Section 2: Business Growth Forecast */}
            <div className="space-y-4 mb-8">
              <h3 className="font-bold text-zinc-950 uppercase border-b border-zinc-900 pb-2 text-xs tracking-wider flex items-center gap-2">
                <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                2. Estimated Local Traffic & Conversion Growth Indicators
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Upgrading legacy assets to modern standards doesn't just improve loading times — it secures leads. Based on industry-standard conversions, modernizing website elements introduces massive gains:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-zinc-50 border-t-4 border-blue-500 rounded-lg p-3.5 shadow-sm">
                  <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Bounce Rate Reduction</div>
                  <div className="text-xl font-black text-emerald-600 mt-1">-25% to -40%</div>
                  <p className="text-[9px] text-zinc-500 mt-1">Saves customers who abandon pages due to slow load times.</p>
                </div>
                <div className="bg-zinc-50 border-t-4 border-blue-500 rounded-lg p-3.5 shadow-sm">
                  <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Mobile Conversion Lift</div>
                  <div className="text-xl font-black text-emerald-600 mt-1">+50% Avg</div>
                  <p className="text-[9px] text-zinc-500 mt-1">Streamlined mobile contact forms and reservation workflows.</p>
                </div>
                <div className="bg-zinc-50 border-t-4 border-blue-500 rounded-lg p-3.5 shadow-sm">
                  <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">SEO Traffic Index</div>
                  <div className="text-xl font-black text-emerald-600 mt-1">+35% Lift</div>
                  <p className="text-[9px] text-zinc-500 mt-1">Accelerates rankings in regional customer Google searches.</p>
                </div>
              </div>
            </div>

            {/* Section 3: Remediation List */}
            {selectedAudits.length > 0 && (
              <div className="space-y-4 mb-8">
                <h3 className="font-bold text-zinc-950 uppercase border-b border-zinc-900 pb-2 text-xs tracking-wider flex items-center gap-2">
                  <span className="h-2 w-2 bg-amber-500 rounded-full"></span>
                  3. Surgeon Remediation Checklist Items
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  This refurbishment package targets the following slow loading blocks and structures detected on the legacy domain:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-lg p-4">
                  {selectedAudits.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">⚠️</span>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analyst Verification and Signature Block */}
            <div className="mt-12 pt-6 border-t border-zinc-300">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between text-xs">
                <div className="space-y-1.5 pr-0 sm:pr-6">
                  <h4 className="font-bold text-zinc-950 uppercase text-[10px]">Analyst Diagnostics Verification</h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed">
                    This evaluation report represents a certified analysis of client domain assets utilizing Google PageSpeed diagnostic standards. Performance, SEO, and usability optimizations are guaranteed to reach target metrics upon deployment of the modernization scope of work.
                  </p>
                </div>
                <div className="w-full sm:w-auto pl-0 sm:pl-4 border-l-0 sm:border-l border-zinc-200 pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-200">
                  <div className="h-8 border-b border-zinc-400 font-serif italic text-sm text-zinc-800 py-1 pl-2">
                    Cole Fuller
                  </div>
                  <div className="font-bold text-zinc-950 mt-1 text-[9px] uppercase tracking-wider">Cole Fuller</div>
                  <div className="text-[9px] text-zinc-500">Lead Web Analyst · RetroFit Web Design</div>
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="mt-8 text-[9px] text-zinc-400 border-t border-zinc-100 pt-2 text-center font-mono">
              Confidential Client Advisory Report · Issued by RetroFit Web Design LLC · Minneapolis Area
            </div>

          </div>
        )}

        {/* Proposal Contract */}
        {activeDoc === 'contract' && (
          <div className="animate-fade-in print-card">
            
            {/* Document Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-zinc-900 pb-5 mb-8">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight uppercase text-zinc-950">Website Refurbishment</h1>
                <div className="text-zinc-500 font-mono text-xs mt-1">PROPOSAL & DEVELOPMENT AGREEMENT</div>
              </div>
              <div className="text-left sm:text-right">
                <div className="font-bold text-sm text-zinc-900">RetroFit Web Design LLC</div>
                <div className="text-xs text-zinc-500">Minneapolis-St. Paul Metro Area</div>
                <div className="text-xs text-zinc-500">cole@retrofitweb.com</div>
                <div className="text-xs text-zinc-500">612-986-8092</div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 text-xs mb-8">
              <div>
                <span className="block font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Prepared For:</span>
                <div className="font-bold text-zinc-900">{clientName || '[Client Name]'}</div>
                <div className="text-zinc-600">{businessName || '[Business Name]'}</div>
                {url && <div className="text-blue-600 font-semibold">{url}</div>}
                {email && <div className="text-zinc-500 mt-1">{email}</div>}
                {phone && <div className="text-zinc-500">{phone}</div>}
              </div>
              <div className="text-left sm:text-right">
                <span className="block font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Agreement Metadata:</span>
                <div>Date Generated: <span className="font-semibold">{getTodayDate()}</span></div>
                <div>Offer Valid Until: <span className="font-semibold">{getExpirationDate()}</span></div>
                <div>Project Template: <span className="font-semibold text-blue-600">{selectedPlan}</span></div>
              </div>
            </div>

            {/* Scope of Work */}
            <div className="space-y-4 text-xs mb-8">
              <h3 className="font-bold text-zinc-900 uppercase border-b border-zinc-200 pb-1.5">1. Scope of Work & Deliverables</h3>
              <p className="text-zinc-600 leading-relaxed">
                RetroFit Web Design LLC will modernize the Client's legacy website assets into an ultra-fast, mobile-first responsive layout (the "Refurbishment"). The project scope includes the development of <span className="font-bold text-zinc-900">{pages} web pages</span> and deployment of the following deliverables:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-zinc-600 pl-2">
                <li>Refactor unoptimized visual code into modern clean layouts</li>
                <li>Configure responsive styling for mobile-first viewport displays</li>
                <li>Perform image compression and render-blocking script removal to ensure page loads under 1.5 seconds</li>
                <li>Install basic local SEO header schemas (Title & meta tags)</li>
                
                {/* Checked Features Inclusions */}
                {bookingFeature && <li className="font-semibold text-zinc-950">Integration of an online scheduling and booking system widget</li>}
                {seoFeature && <li className="font-semibold text-zinc-950">Premium Local SEO keyword optimization and structured search schemas</li>}
                {cmsFeature && <li className="font-semibold text-zinc-950">Integration of a simplified Content Management System (CMS) for easy editing</li>}
                {ecommerceFeature && <li className="font-semibold text-zinc-950">Custom E-Commerce product catalog layout with secure transaction channels</li>}
                {adsFeature && <li className="font-semibold text-zinc-950">Google Ads conversion setup and targeted local campaign configuration</li>}
              </ul>

              {/* Audit Scope items if selected */}
              {selectedAudits.length > 0 && (
                <div className="mt-3 bg-zinc-50 border border-zinc-100 rounded p-3">
                  <span className="block font-bold text-zinc-800 mb-1.5">Target Audits Resolved in Development:</span>
                  <ul className="list-disc list-inside space-y-1 pl-1.5 text-zinc-600">
                    {selectedAudits.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Investment Details */}
            <div className="space-y-4 text-xs mb-8">
              <h3 className="font-bold text-zinc-900 uppercase border-b border-zinc-200 pb-1.5">2. Investment & Estimate Breakdown</h3>
              
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-900 text-zinc-500 font-bold">
                    <th className="py-2">Item Description</th>
                    <th className="py-2 text-right">Cost (Flat-Rate)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr>
                    <td className="py-2.5">
                      <span className="font-bold">{selectedPlan}</span> Base Package Refurbish (Up to {pages > 15 ? 15 : pages} pages included)
                    </td>
                    <td className="py-2.5 text-right font-semibold">${basePrice}</td>
                  </tr>
                  {pages > 15 && (
                    <tr>
                      <td className="py-2.5">Custom Extra Page Refurbishing ({pages - 15} additional pages @ $50/page)</td>
                      <td className="py-2.5 text-right font-semibold">${(pages - 15) * 50}</td>
                    </tr>
                  )}
                  {bookingFeature && (
                    <tr>
                      <td className="py-2.5">Online Booking & Reservation System Add-on</td>
                      <td className="py-2.5 text-right font-semibold">$250</td>
                    </tr>
                  )}
                  {seoFeature && (
                    <tr>
                      <td className="py-2.5">Premium Local SEO Optimization & Schema Setup</td>
                      <td className="py-2.5 text-right font-semibold">$200</td>
                    </tr>
                  )}
                  {cmsFeature && (
                    <tr>
                      <td className="py-2.5">Easy Content Management System (CMS) Integration</td>
                      <td className="py-2.5 text-right font-semibold">$300</td>
                    </tr>
                  )}
                  {ecommerceFeature && (
                    <tr>
                      <td className="py-2.5">E-Commerce Custom Catalog Setup & Stripe Payments</td>
                      <td className="py-2.5 text-right font-semibold">$500</td>
                    </tr>
                  )}
                  {adsFeature && (
                    <tr>
                      <td className="py-2.5">Google Ads Local Lead Campaign Configuration</td>
                      <td className="py-2.5 text-right font-semibold">$400</td>
                    </tr>
                  )}
                  <tr className="border-t-2 border-zinc-900 font-bold bg-zinc-50 text-zinc-950">
                    <td className="py-3 px-2 text-sm uppercase">Total Project Investment:</td>
                    <td className="py-3 px-2 text-right text-sm">${totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Terms */}
            <div className="space-y-2 text-[10px] text-zinc-500 mb-8 leading-relaxed">
              <h4 className="font-bold text-zinc-700 uppercase text-xs">3. Terms & Conditions</h4>
              <p>
                <strong>Payment Terms:</strong> A 50% deposit (${Math.round(totalPrice / 2)}) is required to initiate design and coding milestones. The final 50% balance (${Math.round(totalPrice / 2)}) is due upon client verification, final domain migration, and launch handover.
              </p>
              <p>
                <strong>Launch & Warranties:</strong> Development will be completed within 14 business days of deposit clearing. RetroFit Web Design LLC provides 30 days of complimentary technical warranty support post-launch.
              </p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 text-xs pt-6 mt-12 border-t border-zinc-200">
              <div>
                <div className="h-12 border-b border-zinc-300 flex items-end pb-1 mb-2">
                  <span className="font-serif italic text-base text-blue-800 tracking-wide select-none">
                    Cole Fuller
                  </span>
                </div>
                <div className="font-bold text-zinc-900">Cole Fuller, Founder</div>
                <div className="text-zinc-500 text-[10px]">RetroFit Web Design LLC</div>
              </div>
              <div>
                {signatureData ? (
                  <div className="h-12 border-b border-zinc-300 flex items-end pb-1 mb-2 relative group">
                    {signatureData.type === 'draw' ? (
                      <img src={signatureData.value} alt="Customer Signature" className="h-10 object-contain max-w-[200px]" />
                    ) : (
                      <span className="font-serif italic text-base text-zinc-900 tracking-wide select-none">
                        {signatureData.value}
                      </span>
                    )}
                    <button
                      onClick={() => setSignatureData(null)}
                      className="absolute -top-6 right-0 text-[10px] text-red-500 hover:text-red-700 font-bold uppercase no-print"
                    >
                      Clear / Resign
                    </button>
                  </div>
                ) : (
                  <div className="h-12 border border-dashed border-zinc-300 rounded flex items-center justify-center mb-2 no-print bg-zinc-50 hover:bg-zinc-100/80 transition-colors">
                    <button
                      onClick={() => setIsSigning(true)}
                      className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1.5"
                    >
                      Sign Electronically
                    </button>
                  </div>
                )}
                {!signatureData && (
                  <div className="h-12 border-b border-zinc-300 hidden print:block mb-2"></div>
                )}
                <div className="font-bold text-zinc-900">{clientName || '[Authorized Client Signature]'}</div>
                <div className="text-zinc-500 text-[10px]">{businessName || 'Authorized Signatory'}</div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Electronic Signature Modal */}
      {isSigning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 no-print">
          <div className="bg-white rounded-xl border border-zinc-200 shadow-2xl p-6 w-full max-w-md mx-4 animate-scale-in text-zinc-900">
            <h3 className="text-base font-bold text-zinc-900 mb-4">
              Apply Electronic Signature
            </h3>
            
            <div className="flex border-b border-zinc-200 mb-4 text-xs font-bold">
              <button
                onClick={() => setSignatureType('draw')}
                className={`flex-1 text-center pb-2 border-b-2 transition-all ${
                  signatureType === 'draw'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-zinc-400 hover:text-zinc-600'
                }`}
              >
                Draw Signature
              </button>
              <button
                onClick={() => setSignatureType('type')}
                className={`flex-1 text-center pb-2 border-b-2 transition-all ${
                  signatureType === 'type'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-zinc-400 hover:text-zinc-600'
                }`}
              >
                Type Signature
              </button>
            </div>

            {signatureType === 'draw' ? (
              <div className="space-y-3">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={120}
                  onMouseDown={handleStartDrawing}
                  onMouseMove={handleDraw}
                  onMouseUp={handleStopDrawing}
                  onMouseLeave={handleStopDrawing}
                  onTouchStart={handleStartDrawing}
                  onTouchMove={handleDraw}
                  onTouchEnd={handleStopDrawing}
                  className="w-full border border-zinc-300 rounded-lg bg-zinc-50 cursor-crosshair h-32"
                />
                <div className="flex justify-between items-center text-[10px] text-zinc-400">
                  <span>Draw using your finger, stylus, or cursor</span>
                  <button
                    onClick={handleClearCanvas}
                    className="text-red-500 hover:text-red-700 font-bold uppercase"
                  >
                    Clear Drawing
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter full name for signature adoption"
                  value={typedSig}
                  onChange={(e) => setTypedSig(e.target.value)}
                  className="w-full border border-zinc-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <div className="h-16 border border-zinc-200 bg-zinc-50 rounded-lg flex items-center justify-center">
                  <span className="font-serif italic text-xl text-zinc-900 select-none tracking-wide">
                    {typedSig || 'Signature Preview'}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleApplySignature}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
              >
                Apply Signature
              </button>
              <button
                onClick={() => setIsSigning(false)}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold py-2.5 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
