import React, { useState, useEffect } from 'react';
import { 
  Copy, Check, Sparkles, MapPin, Phone, 
  Code2, Eye, Clock, DollarSign, Image as ImageIcon
} from 'lucide-react';

export default function SeoStudio({ 
  currentDomain, 
  businessName: initialBusinessName,
  phone: initialPhone,
  email: initialEmail,
  address: initialAddress
}) {
  const [copiedKey, setCopiedKey] = useState('');
  
  // SEO Meta State
  const [businessType, setBusinessType] = useState('PlumbingContractor');
  const [businessName, setBusinessName] = useState(initialBusinessName || 'FlowSeal Plumbing & Drain');
  const [domain, setDomain] = useState(currentDomain || 'flowsealplumbing.com');
  const [phone, setPhone] = useState(initialPhone || '(612) 555-0192');
  const [email, setEmail] = useState(initialEmail || 'service@flowsealplumbing.com');
  const [street, setStreet] = useState('420 Main St NE');
  const [city, setCity] = useState('Minneapolis');
  const [stateCode, setStateCode] = useState('MN');
  const [zipCode, setZipCode] = useState('55413');
  const [latitude, setLatitude] = useState('44.9866');
  const [longitude, setLongitude] = useState('-93.2581');
  const [priceRange, setPriceRange] = useState('$$');
  const [areaServed, setAreaServed] = useState('Minneapolis, St. Paul, Bloomington, Edina');
  const [ratingVal, setRatingVal] = useState('4.9');
  const [reviewCount, setReviewCount] = useState('47');
  const [openingTime, setOpeningTime] = useState('07:00');
  const [closingTime, setClosingTime] = useState('19:00');

  // Custom SEO Tags
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80');

  // Initialize defaults from props
  useEffect(() => {
    if (initialBusinessName) setBusinessName(initialBusinessName);
    if (currentDomain) setDomain(currentDomain);
    if (initialPhone) setPhone(initialPhone);
    if (initialEmail) setEmail(initialEmail);
    if (initialAddress) {
      const parts = initialAddress.split(',');
      if (parts[0]) setStreet(parts[0].trim());
      if (parts[1]) setCity(parts[1].trim());
      if (parts[2]) {
        const stZip = parts[2].trim().split(' ');
        if (stZip[0]) setStateCode(stZip[0]);
        if (stZip[1]) setZipCode(stZip[1]);
      }
    }
  }, [initialBusinessName, currentDomain, initialPhone, initialEmail, initialAddress]);

  // Sync default SEO title/description
  useEffect(() => {
    const defaultTitle = `${businessName} | Top-Rated ${getFriendlyType(businessType)} in ${city}, ${stateCode}`;
    const defaultDesc = `Trusted ${getFriendlyType(businessType).toLowerCase()} serving ${city}, ${stateCode} and surrounding areas. Fast 24/7 emergency service, transparent upfront pricing, and 5-star workmanship. Call ${phone}!`;
    
    if (!seoTitle) setSeoTitle(defaultTitle);
    if (!seoDescription) setSeoDescription(defaultDesc);
  }, [businessName, businessType, city, stateCode, phone]);

  function getFriendlyType(t) {
    switch (t) {
      case 'PlumbingContractor': return 'Plumbing & Drain Specialist';
      case 'HVACBusiness': return 'Heating & Air Conditioning Contractor';
      case 'Electrician': return 'Licensed Electrician';
      case 'RoofingContractor': return 'Roofing & Siding Specialist';
      case 'HousePainter': return 'Professional Painting Contractor';
      case 'LandscapingBusiness': return 'Landscaping & Lawn Care Service';
      case 'AutoRepair': return 'Auto Repair & Mechanics';
      case 'BeautySalon': return 'Hair Salon & Stylist';
      case 'GeneralContractor': return 'General Contractor & Remodeler';
      default: return 'Local Service Contractor';
    }
  }

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2200);
  };

  // Generate JSON-LD Schema
  const generateSchemaJsonLd = () => {
    const fullUrl = domain.startsWith('http') ? domain : `https://${domain}`;

    const schemaObj = {
      "@context": "https://schema.org",
      "@type": businessType,
      "name": businessName,
      "image": ogImageUrl,
      "@id": `${fullUrl}/#localbusiness`,
      "url": fullUrl,
      "telephone": phone,
      "email": email,
      "priceRange": priceRange,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": street,
        "addressLocality": city,
        "addressRegion": stateCode,
        "postalCode": zipCode,
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": parseFloat(latitude) || 44.9866,
        "longitude": parseFloat(longitude) || -93.2581
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": openingTime,
          "closes": closingTime
        }
      ],
      "areaServed": areaServed.split(',').map(a => a.trim()),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ratingVal,
        "reviewCount": reviewCount
      }
    };

    return JSON.stringify(schemaObj, null, 2);
  };

  // Generate Full <head> Tags
  const generateHeadTags = () => {
    const fullUrl = domain.startsWith('http') ? domain : `https://${domain}`;
    const cleanPhone = phone.replace(/\D/g, '');

    return `<!-- Primary SEO Meta Tags -->
<title>${seoTitle}</title>
<meta name="title" content="${seoTitle}">
<meta name="description" content="${seoDescription}">
<link rel="canonical" href="${fullUrl}/">
<meta name="robots" content="index, follow">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Geo Location Meta Tags -->
<meta name="geo.region" content="US-${stateCode}">
<meta name="geo.placename" content="${city}">
<meta name="geo.position" content="${latitude};${longitude}">
<meta name="ICBM" content="${latitude}, ${longitude}">

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="business.business">
<meta property="og:url" content="${fullUrl}/">
<meta property="og:title" content="${seoTitle}">
<meta property="og:description" content="${seoDescription}">
<meta property="og:image" content="${ogImageUrl}">

<!-- Twitter Cards -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${fullUrl}/">
<meta property="twitter:title" content="${seoTitle}">
<meta property="twitter:description" content="${seoDescription}">
<meta property="twitter:image" content="${ogImageUrl}">

<!-- Click-To-Call Mobile Meta -->
<meta name="format-detection" content="telephone=yes">
<link rel="preconnect" href="tel:${cleanPhone}">

<!-- LocalBusiness Structured Data (JSON-LD) -->
<script type="application/ld+json">
${generateSchemaJsonLd()}
</script>`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Local Business SEO & Schema Studio
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Generate Google-compliant LocalBusiness JSON-LD structured data, rich snippet tags, and high-converting click-to-call meta tags in seconds.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleCopy(generateSchemaJsonLd(), 'schema-only')}
              className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors"
            >
              {copiedKey === 'schema-only' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              Copy JSON-LD Schema
            </button>
            <button
              onClick={() => handleCopy(generateHeadTags(), 'full-head')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors"
            >
              {copiedKey === 'full-head' ? <Check className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
              Copy Full &lt;head&gt; Code
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Config Inputs vs Live Google Search Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Config Inputs: 7 Cols */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-500" />
            Business Details & Trade Schema Classification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Schema Subtype</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
              >
                <option value="PlumbingContractor">Plumbing Contractor</option>
                <option value="HVACBusiness">HVAC / Heating & Cooling</option>
                <option value="Electrician">Electrician</option>
                <option value="RoofingContractor">Roofing Contractor</option>
                <option value="HousePainter">Painting Contractor</option>
                <option value="LandscapingBusiness">Landscaping Business</option>
                <option value="AutoRepair">Auto Repair & Mechanics</option>
                <option value="BeautySalon">Beauty Salon & Hairdresser</option>
                <option value="GeneralContractor">General Contractor</option>
                <option value="HomeAndConstructionBusiness">Home & Construction</option>
                <option value="LocalBusiness">Generic Local Business</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Target Website Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Primary Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Street Address</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">City, State & Zip</label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="px-2.5 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  className="px-2.5 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Zip"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="px-2.5 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Rating & Review Count</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <input
                  type="text"
                  placeholder="e.g. 4.9"
                  value={ratingVal}
                  onChange={(e) => setRatingVal(e.target.value)}
                  className="px-2.5 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="e.g. 48"
                  value={reviewCount}
                  onChange={(e) => setReviewCount(e.target.value)}
                  className="px-2.5 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Price Tier & Operating Hours</label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <input
                  type="text"
                  placeholder="$$"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-2.5 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
                <input
                  type="time"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  className="px-2 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
                <input
                  type="time"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  className="px-2 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Service Territory (comma separated)</label>
              <input
                type="text"
                value={areaServed}
                onChange={(e) => setAreaServed(e.target.value)}
                placeholder="Minneapolis, St. Paul, Bloomington"
                className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">Geo Coordinates (Lat / Lng)</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="44.9866"
                  className="px-2.5 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="-93.2581"
                  className="px-2.5 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-zinc-300">OpenGraph / Schema Image URL</label>
              <input
                type="url"
                value={ogImageUrl}
                onChange={(e) => setOgImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Title & Description with length validation */}
          <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 space-y-3">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-zinc-300">
                <span>SEO Page Title Tag</span>
                <span className={`${seoTitle.length >= 50 && seoTitle.length <= 60 ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {seoTitle.length} / 60 characters
                </span>
              </div>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-zinc-300">
                <span>SEO Meta Description</span>
                <span className={`${seoDescription.length >= 140 && seoDescription.length <= 160 ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {seoDescription.length} / 160 characters
                </span>
              </div>
              <textarea
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="w-full mt-1 p-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Live Previews: 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Google Search Result Simulator */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-500" />
              Google Search Result Live Simulation
            </h4>

            {/* Google Search Card Preview */}
            <div className="p-4 bg-white dark:bg-[#202124] rounded-xl border border-slate-200 dark:border-[#303134] shadow-sm font-sans">
              {/* URL & Favicon line */}
              <div className="flex items-center gap-2 text-[12px] text-[#202124] dark:text-[#bdc1c6] mb-1">
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-[#303134] flex items-center justify-center text-xs">
                  🌐
                </div>
                <div className="truncate">
                  <div className="text-[12px] font-medium text-slate-900 dark:text-white truncate">{businessName}</div>
                  <div className="text-[11px] text-slate-500 dark:text-[#bdc1c6] truncate">https://{domain} › {city.toLowerCase()}-{businessType.toLowerCase()}</div>
                </div>
              </div>

              {/* Blue Clickable Title */}
              <h5 className="text-[17px] leading-tight text-[#1a0dab] dark:text-[#8ab4f8] font-medium hover:underline cursor-pointer mb-1">
                {seoTitle || 'Page Title Placeholder'}
              </h5>

              {/* Rich Review Stars & Rating Snippet */}
              <div className="flex items-center gap-1.5 text-[12px] text-slate-600 dark:text-[#bdc1c6] mb-1">
                <div className="flex text-amber-500 text-xs">
                  {'★'.repeat(5)}
                </div>
                <span className="font-semibold text-slate-800 dark:text-zinc-200">{ratingVal}</span>
                <span>({reviewCount})</span>
                <span>·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Open now: {openingTime} - {closingTime}</span>
              </div>

              {/* Description Snippet */}
              <p className="text-[13px] leading-snug text-[#4d5156] dark:text-[#bdc1c6]">
                {seoDescription || 'Meta description will be displayed here...'}
              </p>

              {/* Mobile Click-to-call action pill */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-zinc-800 flex items-center gap-2">
                <a href={`tel:${phone}`} className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-[#1a73e8] dark:text-[#8ab4f8] border border-blue-200 dark:border-blue-900 rounded-full text-xs font-semibold">
                  <Phone className="w-3 h-3" /> Call {phone}
                </a>
                <span className="text-[11px] text-slate-400">Directions & Hours</span>
              </div>
            </div>
          </div>

          {/* JSON-LD Schema Snippet Box */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-500" />
                Valid Schema.org JSON-LD Output
              </h4>
              <button
                onClick={() => handleCopy(generateSchemaJsonLd(), 'raw-json')}
                className="text-xs text-indigo-500 hover:underline flex items-center gap-1"
              >
                {copiedKey === 'raw-json' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                Copy JSON
              </button>
            </div>

            <pre className="p-3 bg-slate-900 text-emerald-400 rounded-lg text-[11px] font-mono overflow-x-auto max-h-[320px] leading-relaxed border border-slate-800">
              <code>{generateSchemaJsonLd()}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
