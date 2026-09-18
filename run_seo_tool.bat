@echo off
title RetroFit SEO Optimization Tool
echo ========================================================
echo   Launching RetroFit SEO Tool (Next.js server)
echo ========================================================
cd /d "%~dp0\seo-optimization-tool"

echo Starting Next.js development server at http://localhost:3000 ...

:: Launch the browser (it might take a few seconds for the page to load while Next.js compiles)
start http://localhost:3000

:: Start the Next.js dev server
call npm run dev

pause
