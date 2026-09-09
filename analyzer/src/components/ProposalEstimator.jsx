import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Shield, Award, Check, FileText, Printer, CheckCircle, Mail, Phone, Globe, DollarSign, ClipboardList } from 'lucide-react';

const getUpgradeRecommendation = (title) => {
  const t = title.toLowerCase();
  if (t.includes('unused css')) return 'CSS Deferral & Clean-up: Eliminate unused visual rules and defer render-blocking styles to accelerate initial page paint speed.';
  if (t.includes('next-gen') || t.includes('modern-image')) return 'Next-Gen Image Assets: Compress and convert heavy client imagery into high-efficiency AVIF/WebP formats, saving up to 70% of network data.';
  if (t.includes('offscreen')) return 'Smart Image Lazy-Loading: Configure images below the fold to load dynamically as the user scrolls, boosting initial page response.';
  if (t.includes('minify') || t.includes('unminified-js')) return 'JavaScript Asset Minification: Compress, bundle, and defer heavy scripts to free up browser execution threads and speed load times.';
  if (t.includes('alt attributes') || t.includes('alt tags') || t.includes('image-alt')) return 'SEO Image Alt Tagging: Insert descriptive accessibility Alt descriptors to all key images, enabling search engine indexing and reader compliance.';
  if (t.includes('viewport')) return 'Responsive Viewport Refactoring: Standardize responsive scaling configurations and layout styling to fit perfectly across all mobile devices.';
  if (t.includes('https redirect') || t.includes('hsts') || t.includes('is-on-https')) return 'Security Protocol Enforcement: Implement automatic HTTPS redirection and force HSTS security headers to guarantee client security.';
  if (t.includes('conversion tracking') || t.includes('gtag') || t.includes('ads-conversion-tracking')) return 'Google Ads Conversion tracking: Install Gtag snippets and define tracking parameters to capture client conversion data.';
  if (t.includes('landing speed') || t.includes('landing-speed')) return 'Landing Page Speed Optimization: Tune script deferral and caching rules on paid landing pages to reduce bounce rates and boost Ad Quality Scores.';
  if (t.includes('above-the-fold') || t.includes('cta') || t.includes('ads-cta-above-fold')) return 'High-Conversion Hero CTA: Refactor layout to present a single, prominent, conversion-optimized call-to-action above the fold for incoming traffic.';
  if (t.includes('keyword relevance') || t.includes('ads-keyword-relevance')) return 'Landing Page Content/Keyword Alignment: Audit copywriting to match target ads search queries, increasing page relevance and lowering cost-per-click.';
  return `Targeted Technical Remediation: Resolve custom detected issue "${title}" to improve site loading efficiency and user experience.`;
};

