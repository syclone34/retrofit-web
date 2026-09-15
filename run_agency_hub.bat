@echo off
title RetroFit Growth Engine - Streamlit Command Center
echo ======================================================================
echo    Starting RetroFit Growth Engine (Lead Scraper & Pitch Drafter)
echo ======================================================================

set HUB_DIR=%~dp0agency-hub
set VENV_PYTHON=%HUB_DIR%\.venv\Scripts\python.exe

if not exist "%VENV_PYTHON%" (
    echo [ERROR] Virtual environment not found at %VENV_PYTHON%
    echo Please make sure the agency-hub\.venv folder exists.
    pause
    exit /b 1
)

echo.
echo Navigating to %HUB_DIR% ...
cd /d "%HUB_DIR%"

echo.
echo Launching Streamlit at http://localhost:8501 ...
echo Opening browser...
start http://localhost:8501
echo Press Ctrl+C in this terminal window to stop the server.
echo.

"%VENV_PYTHON%" -m streamlit run app.py --server.port 8501 --server.headless false
pause
