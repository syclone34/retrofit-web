import React, { useState } from 'react';
import { 
  Globe, Download, Copy, Check, Sparkles, Image as ImageIcon, 
  Palette, Type, FileText, Phone, Mail, MapPin, Clock, 
  ExternalLink, ArrowRight, RefreshCw, AlertCircle, Layers
} from 'lucide-react';

export default function AssetExtractor({ 
  currentDomain, 
  onApplyClientData,
  darkMode 
}) {
  const [urlInput, setUrlInput] = useState(currentDomain || '');
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('summary');
  const [copiedKey, setCopiedKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2200);
  };

  const cleanUrl = (input) => {
    let u = input.trim();
    if (!/^https?:\/\//i.test(u)) {
      u = 'https://' + u;
    }
    return u;
  };

  const handleScrape = async (e) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) return;

    setLoading(true);
    setErrorMsg('');
    const targetUrl = cleanUrl(urlInput);

    try {
      let rawHtml = '';
      if (window.api && window.api.fetchUrl) {
        rawHtml = await window.api.fetchUrl(targetUrl);
      } else {
        // Fallback for browser mode via corsproxy or direct fetch
        try {
          const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`);
          rawHtml = await res.text();
        } catch {
          throw new Error("Unable to fetch URL in browser mode without backend proxy.");
        }
      }

      const parsed = parsePageAssets(rawHtml, targetUrl);
      setExtractedData(parsed);
    } catch (err) {
      console.error("Scraping error:", err);
      setErrorMsg(`Failed to extract assets from ${targetUrl}: ${err.message || 'Check network connection or domain.'}`);
    } finally {
      setLoading(false);
    }
  };

  const parsePageAssets = (html, baseUrl) => {
    const origin = new URL(baseUrl).origin;

    const resolveUrl = (src) => {
      if (!src) return '';
      if (src.startsWith('data:')) return src;
      if (src.startsWith('//')) return 'https:' + src;
      if (src.startsWith('http://') || src.startsWith('https://')) return src;
      try {
        return new URL(src, baseUrl).href;
      } catch {
        return src;
      }
    };

    // Clean plain text
    const cleanText = html
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, ' ')
      .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ');

    // 1. Business Name & Titles
    let businessName = '';
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    let titleText = titleMatch ? titleMatch[1].trim() : '';
    if (titleText) {
      const parts = titleText.split(/[-|—•:]/);
      let cand = parts[0].trim();
      if (/^(home|welcome|index|homepage|main page|about|contact|services)\b/i.test(cand) && parts[1]) {
        cand = parts[1].trim();
      }
      businessName = cand.slice(0, 50);
    }

    // 2. Meta description
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                          html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

    // 3. Contact Info
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}\b/g;
    const emails = Array.from(new Set(
      (cleanText.match(emailRegex) || []).filter(e => 
        !e.endsWith('.png') && !e.endsWith('.jpg') && !e.endsWith('.webp') && !e.includes('example.com')
      )
    ));

    const phoneRegex = /(?:\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
    const phones = Array.from(new Set(cleanText.match(phoneRegex) || []));

    const addressRegex = /\b\d{1,5}\s+[A-Za-z0-9\s.]{3,35}\s+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Boulevard|Blvd|Lane|Ln|Court|Ct|Suite|Ste|Way|Plaza|Pl)\.?,?\s+[A-Za-z\s.]{3,20},?\s+[A-Z]{2}\s+\d{5}(?:-\d{4})?\b/gi;
    const addresses = Array.from(new Set(cleanText.match(addressRegex) || []));

    // 4. Logos & Favicons
    const favicons = [];
    const iconMatches = html.matchAll(/<link[^>]*rel=["'](?:shortcut icon|icon|apple-touch-icon)["'][^>]*href=["']([^"']+)["']/gi);
    for (const m of iconMatches) {
      favicons.push(resolveUrl(m[1]));
    }
    if (favicons.length === 0) {
      favicons.push(`${origin}/favicon.ico`);
    }

    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    const ogImage = ogImageMatch ? resolveUrl(ogImageMatch[1]) : '';

    // Search for logo images
    const logos = [];
    const imgLogoMatches = html.matchAll(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi);
    for (const m of imgLogoMatches) {
      const fullTag = m[0];
      const src = m[1];
      if (/logo|brand|header-img/i.test(fullTag) || /logo|brand/i.test(src)) {
        logos.push({
          url: resolveUrl(src),
          alt: (fullTag.match(/alt=["']([^"']*)["']/i) || [])[1] || 'Logo'
        });
      }
    }

    // 5. Headings & Copy
    const h1s = Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi))
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(t => t.length > 2);

    const h2s = Array.from(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi))
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(t => t.length > 2);

    const paragraphs = Array.from(html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi))
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(t => t.length > 40 && !t.includes('cookie') && !t.includes('copyright'))
      .slice(0, 10);

    // 6. Colors from styles & hex patterns
    const hexRegex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\b/g;
    const matchedColors = html.match(hexRegex) || [];
    const colorCounts = {};
    for (const c of matchedColors) {
      const hex = c.toUpperCase();
      // Filter out pure black, white and greys for main brand color discovery
      if (hex !== '#FFFFFF' && hex !== '#FFF' && hex !== '#000000' && hex !== '#000' && hex !== '#333' && hex !== '#666') {
        colorCounts[hex] = (colorCounts[hex] || 0) + 1;
      }
    }
    const sortedColors = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0])
      .slice(0, 8);

    // Meta theme color
    const themeColorMatch = html.match(/<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i);
    const themeColor = themeColorMatch ? themeColorMatch[1].trim() : '';
    if (themeColor && !sortedColors.includes(themeColor.toUpperCase())) {
      sortedColors.unshift(themeColor.toUpperCase());
    }

    // 7. Social Links
    const socialLinks = {};
    const linkMatches = html.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi);
    for (const m of linkMatches) {
      const l = m[1];
      if (/facebook\.com/i.test(l) && !socialLinks.facebook) socialLinks.facebook = l;
      if (/instagram\.com/i.test(l) && !socialLinks.instagram) socialLinks.instagram = l;
      if (/linkedin\.com/i.test(l) && !socialLinks.linkedin) socialLinks.linkedin = l;
      if (/yelp\.com/i.test(l) && !socialLinks.yelp) socialLinks.yelp = l;
      if (/google\.com\/maps/i.test(l) && !socialLinks.googleMaps) socialLinks.googleMaps = l;
      if (/youtube\.com/i.test(l) && !socialLinks.youtube) socialLinks.youtube = l;
    }

    // 8. Image Gallery
    const allImages = [];
    const allImgMatches = html.matchAll(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi);
    for (const m of allImgMatches) {
      const src = m[1];
      const alt = (m[0].match(/alt=["']([^"']*)["']/i) || [])[1] || '';
      const resolved = resolveUrl(src);
      if (resolved && !resolved.startsWith('data:') && !allImages.some(i => i.url === resolved)) {
        allImages.push({ url: resolved, alt });
      }
    }

    return {
      targetUrl,
      businessName: businessName || new URL(baseUrl).hostname.replace(/^www\./, ''),
      metaDescription,
      emails,
      phones,
      addresses,
      favicons,
      ogImage,
      logos,
      h1s,
      h2s,
      paragraphs,
      colors: sortedColors,
      socialLinks,
      images: allImages.slice(0, 24)
    };
  };

  // Generate Modern Starter HTML
  const generateStarterHtml = () => {
    if (!extractedData) return '';
    const d = extractedData;
    const pColor = d.colors[0] || '#2563eb';
    const sColor = d.colors[1] || '#0f172a';
    const heroTitle = d.h1s[0] || `Quality Services from ${d.businessName}`;
    const heroSub = d.paragraphs[0] || d.metaDescription || 'Reliable, trusted local experts dedicated to exceptional craftsmanship.';
    const primaryPhone = d.phones[0] || '(555) 000-0000';
    const cleanPhone = primaryPhone.replace(/\D/g, '');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${d.businessName} | Official Website</title>
  <meta name="description" content="${d.metaDescription || heroSub.slice(0, 155)}">
  <link rel="icon" href="${d.favicons[0] || 'favicon.ico'}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${pColor};
      --primary-dark: #1e3a8a;
      --dark: ${sColor};
      --light: #f8fafc;
      --text: #334155;
      --radius: 12px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
    body { background: var(--light); color: var(--text); line-height: 1.6; }
    
    /* Sticky Modern Header with Click-To-Call */
    header {
      position: sticky; top: 0; z-index: 50;
      display: flex; justify-content: space-between; align-items: center;
      padding: 1rem 2rem; background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px); box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    .logo { font-weight: 800; font-size: 1.3rem; color: var(--dark); text-decoration: none; display: flex; align-items: center; gap: 0.5rem; }
    .nav-btn {
      background: var(--primary); color: #fff; padding: 0.75rem 1.5rem;
      border-radius: 9999px; text-decoration: none; font-weight: 700;
      display: inline-flex; align-items: center; gap: 0.5rem; transition: transform 0.2s;
    }
    .nav-btn:hover { transform: scale(1.03); }

    /* High Converting Hero */
    .hero {
      padding: 4rem 2rem; max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
    }
    .hero h1 { font-size: 2.75rem; line-height: 1.2; color: var(--dark); margin-bottom: 1.25rem; font-weight: 800; }
    .hero p { font-size: 1.15rem; color: #64748b; margin-bottom: 2rem; }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
    .btn-call { background: var(--primary); color: #fff; padding: 1rem 2rem; border-radius: var(--radius); text-decoration: none; font-weight: 700; }
    .btn-quote { background: #fff; color: var(--dark); border: 2px solid #e2e8f0; padding: 1rem 2rem; border-radius: var(--radius); text-decoration: none; font-weight: 700; }

    /* Services Grid */
    .services-sec { padding: 4rem 2rem; background: #fff; }
    .container { max-width: 1200px; margin: 0 auto; }
    .sec-title { text-align: center; margin-bottom: 3rem; }
    .sec-title h2 { font-size: 2.2rem; color: var(--dark); font-weight: 800; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .card { background: var(--light); padding: 2rem; border-radius: var(--radius); border: 1px solid #e2e8f0; }
    .card h3 { color: var(--dark); margin-bottom: 0.75rem; font-weight: 700; }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .hero { grid-template-columns: 1fr; text-align: center; padding: 2.5rem 1rem; }
      .hero h1 { font-size: 2rem; }
      .hero-actions { justify-content: center; }
      header { padding: 0.75rem 1rem; }
    }
  </style>
</head>
<body>
  <header>
    <a href="#" class="logo">${d.businessName}</a>
    <a href="tel:${cleanPhone}" class="nav-btn">📞 Call ${primaryPhone}</a>
  </header>

  <main>
    <section class="hero">
      <div>
        <h1>${heroTitle}</h1>
        <p>${heroSub}</p>
        <div class="hero-actions">
          <a href="tel:${cleanPhone}" class="btn-call">Tap To Call: ${primaryPhone}</a>
          <a href="#contact" class="btn-quote">Get Free Estimate</a>
        </div>
      </div>
      <div>
        <img src="${d.ogImage || (d.images[0] ? d.images[0].url : 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80')}" alt="${d.businessName}" style="width: 100%; border-radius: var(--radius); box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
      </div>
    </section>

    <section class="services-sec">
      <div class="container">
        <div class="sec-title">
          <h2>Our Core Services</h2>
          <p>Trusted solutions for your home and commercial needs</p>
        </div>
        <div class="grid">
          ${(d.h2s.slice(0, 6).length > 0 ? d.h2s.slice(0, 6) : ['Emergency Service', 'Repairs & Maintenance', 'New Installation']).map(h => `
          <div class="card">
            <h3>${h}</h3>
            <p>Professional craftsmanship performed with licensed, insured experts and transparent upfront pricing.</p>
          </div>`).join('\n')}
        </div>
      </div>
    </section>
  </main>
</body>
</html>`;
  };

  const handleApplyToActiveClient = () => {
    if (!extractedData) return;
    const clientUpdate = {
      url: urlInput.replace(/^(https?:\/\/)?(www\.)?/i, ''),
      businessName: extractedData.businessName,
      email: extractedData.emails[0] || '',
      phone: extractedData.phones[0] || '',
      address: extractedData.addresses[0] || '',
      clientNotes: `Auto-extracted via Asset Extractor on ${new Date().toLocaleDateString()}.\nFound ${extractedData.images.length} images, ${extractedData.colors.length} brand colors.\nMeta: ${extractedData.metaDescription}`
    };
    if (onApplyClientData) {
      onApplyClientData(clientUpdate);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Client Site Scraper & Asset Extractor
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Extract copy hierarchy, brand color hex codes, logos, NAP, and images from any prospective client's old site in seconds.
            </p>
          </div>

          {extractedData && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleApplyToActiveClient}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors"
              >
                <Check className="w-4 h-4" />
                Push to Active Client Context
              </button>
              <button
                onClick={() => handleCopy(generateStarterHtml(), 'starter-html')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors"
              >
                {copiedKey === 'starter-html' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy Modern Starter HTML
              </button>
            </div>
          )}
        </div>

        {/* URL Form */}
        <form onSubmit={handleScrape} className="mt-5 flex gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="e.g. acmeheating.com or https://flowsealplumbing.com"
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !urlInput.trim()}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-sm"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Extracting Assets...' : 'Extract All Assets'}
          </button>
        </form>

        {errorMsg && (
          <div className="mt-4 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-lg flex items-center gap-2.5 text-sm text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Extracted Content Dashboard */}
      {extractedData && (
        <div className="space-y-6">
          {/* Sub Navigation */}
          <div className="flex border-b border-slate-200 dark:border-zinc-800 gap-2 overflow-x-auto pb-1">
            {[
              { id: 'summary', label: 'Brand & Contact NAP', icon: FileText },
              { id: 'colors', label: `Colors (${extractedData.colors.length})`, icon: Palette },
              { id: 'copy', label: `Copy & Headings (${extractedData.h1s.length + extractedData.h2s.length})`, icon: Type },
              { id: 'images', label: `Images & Logos (${extractedData.images.length})`, icon: ImageIcon },
              { id: 'starter', label: 'Modern Starter Boilerplate', icon: Layers }
            ].map(tab => {
              const Icon = tab.icon;
              const active = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-t-lg flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                    active 
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-slate-50 dark:bg-zinc-800/40' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sub Tab: Summary */}
          {activeSubTab === 'summary' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Core NAP */}
              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  Business Identification & NAP
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-400">Business Name</label>
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-800 dark:text-zinc-100 bg-slate-50 dark:bg-zinc-800/50 p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700">
                      <span>{extractedData.businessName}</span>
                      <button 
                        onClick={() => handleCopy(extractedData.businessName, 'bname')}
                        className="text-slate-400 hover:text-indigo-500"
                      >
                        {copiedKey === 'bname' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400">Phone Numbers</label>
                    {extractedData.phones.length > 0 ? (
                      <div className="space-y-1.5 mt-1">
                        {extractedData.phones.map((phone, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm text-slate-800 dark:text-zinc-100 bg-slate-50 dark:bg-zinc-800/50 p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700">
                            <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-indigo-500" /> {phone}</span>
                            <button onClick={() => handleCopy(phone, `phone-${idx}`)} className="text-slate-400 hover:text-indigo-500">
                              {copiedKey === `phone-${idx}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-400 italic p-2">No phone numbers detected on homepage.</div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400">Email Addresses</label>
                    {extractedData.emails.length > 0 ? (
                      <div className="space-y-1.5 mt-1">
                        {extractedData.emails.map((email, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm text-slate-800 dark:text-zinc-100 bg-slate-50 dark:bg-zinc-800/50 p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700">
                            <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-indigo-500" /> {email}</span>
                            <button onClick={() => handleCopy(email, `email-${idx}`)} className="text-slate-400 hover:text-indigo-500">
                              {copiedKey === `email-${idx}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-400 italic p-2">No email detected.</div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-400">Physical Address</label>
                    {extractedData.addresses.length > 0 ? (
                      <div className="space-y-1.5 mt-1">
                        {extractedData.addresses.map((addr, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm text-slate-800 dark:text-zinc-100 bg-slate-50 dark:bg-zinc-800/50 p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700">
                            <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-indigo-500" /> {addr}</span>
                            <button onClick={() => handleCopy(addr, `addr-${idx}`)} className="text-slate-400 hover:text-indigo-500">
                              {copiedKey === `addr-${idx}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-400 italic p-2">No street address detected.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Meta & Social */}
              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  Meta Information & Social Profiles
                </h3>

                <div>
                  <label className="text-xs font-medium text-slate-400">Meta Description</label>
                  <div className="text-sm text-slate-700 dark:text-zinc-300 bg-slate-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-slate-200 dark:border-zinc-700 mt-1">
                    {extractedData.metaDescription || <span className="italic text-slate-400">Missing meta description (High impact SEO rescue opportunity!)</span>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400">Social Media & Map Links</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {Object.entries(extractedData.socialLinks).map(([platform, link]) => (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs font-medium text-slate-700 dark:text-zinc-200 hover:border-indigo-500 transition-colors"
                      >
                        <span className="capitalize">{platform}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    ))}
                    {Object.keys(extractedData.socialLinks).length === 0 && (
                      <div className="col-span-2 text-sm text-slate-400 italic p-2">No social profile links found.</div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400">Brand Color Teaser</label>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {extractedData.colors.slice(0, 6).map((color, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCopy(color, `teaser-col-${idx}`)}
                        className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 cursor-pointer hover:border-indigo-500 transition-colors"
                      >
                        <span className="w-4 h-4 rounded-full border border-black/10 shadow-sm shrink-0" style={{ backgroundColor: color }} />
                        <span className="text-xs font-mono text-slate-700 dark:text-zinc-200">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub Tab: Colors */}
          {activeSubTab === 'colors' && (
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-pink-500" />
                    Detected Brand Palette
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Extracted from CSS stylesheets, SVGs, and inline styling. Click to copy hex.</p>
                </div>
                <button
                  onClick={() => handleCopy(extractedData.colors.join(', '), 'all-colors')}
                  className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === 'all-colors' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy All Hex Codes
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
                {extractedData.colors.map((color, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCopy(color, `col-${idx}`)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/40 hover:border-indigo-500 cursor-pointer transition-all hover:scale-105 text-center group"
                  >
                    <div 
                      className="w-full h-16 rounded-lg shadow-inner mb-3 border border-black/10 group-hover:shadow-md transition-shadow" 
                      style={{ backgroundColor: color }} 
                    />
                    <div className="text-xs font-mono font-bold text-slate-800 dark:text-zinc-100 flex items-center justify-center gap-1">
                      {color}
                      {copiedKey === `col-${idx}` && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                      {idx === 0 ? 'Primary' : idx === 1 ? 'Secondary' : idx === 2 ? 'Accent' : `Variant ${idx + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub Tab: Copy & Headings */}
          {activeSubTab === 'copy' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Type className="w-4 h-4 text-indigo-500" />
                  Primary Headings (H1 & H2)
                </h3>
                
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Main Page Title (H1)</span>
                  {extractedData.h1s.length > 0 ? (
                    extractedData.h1s.map((h, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700 mt-1">
                        <span className="text-sm font-bold text-slate-800 dark:text-zinc-100">{h}</span>
                        <button onClick={() => handleCopy(h, `h1-${i}`)} className="text-slate-400 hover:text-indigo-500">
                          {copiedKey === `h1-${i}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-rose-500 bg-rose-50 dark:bg-rose-950/30 rounded-lg mt-1">
                      ⚠️ No &lt;h1&gt; tag found! (Critical flaw to highlight in your pitch audit).
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Section Subheadings (H2)</span>
                  <div className="space-y-2 mt-1">
                    {extractedData.h2s.map((h, i) => (
                      <div key={i} className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700">
                        <span className="text-sm text-slate-700 dark:text-zinc-200">{h}</span>
                        <button onClick={() => handleCopy(h, `h2-${i}`)} className="text-slate-400 hover:text-indigo-500">
                          {copiedKey === `h2-${i}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  Key Body Paragraphs & Value Props
                </h3>
                <div className="space-y-3">
                  {extractedData.paragraphs.map((p, i) => (
                    <div key={i} className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700 flex justify-between gap-4">
                      <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">{p}</p>
                      <button onClick={() => handleCopy(p, `p-${i}`)} className="text-slate-400 hover:text-indigo-500 shrink-0 self-start">
                        {copiedKey === `p-${i}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub Tab: Images */}
          {activeSubTab === 'images' && (
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-amber-500" />
                    Discovered Media & Logos
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Click any image to copy its direct URL or open in browser.</p>
                </div>
              </div>

              {/* Detected Logos */}
              {extractedData.logos.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Target Logos</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {extractedData.logos.map((logo, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-lg text-center group">
                        <div className="h-20 flex items-center justify-center bg-white dark:bg-zinc-900 rounded p-2 border border-slate-100 dark:border-zinc-800 mb-2">
                          <img src={logo.url} alt={logo.alt} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="text-[11px] truncate text-slate-500 dark:text-zinc-400">{logo.alt || 'Logo Asset'}</div>
                        <div className="flex justify-center gap-2 mt-2">
                          <button onClick={() => handleCopy(logo.url, `logo-${idx}`)} className="text-xs text-indigo-500 hover:underline flex items-center gap-1">
                            {copiedKey === `logo-${idx}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />} URL
                          </button>
                          <a href={logo.url} target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> View
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Images Grid */}
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Page Image Gallery</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {extractedData.images.map((img, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-lg overflow-hidden group">
                    <div className="h-24 bg-white dark:bg-zinc-900 flex items-center justify-center p-1">
                      <img 
                        src={img.url} 
                        alt={img.alt} 
                        className="max-h-full max-w-full object-cover rounded" 
                        loading="lazy" 
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                    <div className="p-2 text-center">
                      <button 
                        onClick={() => handleCopy(img.url, `img-${idx}`)}
                        className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center justify-center gap-1 w-full"
                      >
                        {copiedKey === `img-${idx}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        Copy URL
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub Tab: Starter Boilerplate */}
          {activeSubTab === 'starter' && (
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    Generated Rescue Starter Boilerplate
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pre-populated single-page modern template ready for your 48-hour rescue sprint.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(generateStarterHtml(), 'starter-html-code')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                  {copiedKey === 'starter-html-code' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  Copy Full HTML Code
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono overflow-x-auto max-h-[500px] border border-slate-800 leading-relaxed">
                  <code>{generateStarterHtml()}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
