import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ error: "Please provide a valid URL starting with http:// or https://" }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) RetroFitSEO/1.0"
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch URL (Status: ${response.status})` }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const audits = [];
    let passed = 0;
    let total = 0;

    // 1. Title Tag
    const title = $("title").text() || "";
    total++;
    if (!title) {
      audits.push({ title: "Missing Title Tag", description: "The page does not have a <title> tag.", status: "fail" });
    } else if (title.length < 10 || title.length > 60) {
      audits.push({ title: "Title Length", description: `The title is ${title.length} characters long. Optimal length is between 10 and 60 characters.`, status: "warning" });
      passed += 0.5;
    } else {
      audits.push({ title: "Title Tag Optimized", description: `Great! Title length is ${title.length} characters.`, status: "pass" });
      passed++;
    }

    // 2. Meta Description
    const metaDesc = $("meta[name='description']").attr("content") || "";
    total++;
    if (!metaDesc) {
      audits.push({ title: "Missing Meta Description", description: "No meta description found. This is critical for search click-through rates.", status: "fail" });
    } else if (metaDesc.length < 50 || metaDesc.length > 160) {
      audits.push({ title: "Meta Description Length", description: `Length is ${metaDesc.length} characters. Optimal is 50-160 characters.`, status: "warning" });
      passed += 0.5;
    } else {
      audits.push({ title: "Meta Description Optimized", description: "Meta description exists and is a good length.", status: "pass" });
      passed++;
    }

    // 3. H1 Tag
    const h1s = $("h1");
    total++;
    if (h1s.length === 0) {
      audits.push({ title: "Missing H1 Tag", description: "The page has no H1 heading. H1 helps Google understand the main topic of the page.", status: "fail" });
    } else if (h1s.length > 1) {
      audits.push({ title: "Multiple H1 Tags", description: `Found ${h1s.length} H1 tags. Best practice is to use exactly one H1 per page.`, status: "warning" });
      passed += 0.5;
    } else {
      audits.push({ title: "H1 Tag Found", description: "Exactly one H1 heading found on the page.", status: "pass" });
      passed++;
    }

    // 4. Image Alt Attributes
    const images = $("img");
    const imagesWithoutAlt = images.filter((_, el) => !$(el).attr("alt")).length;
    total++;
    if (images.length === 0) {
      audits.push({ title: "No Images", description: "No images found on the page.", status: "warning" });
      passed += 0.5;
    } else if (imagesWithoutAlt > 0) {
      audits.push({ title: "Missing Alt Text", description: `${imagesWithoutAlt} out of ${images.length} images are missing 'alt' text, harming accessibility and SEO.`, status: "fail" });
    } else {
      audits.push({ title: "Image Alt Text", description: "All images have 'alt' attributes.", status: "pass" });
      passed++;
    }

    // Calculate SEO Score
    const seoScore = Math.round((passed / total) * 100);
    
    return NextResponse.json({
      seoScore,
      audits
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "An unexpected error occurred." }, { status: 500 });
  }
}
