@echo off
chcp 65001 >nul
cd /d "%~dp0"
wsl.exe --cd "%~dp0." --exec bash -lc "npm run build"
pause
