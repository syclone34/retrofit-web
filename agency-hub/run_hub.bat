@echo off
title RetroFit Growth Engine - Streamlit Agency Hub
echo ========================================================
echo   Launching RetroFit Growth Engine (Streamlit Command Center)
echo ========================================================
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
    echo [ERROR] Virtual environment not found. Please create it first.
    pause
    exit /b 1
)

echo Starting local Streamlit server at http://localhost:8501 ...

.venv\Scripts\python.exe -m streamlit run app.py --server.port 8501 --server.headless false
pause
