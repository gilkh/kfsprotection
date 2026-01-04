@echo off
title KFS Protection Server
color 0f

echo ==================================================
echo       KFS PROTECTION - WEBSITE SERVER
echo ==================================================
echo.

:: Check if node is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit
)

:: Check if node_modules exists, install if not
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    call npm install
    echo [OK] Dependencies installed.
)

echo [INFO] Starting server...
echo [INFO] Website will open in your default browser.
echo.
echo Press Ctrl+C to stop the server.
echo.

:: Open browser after 2 seconds
timeout /t 2 >nul
start http://localhost:3000
start http://localhost:3000/admin.html

:: Start Server
node server.js

pause
