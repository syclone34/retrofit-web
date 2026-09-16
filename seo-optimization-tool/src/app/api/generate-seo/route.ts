import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is missing. Please add GEMINI_API_KEY to your .env.local file." }, { status: 401 });
    }

    // Fetch the page content to give context to the AI
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) RetroFitSEO/1.0" }
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch URL for AI context." }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract main text content (stripping scripts and styles)
    $("script, style, noscript, iframe, img, svg").remove();
    const rawText = $("body").text().replace(/\s+/g, ' ').trim().substring(0, 3000); // Limit context size

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      You are an expert SEO copywriter. Read the following text content extracted from a webpage:
      
      "${rawText}"
      
      Based on this content, generate:
      1. An optimized SEO Title Tag (between 40 and 60 characters).
      2. An optimized SEO Meta Description (between 120 and 150 characters) that encourages click-throughs.
      
      Respond strictly in the following JSON format without markdown blocks:
      {
        "title": "Your generated title here",
        "description": "Your generated description here"
      }
    `;

    let aiResponse = null;
    let retries = 3;
    let delay = 1000;

    for (let i = 0; i < retries; i++) {
      try {
        aiResponse = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json"
          }
        });
        break; // Success, exit loop
      } catch (err: any) {
        if (i === retries - 1) throw err; // Throw on last failure
        // Only retry if it's a 503 error
        if (err.status === 503 || err.message?.includes("503")) {
           await new Promise(res => setTimeout(res, delay));
           delay *= 2; // Exponential backoff
        } else {
           throw err; // Throw immediately for other errors
        }
      }
    }

    const output = aiResponse?.text;
    
    if (!output) {
        throw new Error("Empty response from AI");
    }

    return NextResponse.json(JSON.parse(output));

  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate SEO suggestions." }, { status: 500 });
  }
}