export default function ProposalEstimator({
  selectedAudits,
  clientName,
  setClientName,
  businessName,
  setBusinessName,
  email,
  setEmail,
  phone,
  setPhone,
  url,
  setUrl,
  address,
  setAddress,
  pages,
  setPages,
  packageType = 'rescue',
  setPackageType,
  bookingFeature,
  setBookingFeature,
  seoFeature,
  setSeoFeature,
  logoFeature,
  setLogoFeature,
  careFeature,
  setCareFeature,
}) {
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
    ctx.strokeStyle = '#1e3a8a';
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

  // Pricing calculations
  const [selectedPlan, setSelectedPlan] = useState('Website Rescue Package');
  const [basePrice, setBasePrice] = useState(299);
  const [totalPrice, setTotalPrice] = useState(299);

  // Package blueprint checklist state
  const [blueprintChecked, setBlueprintChecked] = useState({});

  const handleToggleBlueprintItem = (key) => {
    setBlueprintChecked(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getChecklistItems = () => {
    if (selectedPlan === 'Website Rescue Package') {
      return [
        '48–72 Hour guaranteed delivery turnaround sprint.',
        'Modernize and refactor up to 5 core pages.',
        '100% mobile-first responsive layout refactoring across all device widths.',
        'Sub-second load speed optimization, CSS deferral, and script minification.',
        'High-converting Hero section with prominent above-the-fold CTA.',
        'Mobile floating click-to-call button & instant lead capture form.',
        'Image asset compression and conversion to modern WebP formats.',
        'Local SEO keyword structure, unique title tags, and meta descriptions.',
        'Full site backup and SSL security certificate enforcement.'
      ];
    } else if (selectedPlan === 'Brand New Website Build') {
      return [
        '3–5 Day complete delivery turnaround.',
        'Design and build up to 5 custom pages from the ground up.',
        '100% custom mobile-first layout tailored to client trade / industry.',
        'Prominent click-to-call and quote lead capture funnel setup.',
        'Custom domain routing, high-speed cloud hosting, and SSL setup.',
        'Google Business Profile integration and interactive service map embed.',
        'Local SEO meta tags and LocalBusiness Schema code injection.',
        '100% full client code ownership with zero monthly lock-in.'
      ];
    } else {
      return [
        '3–5 Day delivery turnaround for expanded multi-page scope.',
        'Up to 10 comprehensive pages with service and location page templates.',
        'Complete visual overhaul, modernized color palette, and brand typography.',
        'Google Business Profile sync and customer review widget integration.',
        'Multi-service and local city landing page hierarchy.',
        'Advanced mobile lead capture, appointment routing, and form validation.',
        'Deep performance optimization (target sub-second page load speeds).',
        '2 Weeks post-launch priority tech support and minor content adjustments.'
      ];
    }
  };

  useEffect(() => {
    let matchedPlan = 'Website Rescue Package';
    let matchedBase = 299;
    let maxIncludedPages = 5;

    if (packageType === 'new-build') {
      matchedPlan = 'Brand New Website Build';
      matchedBase = 499;
      maxIncludedPages = 5;
    } else if (packageType === 'overhaul' || pages > 5) {
      matchedPlan = 'Custom Site Overhaul';
      matchedBase = 599;
      maxIncludedPages = 10;
    } else {
      matchedPlan = 'Website Rescue Package';
      matchedBase = 299;
      maxIncludedPages = 5;
    }

    let extraPageCost = 0;
    if (pages > maxIncludedPages) {
      extraPageCost = (pages - maxIncludedPages) * 75;
    }

    let addOnCosts = 0;
    if (bookingFeature) addOnCosts += 150;
    if (seoFeature) addOnCosts += 149;
    if (logoFeature) addOnCosts += 99;

    setSelectedPlan(matchedPlan);
    setBasePrice(matchedBase);
    setTotalPrice(matchedBase + extraPageCost + addOnCosts);
  }, [pages, packageType, bookingFeature, seoFeature, logoFeature]);

  const handlePrint = () => {
    window.print();
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getExpirationDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14); // valid for 14 days
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-zinc-900 dark:text-zinc-100">
      
      {/* Sidebar Controls Column */}
      <div className="lg:col-span-5 space-y-6 print:hidden">
        
        {/* Client details card */}
        <div className="bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <Globe className="h-4.5 w-4.5 text-blue-500" /> Client Metadata
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Client Contact Name</label>
              <input
                type="text"
                placeholder="Tony Soprano"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Client Business Name</label>
              <input
                type="text"
                placeholder="Tony's Pizza Palace"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="tony@pizza.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Phone Number</label>
              <input
                type="tel"
                placeholder="(612) 555-0199"
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
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Business Address</label>
              <input
                type="text"
                placeholder="123 Main St, Minneapolis, MN"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
        </div>

        {/* Pricing Estimator Card */}
        <div className="bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <DollarSign className="h-4.5 w-4.5 text-emerald-500" /> Upgrade Scope & Pricing
          </h2>
          
          <div className="space-y-5">
            {/* Package Tier Selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Target Package Tier:</label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    if (setPackageType) setPackageType('rescue');
                    if (pages > 5) setPages(5);
                  }}
                  className={`py-1.5 px-2 rounded-md text-[11px] font-bold transition-all text-center ${
                    packageType === 'rescue' && pages <= 5
                      ? 'bg-white dark:bg-[#0c0c0f] text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200 dark:border-zinc-800'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  Rescue ($299)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (setPackageType) setPackageType('new-build');
                    if (pages > 5) setPages(5);
                  }}
                  className={`py-1.5 px-2 rounded-md text-[11px] font-bold transition-all text-center ${
                    packageType === 'new-build'
                      ? 'bg-white dark:bg-[#0c0c0f] text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200 dark:border-zinc-800'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  New Build ($499)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (setPackageType) setPackageType('overhaul');
                    if (pages < 6) setPages(6);
                  }}
                  className={`py-1.5 px-2 rounded-md text-[11px] font-bold transition-all text-center ${
                    packageType === 'overhaul' || pages > 5
                      ? 'bg-white dark:bg-[#0c0c0f] text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200 dark:border-zinc-800'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  Overhaul ($599)
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-400 mb-2">
                <span>Number of Pages:</span>
                <span className="text-blue-500 font-bold">
                  {pages} page{pages === 1 ? '' : 's'} {pages > (selectedPlan === 'Custom Site Overhaul' ? 10 : 5) ? `(+${pages - (selectedPlan === 'Custom Site Overhaul' ? 10 : 5)} extra @ $75/ea)` : `(Included)`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>1 page</span>
                <span>5 (Rescue/New Build)</span>
                <span>10 (Overhaul)</span>
                <span>30 pages</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold text-zinc-400">Additional Features &amp; Add-ons:</label>
              
              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bookingFeature}
                  onChange={(e) => setBookingFeature(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span>Online Booking / Scheduling Funnel (+$150)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={seoFeature}
                  onChange={(e) => setSeoFeature(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span>Google Business Profile &amp; Local SEO Setup (+$149)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={logoFeature}
                  onChange={(e) => setLogoFeature && setLogoFeature(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span>Custom Logo Refresh &amp; Vectorization (+$99)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer pt-2.5 border-t border-zinc-100 dark:border-zinc-800/50">
                <input
                  type="checkbox"
                  checked={careFeature}
                  onChange={(e) => setCareFeature(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span className="font-semibold text-blue-600 dark:text-blue-400">Add RetroFit Care Plan &amp; Cloud Hosting (+$49/mo)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Print / Save Action */}
        <button
          onClick={handlePrint}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Printer className="h-4.5 w-4.5" /> Print Executive Proposal
        </button>

        {/* Package Quality Blueprint Checklist Card */}
        <div className="bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <ClipboardList className="h-4.5 w-4.5 text-blue-500" /> Package Quality Checklist
          </h2>
          <p className="text-[10px] text-zinc-500 leading-relaxed">
            Standard delivery guidelines and checkpoints required for <strong className="text-blue-600 dark:text-blue-400">{selectedPlan}</strong>:
          </p>

          <div className="space-y-2.5 pt-1">
            {getChecklistItems().map((item, index) => {
              const itemKey = `${selectedPlan}-${index}`;
              return (
                <label
                  key={index}
                  className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer select-none leading-relaxed"
                >
                  <input
                    type="checkbox"
                    checked={!!blueprintChecked[itemKey]}
                    onChange={() => handleToggleBlueprintItem(itemKey)}
                    className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4 mt-0.5"
                  />
                  <span className={blueprintChecked[itemKey] ? 'line-through text-zinc-400 dark:text-zinc-600 font-medium' : 'font-medium'}>
                    {item}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Printable Proposal Document Column */}
      <div className="lg:col-span-7 bg-white text-zinc-950 p-4 sm:p-8 rounded-xl border border-zinc-200 shadow-lg print:border-none print:shadow-none print-card print:p-0">
        
        <div className="animate-fade-in print-card font-sans text-zinc-900">
          
          {/* Top Professional Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-zinc-950 pb-6 mb-8">
            <div className="space-y-1">
              <div className="text-sm font-black tracking-wider text-zinc-950">RETROFIT</div>
              <div className="text-[9px] font-bold text-zinc-500 font-mono tracking-widest uppercase">
                Website Refurbishment & Upgrade Proposal
              </div>
            </div>
            <div className="text-left sm:text-right text-xs">
              <div className="font-extrabold text-zinc-900">RetroFit Web Design LLC</div>
              <div className="text-zinc-500 font-mono text-[9px]">www.retrofitwebdesign.com</div>
              <div className="text-zinc-500 font-mono text-[9px] mt-0.5">cole@retrofitwebdesign.com</div>
              <div className="text-zinc-500 font-mono text-[9px] mt-0.5">612-516-3145</div>
            </div>
          </div>

          {/* Document Title Block */}
          <div className="mb-8">
            <h2 className="text-2xl font-black tracking-tight text-zinc-950 uppercase text-center">
              EXECUTIVE WEBSITE PROPOSAL & ESTIMATE
            </h2>
            <p className="text-center text-xs text-zinc-500 max-w-lg mx-auto mt-1.5 leading-relaxed">
              A comprehensive evaluation mapping legacy website performance, recommended upgrades, and project cost estimates.
            </p>
          </div>

          {/* Metadata Information Sheet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 border border-zinc-200 rounded-lg p-4 mb-8 text-xs">
            <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-zinc-200 pb-3 sm:pb-0 pr-0 sm:pr-4">
              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Target Client Account</span>
              <div className="font-extrabold text-zinc-950 text-sm">{businessName || '[Business Name]'}</div>
              {url && <div className="text-blue-600 font-semibold font-mono">{url}</div>}
              {clientName && <div className="text-zinc-500 mt-1">Attn: {clientName}</div>}
              {address && <div className="text-zinc-500 mt-0.5">{address}</div>}
            </div>
            <div className="space-y-1 pt-3 sm:pt-0 pl-0 sm:pl-4 flex flex-col justify-center">
              <div className="flex justify-between text-zinc-600">
                <span>Proposal Generated:</span>
                <span className="font-bold text-zinc-950">{getTodayDate()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Estimates Valid Until:</span>
                <span className="font-bold text-zinc-950">{getExpirationDate()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Selected Template:</span>
                <span className="font-bold text-blue-600">{selectedPlan}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Diagnostics Baseline */}
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
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-3 font-semibold text-zinc-950">Google Ads & PPC</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        ✕ No Tag / Slow Landing
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        ✓ Tagged & Conversion Ready
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[11px]">Lowers CPC & raises Quality Score ranking</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Recommended Technical Upgrades */}
          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-zinc-950 uppercase border-b border-zinc-900 pb-2 text-xs tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 bg-amber-500 rounded-full"></span>
              2. Recommended Technical Upgrades
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Based on custom diagnostics run for your legacy site, I recommend executing the following optimizations:
            </p>
            {selectedAudits.length > 0 ? (
              <div className="space-y-3 bg-zinc-50 border border-zinc-200 rounded-lg p-4">
                {selectedAudits.map((item, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="font-bold text-zinc-950 flex items-center gap-2">
                      <span className="text-amber-500 font-bold">⚠️</span> {item}
                    </div>
                    <p className="text-zinc-600 mt-1 pl-5 leading-relaxed">
                      {getUpgradeRecommendation(item)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-zinc-500 p-4 border border-zinc-200 border-dashed rounded-lg text-center bg-zinc-50">
                No custom upgrades selected. Enable audits in the Web Analyzer checklist to see targeted technical remediation explanations here.
              </div>
            )}
          </div>

          {/* Section 3: Scope of Modernization Work */}
          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-zinc-950 uppercase border-b border-zinc-900 pb-2 text-xs tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
              3. Scope of Modernization Work
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              My redesign scope involves refactoring and testing <span className="font-bold text-zinc-900">{pages} web page{pages === 1 ? '' : 's'}</span> alongside the following deliverables:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-zinc-700 pl-2">
              <li>Refactor unoptimized visual code into modern clean layouts.</li>
              <li>Configure responsive styling for mobile-first viewport displays.</li>
              <li>Perform image compression and render-blocking script removal to ensure page loads under 1.5 seconds.</li>
              <li>Install basic local SEO header schemas (Title & meta tags).</li>
              
              {/* Checked Features Inclusions */}
              {bookingFeature && <li className="font-semibold text-zinc-950">Integration of an online scheduling and booking system widget.</li>}
              {seoFeature && <li className="font-semibold text-zinc-950">Google Business Profile setup and local search SEO metadata optimization.</li>}
              {logoFeature && <li className="font-semibold text-zinc-950">Custom logo refresh and vectorization for crisp high-resolution display.</li>}
            </ul>
          </div>

          {/* Section 4: Cost Estimate & Investment Summary */}
          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-zinc-950 uppercase border-b border-zinc-900 pb-2 text-xs tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
              4. Investment & Estimate Breakdown
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-900 text-zinc-500 font-bold uppercase tracking-wider text-[9px]">
                    <th className="py-2">Upgrade Item Description</th>
                    <th className="py-2 text-right">Cost (Flat-Rate Estimate)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  <tr>
                    <td className="py-2.5">
                      <span className="font-bold">{selectedPlan}</span> Base Package (Up to {selectedPlan === 'Custom Site Overhaul' ? 10 : 5} pages included)
                    </td>
                    <td className="py-2.5 text-right font-semibold">${basePrice}</td>
                  </tr>
                  {pages > (selectedPlan === 'Custom Site Overhaul' ? 10 : 5) && (
                    <tr>
                      <td className="py-2.5">Custom Extra Pages ({pages - (selectedPlan === 'Custom Site Overhaul' ? 10 : 5)} additional page{pages - (selectedPlan === 'Custom Site Overhaul' ? 10 : 5) === 1 ? '' : 's'} @ $75/page)</td>
                      <td className="py-2.5 text-right font-semibold">${(pages - (selectedPlan === 'Custom Site Overhaul' ? 10 : 5)) * 75}</td>
                    </tr>
                  )}
                  {bookingFeature && (
                    <tr>
                      <td className="py-2.5">Online Booking & Reservation System Add-on</td>
                      <td className="py-2.5 text-right font-semibold">$150</td>
                    </tr>
                  )}
                  {seoFeature && (
                    <tr>
                      <td className="py-2.5">Google Business Profile & Local SEO Setup</td>
                      <td className="py-2.5 text-right font-semibold">$149</td>
                    </tr>
                  )}
                  {logoFeature && (
                    <tr>
                      <td className="py-2.5">Custom Logo Refresh & Vectorization Add-on</td>
                      <td className="py-2.5 text-right font-semibold">$99</td>
                    </tr>
                  )}
                  {careFeature && (
                    <tr className="text-blue-600 font-semibold bg-blue-50/30">
                      <td className="py-2.5 px-2">RetroFit Care Plan Subscription (Hosting & Maintenance)</td>
                      <td className="py-2.5 px-2 text-right font-bold">$49 / month</td>
                    </tr>
                  )}
                  <tr className="border-t-2 border-zinc-900 font-bold bg-zinc-50 text-zinc-950">
                    <td className="py-3 px-2 text-sm uppercase">Total Project Investment Estimate:</td>
                    <td className="py-3 px-2 text-right text-sm">
                      ${totalPrice}
                      {careFeature && <span className="text-[10px] font-normal text-zinc-500 block">+ $49/mo recurring</span>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 5: Project Authorization Work Order */}
          <div className="mt-12 pt-6 border-t border-zinc-300">
            <h4 className="font-bold text-zinc-950 uppercase text-[10px] mb-2">Project Authorization Work Order</h4>
            <p className="text-[10px] text-zinc-500 leading-relaxed mb-6">
              This document represents a formal audit evaluation and development estimate prepared by RetroFit Web Design LLC. Signing below indicates authorization to proceed with the specified technical upgrades and scope of work at the calculated investment levels.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 text-xs">
              <div>
                <div className="h-12 border-b border-zinc-400 flex items-end pb-1 mb-2 font-serif italic text-base text-zinc-800 font-bold">
                  Cole Fuller
                </div>
                <div className="font-bold text-zinc-900">Cole Fuller, Founder</div>
                <div className="text-zinc-500 text-[10px]">RetroFit Web Design LLC</div>
              </div>
              <div>
                {signatureData ? (
                  <div className="h-12 border-b border-zinc-400 flex items-end pb-1 mb-2 relative group">
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
                      type="button"
                      onClick={() => setIsSigning(true)}
                      className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1.5"
                    >
                      Sign Electronically
                    </button>
                  </div>
                )}
                {!signatureData && (
                  <div className="h-12 border-b border-zinc-400 hidden print:block mb-2"></div>
                )}
                <div className="font-bold text-zinc-900">{clientName || '[Authorized Client Signature]'}</div>
                <div className="text-zinc-500 text-[10px]">{businessName || 'Authorized Signatory'}</div>
              </div>
            </div>
          </div>

          {/* Document Footer */}
          <div className="mt-8 text-[9px] text-zinc-400 border-t border-zinc-100 pt-2 text-center font-mono">
            Confidential Client Proposal · Issued by RetroFit Web Design LLC · Minneapolis Area
          </div>

        </div>

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
                type="button"
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
                type="button"
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
                    type="button"
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
                type="button"
                onClick={handleApplySignature}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
              >
                Apply Signature
              </button>
              <button
                type="button"
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
