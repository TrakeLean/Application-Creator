# Quick Start Guide

## One-Time Setup

### 1. Install Ollama

Download and install from: https://ollama.ai

### 2. Download the AI Model

Open a terminal and run:
```bash
ollama pull llama3.2
```

Wait for the download to complete (~2GB).

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

## Running the Application

### Option 1: Using the Startup Script (Windows)

Double-click `start.bat`

### Option 2: Manual Start

1. **Start Ollama** (if not running as a service):
   ```bash
   ollama serve
   ```

2. **Start the Application**:
   ```bash
   python app.py
   ```

3. **Open Browser**:
   Navigate to http://localhost:5000

## Using the Generator

1. Paste a job advertisement in Norwegian or English
2. Press Enter or click "Send"
3. Wait for the AI to generate a tailored søknad
4. You can ask for modifications or refinements
5. Click "Reset Chat" to start over

## Example Usage

**Your message:**
```
Jeg søker på en stilling som DevOps Engineer hos Equinor.
Stillingen krever erfaring med Python, Azure, Terraform, og CI/CD.
```

**AI Response:**
The AI will generate a complete Norwegian søknad tailored to this position, highlighting Tarek's relevant experience with Python, Azure, Terraform, and his work at Sopra Steria and Aker Solutions.

## Tips

- Be specific about the job requirements
- Include company name and position title
- Mention any special requirements or preferences
- You can ask the AI to modify tone, length, or specific sections
- If you want an English application, simply ask "Can you write this in English?"

## Troubleshooting

**AI not responding?**
- Check if Ollama is running: `ollama list`
- Restart Ollama: `ollama serve`

**Model not found?**
- Run: `ollama pull llama3.2`

**Port already in use?**
- Change port in `app.py`: `app.run(debug=True, port=5001)`
