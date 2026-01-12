@echo off
REM Yoga RAG System - Demo Script for CMD
REM This script runs the PowerShell demo

echo.
echo ================================================================================
echo YOGA RAG SYSTEM - DEMONSTRATION
echo ================================================================================
echo.
echo Running PowerShell demo script...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0demo.ps1"

pause
