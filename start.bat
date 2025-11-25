@echo off
echo ========================================
echo AI Søknad Generator
echo ========================================
echo.
echo Checking if Ollama is running...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8 or higher
    pause
    exit /b 1
)

echo Starting Flask server...
echo.
echo The application will open in your browser at http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

python app.py

pause
