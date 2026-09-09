import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Shield, Award, Check, FileText, Printer, CheckCircle, Mail, Phone, Globe, DollarSign, Scale } from 'lucide-react';

export default function LegalContract({
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
  bookingFeature,
  setBookingFeature,
  seoFeature,
  setSeoFeature,
  careFeature,
  setCareFeature,
  depositPercent,
  setDepositPercent,
  timelineDays,
  setTimelineDays,
  warrantyDays,
  setWarrantyDays,
  jurisdictionState,
  setJurisdictionState,
  packageType = 'rescue',
  setPackageType,
  logoFeature = false,
  setLogoFeature,
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

  useEffect(() => {
    let matchedPlan = 'Website Rescue Package';
    let matchedBase = 299;
    let includedPages = 5;

    if (packageType === 'new-build') {
      matchedPlan = 'Brand New Website Build';
      matchedBase = 499;
      includedPages = 5;
    } else if (packageType === 'overhaul') {
      matchedPlan = 'Custom Site Overhaul';
      matchedBase = 599;
      includedPages = 10;
    } else {
      matchedPlan = 'Website Rescue Package';
      matchedBase = 299;
      includedPages = 5;
    }

    let extraPageCost = 0;
    if (pages > includedPages) {
      extraPageCost = (pages - includedPages) * 75;
    }

    let addOnCosts = 0;
    if (bookingFeature) addOnCosts += 150;
    if (seoFeature) addOnCosts += 149;
    if (logoFeature) addOnCosts += 99;

    setSelectedPlan(matchedPlan);
    setBasePrice(matchedBase);
    setTotalPrice(matchedBase + extraPageCost + addOnCosts);
  }, [packageType, pages, bookingFeature, seoFeature, logoFeature]);

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

  const depositCost = Math.round((totalPrice * depositPercent) / 100);
  const balanceCost = totalPrice - depositCost;

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
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Selected Package Tier</label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setPackageType?.('rescue')}
                  className={`py-1.5 px-2 rounded-md font-semibold text-[11px] transition-all ${
                    packageType === 'rescue'
                      ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  Rescue ($299)
                </button>
                <button
                  type="button"
                  onClick={() => setPackageType?.('new-build')}
                  className={`py-1.5 px-2 rounded-md font-semibold text-[11px] transition-all ${
                    packageType === 'new-build'
                      ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  New ($499)
                </button>
                <button
                  type="button"
                  onClick={() => setPackageType?.('overhaul')}
                  className={`py-1.5 px-2 rounded-md font-semibold text-[11px] transition-all ${
                    packageType === 'overhaul'
                      ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
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
                  {pages} {pages > (packageType === 'overhaul' ? 10 : 5) ? `(+${pages - (packageType === 'overhaul' ? 10 : 5)} extra)` : '(Included)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                <span>1 page</span>
                <span>{packageType === 'overhaul' ? '10 pages included' : '5 pages included'}</span>
                <span>25 pages</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold text-zinc-400">Additional Features & Add-ons:</label>
              
              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bookingFeature}
                  onChange={(e) => setBookingFeature(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span>Online Booking / Reservation System (+$150)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={seoFeature}
                  onChange={(e) => setSeoFeature(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span>Google Business & Local SEO Setup (+$149)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={logoFeature}
                  onChange={(e) => setLogoFeature?.(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span>Custom Logo Refresh & Vectorization (+$99)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer pt-2.5 border-t border-zinc-100 dark:border-zinc-800/50">
                <input
                  type="checkbox"
                  checked={careFeature}
                  onChange={(e) => setCareFeature(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-800 accent-blue-600 h-4 w-4"
                />
                <span className="font-semibold text-blue-600 dark:text-blue-400">Add RetroFit Care Plan Hosting (+$49/mo)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Contract Customizations Card */}
        <div className="bg-white dark:bg-[#0c0c0f] rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-2 flex items-center gap-2">
            <Scale className="h-4.5 w-4.5 text-blue-500" /> Contract Customizations
          </h2>

          <div>
            <div className="flex justify-between text-xs font-semibold text-zinc-400 mb-1.5">
              <span>Required Deposit Percentage:</span>
              <span className="text-blue-500 font-bold">{depositPercent}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={depositPercent}
              onChange={(e) => setDepositPercent(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Timeline (Business Days)</label>
            <input
              type="number"
              min="1"
              max="180"
              value={timelineDays}
              onChange={(e) => setTimelineDays(parseInt(e.target.value) || '')}
              className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Technical Warranty Support (Days)</label>
            <input
              type="number"
              min="0"
              max="365"
              value={warrantyDays}
              onChange={(e) => setWarrantyDays(parseInt(e.target.value) || 0)}
              className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">Governing State Jurisdiction</label>
            <input
              type="text"
              placeholder="Minnesota"
              value={jurisdictionState}
              onChange={(e) => setJurisdictionState(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>

        {/* Print / Save Action */}
        <button
          onClick={handlePrint}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Printer className="h-4.5 w-4.5" /> Print Legal Contract
        </button>
      </div>

      {/* Printable Legal Contract Column */}
      <div className="lg:col-span-7 bg-white text-zinc-950 p-4 sm:p-8 rounded-xl border border-zinc-200 shadow-lg print:border-none print:shadow-none print-card print:p-0">
        
        <div className="animate-fade-in print-card font-sans text-zinc-900">
          
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-zinc-900 pb-5 mb-8">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight uppercase text-zinc-950">Website Refurbishment</h1>
              <div className="text-zinc-500 font-mono text-xs mt-1">DEVELOPMENT AGREEMENT & WORK CONTRACT</div>
            </div>
            <div className="text-left sm:text-right">
              <div className="font-bold text-sm text-zinc-900">RetroFit Web Design LLC</div>
              <div className="text-xs text-zinc-500">Minneapolis-St. Paul Metro Area</div>
              <div className="text-xs text-zinc-500">cole@retrofitwebdesign.com</div>
              <div className="text-xs text-zinc-500">612-516-3145</div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 text-xs mb-8">
            <div>
              <span className="block font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Client & Billing Information:</span>
              <div className="font-bold text-zinc-900">{clientName || '[Client Name]'}</div>
              <div className="text-zinc-655 font-semibold text-zinc-700">{businessName || '[Business Name]'}</div>
              {url && <div className="text-blue-600 font-semibold">{url}</div>}
              {email && <div className="text-zinc-500 mt-1">{email}</div>}
              {phone && <div className="text-zinc-500">{phone}</div>}
              {address && <div className="text-zinc-500">{address}</div>}
            </div>
            <div className="text-left sm:text-right">
              <span className="block font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Agreement Metadata:</span>
              <div>Contract Date: <span className="font-semibold">{getTodayDate()}</span></div>
              <div>Offer Validity: <span className="font-semibold">{getExpirationDate()}</span></div>
              <div>Plan Inclusions: <span className="font-semibold text-blue-600">{selectedPlan}</span></div>
            </div>
          </div>

          {/* Preamble */}
          <p className="text-xs text-zinc-650 leading-relaxed mb-6 font-medium italic border-l-2 border-zinc-300 pl-3">
            This Website Refurbishment and Development Agreement ("Agreement") is made and entered into as of the date of final signature, by and between Developer (RetroFit Web Design LLC) and the Client listed above. By signing this document, the Client authorizes Developer to perform the technical upgrades detailed below.
          </p>

          {/* Section 1: Scope of Work */}
          <div className="space-y-4 text-xs mb-8">
            <h3 className="font-bold text-zinc-900 uppercase border-b border-zinc-200 pb-1.5">1. Scope of Work & Deliverables</h3>
            <p className="text-zinc-600 leading-relaxed">
              Developer will refurbish Client's legacy website assets into an ultra-fast, mobile-first responsive layout. The project scope includes development of <span className="font-bold text-zinc-900">{pages} web page{pages === 1 ? '' : 's'}</span> and deployment of the following deliverables:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-655 pl-2 text-zinc-600">
              <li>Refactor unoptimized visual code into modern clean layouts.</li>
              <li>Configure responsive styling for mobile-first viewport displays.</li>
              <li>Perform image compression and render-blocking script removal to ensure page loads under 1.5 seconds.</li>
              <li>Install basic local SEO header schemas (Title & meta tags).</li>
              
              {/* Checked Features Inclusions */}
              {bookingFeature && <li className="font-semibold text-zinc-950">Integration of an online scheduling and booking system widget.</li>}
              {seoFeature && <li className="font-semibold text-zinc-950">Google Business Profile setup and local search SEO metadata optimization.</li>}
              {logoFeature && <li className="font-semibold text-zinc-950">Custom logo refresh and vectorization for crisp high-resolution display.</li>}
            </ul>

            {/* Selected Audits Scope */}
            {selectedAudits.length > 0 && (
              <div className="mt-3 bg-zinc-50 border border-zinc-100 rounded p-3">
                <span className="block font-bold text-zinc-800 mb-1.5">Target Audits Resolved in Development:</span>
                <ul className="list-disc list-inside space-y-1 pl-1.5 text-zinc-500">
                  {selectedAudits.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Section 2: Investment Breakdown */}
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
                  <td className="py-3 px-2 text-sm uppercase">Total Project Investment:</td>
                  <td className="py-3 px-2 text-right text-sm">
                    ${totalPrice}
                    {careFeature && <span className="text-[10px] font-normal text-zinc-500 block">+ $49/mo recurring</span>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 3: Terms & Conditions */}
          <div className="space-y-3 text-[10px] text-zinc-500 mb-8 leading-relaxed">
            <h3 className="font-bold text-zinc-900 uppercase border-b border-zinc-200 pb-1 text-xs">3. Terms & Conditions</h3>
            <p>
              <strong>Payment Schedule:</strong> A non-refundable deposit of {depositPercent}% (${depositCost}) is required prior to project kickoff. The remaining balance of {100 - depositPercent}% (${balanceCost}) is due immediately upon client design verification and final domain launch.
            </p>
            <p>
              <strong>Timeline & Milestones:</strong> Developer agrees to deliver the refurbish scope within {timelineDays} business days of deposit clearing, provided the Client supplies all imagery and text copy within 3 business days of signing. Delays in Client assets shift launch schedules accordingly.
            </p>
            <p>
              <strong>Post-Launch Warranty:</strong> Developer provides a {warrantyDays}-day complimentary bug remediation warranty starting immediately upon site handover. Support includes fixing visual layout alignment or loading speed regressions. Ongoing server hosting or content updates require a Care Plan.
            </p>
            <p>
              <strong>Intellectual Property:</strong> Subject to final contract payment clearance, Developer transfers all copyrights and code intellectual property rights of the refurbished layouts to the Client. Developer retains the right to display the final work in design portfolios.
            </p>
            <p>
              <strong>Limitation of Liability:</strong> Under no circumstances shall RetroFit Web Design LLC be liable for any indirect, special, incidental, or consequential damages, including loss of profits, revenue, or business data, resulting from website downtime, bugs, host server failures, or search engine ranking fluctuations. Developer's total liability under this agreement is strictly capped at the total amount paid by Client.
            </p>
            <p>
              <strong>Governing Law:</strong> This agreement and work scope shall be governed, interpreted, and enforced in accordance with the laws of the State of <strong>{jurisdictionState}</strong>.
            </p>
          </div>

          {/* Section 4: Sign-off */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 text-xs pt-6 mt-12 border-t border-zinc-200">
            <div>
              <div className="h-12 border-b border-zinc-300 flex items-end pb-1 mb-2 font-serif italic text-base text-blue-800 select-none">
                Cole Fuller
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
