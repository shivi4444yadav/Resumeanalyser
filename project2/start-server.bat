@echo off
title ResumeAI - AI-Powered Resume Analyzer
echo ========================================================
echo   Starting ResumeAI Local Web Server...
echo   Beat the ATS. Land Your Dream Job.
echo ========================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
