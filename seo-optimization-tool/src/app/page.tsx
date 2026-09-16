"use client";

import { useState } from "react";
import { Search, Loader2, CheckCircle, AlertTriangle, XCircle, Globe, Zap, LayoutTemplate, Sparkles, Copy } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");
  const [perfScore, setPerfScore] = useState<number | null>(null);
  const [perfLoading, setPerfLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);

  const analyzeUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setPerfLoading(true);
    setError("");
    setResults(null);
    setPerfScore(null);
    setAiSuggestions(null);

    try {
      // Fetch SEO results quickly
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze URL");
      }
      
      setResults(data);
      setLoading(false);

      // Fetch Performance separately (this takes a long time)
      const psiRes = await fetch("/api/pagespeed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const psiData = await psiRes.json();
      setPerfScore(psiData.performanceScore || 0);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setPerfLoading(false);
    }
  };

  const handleAutoFix = async () => {
    setAiLoading(true);
    setAiSuggestions(null);
    try {
      const res = await fetch("/api/generate-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate SEO");
      setAiSuggestions(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "var(--success)";
    if (score >= 50) return "var(--warning)";
    return "var(--danger)";
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className="gradient-text animate-fade-in">RetroFit SEO Analyzer</h1>
        <p className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Instantly audit your website's on-page SEO, performance, and structure.
        </p>
      </div>

      <form onSubmit={analyzeUrl} className={`${styles.searchForm} glass-card animate-fade-in`} style={{ animationDelay: "0.2s" }}>
        <div className={styles.inputWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className={styles.input}
          />
        </div>
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Analyze"}
        </button>
      </form>

      {error && (
        <div className={`${styles.errorCard} glass-card animate-fade-in`}>
          <AlertTriangle color="var(--danger)" />
          <p>{error}</p>
        </div>
      )}

      {results && (
        <div className={`${styles.resultsContainer} animate-fade-in`}>
          
          <div className={styles.scoreGrid}>
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={styles.scoreCircle} style={{ borderColor: getScoreColor(results.seoScore) }}>
                <span style={{ color: getScoreColor(results.seoScore) }}>{results.seoScore}</span>
              </div>
              <h3 style={{ marginTop: '16px' }}><Globe size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }}/> On-Page SEO</h3>
            </div>
            
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={styles.scoreCircle} style={{ borderColor: perfLoading ? 'rgba(255,255,255,0.1)' : getScoreColor(perfScore || 0) }}>
                {perfLoading ? (
                   <Loader2 className="animate-spin" size={32} color="#94a3b8" />
                ) : (
                   <span style={{ color: getScoreColor(perfScore || 0) }}>{perfScore}</span>
                )}
              </div>
              <h3 style={{ marginTop: '16px' }}><Zap size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }}/> Performance</h3>
            </div>
          </div>

          <div className="glass-card" style={{ marginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LayoutTemplate /> Meta & Structure Analysis
            </h2>
            
            <div className={styles.auditList}>
              {results.audits.map((audit: any, i: number) => (
                <div key={i} className={styles.auditItem}>
                  <div className={styles.auditIcon}>
                    {audit.status === "pass" && <CheckCircle color="var(--success)" />}
                    {audit.status === "warning" && <AlertTriangle color="var(--warning)" />}
                    {audit.status === "fail" && <XCircle color="var(--danger)" />}
                  </div>
                  <div className={styles.auditContent}>
                    <h4>{audit.title}</h4>
                    <p>{audit.description}</p>
                    
                    {(audit.title.includes("Title") || audit.title.includes("Meta")) && audit.status !== "pass" && (
                      <button onClick={handleAutoFix} className={styles.autoFixBtn} disabled={aiLoading}>
                        {aiLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />} 
                        Auto-Fix with AI
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {aiSuggestions && (
              <div className={`${styles.aiPanel} animate-fade-in`}>
                <div className={styles.aiHeader}>
                  <Sparkles size={20} color="var(--primary)" />
                  <h3>AI Generated SEO Meta Tags</h3>
                </div>
                <div className={styles.aiContent}>
                  <div className={styles.aiItem}>
                    <strong>Title Tag</strong>
                    <div className={styles.copyBox}>
                      <p>{aiSuggestions.title}</p>
                      <button onClick={() => copyToClipboard(aiSuggestions.title)}><Copy size={16} /></button>
                    </div>
                  </div>
                  <div className={styles.aiItem}>
                    <strong>Meta Description</strong>
                    <div className={styles.copyBox}>
                      <p>{aiSuggestions.description}</p>
                      <button onClick={() => copyToClipboard(aiSuggestions.description)}><Copy size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      )}
    </main>
  );
}
