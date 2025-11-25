# AI Søknad Generator

An AI-powered job application generator for Tarek Lein using Ollama and llama3.2.

## Features

- Simple chat interface to interact with the AI
- Generates tailored Norwegian job applications (søknader) based on job descriptions
- Uses Ollama with llama3.2 model for local AI processing
- Maintains conversation history for context-aware responses
- Clean, modern UI with responsive design

## Prerequisites

Before running this application, make sure you have:

1. **Python 3.8+** installed
2. **Ollama** installed and running
3. **llama3.2 model** downloaded in Ollama

## Installation

### Step 1: Install Ollama

If you haven't installed Ollama yet:

1. Download Ollama from [https://ollama.ai](https://ollama.ai)
2. Install it following the instructions for your operating system

### Step 2: Download llama3.2 Model

Open a terminal and run:

```bash
ollama pull llama3.2
```

This will download the llama3.2 model (approximately 2GB).

### Step 3: Install Python Dependencies

Navigate to this project directory and install the required packages:

```bash
pip install -r requirements.txt
```

## Usage

### Step 1: Start Ollama

Make sure Ollama is running. If it's not running as a service, start it:

```bash
ollama serve
```

### Step 2: Start the Application

Run the Flask server:

```bash
python app.py
```

You should see output like:
```
Starting AI Application Generator...
Make sure Ollama is running with llama3.2 model installed!
Server running on http://localhost:5000
```

### Step 3: Open in Browser

Open your web browser and navigate to:

```
http://localhost:5000
```

### Step 4: Use the Application

1. Paste a job advertisement or describe the position
2. Click "Send" or press Enter
3. The AI will generate a tailored job application (søknad) for Tarek Lein
4. You can continue the conversation to refine the application
5. Click "Reset Chat" to start a new conversation

## Project Structure

```
Application-Creator/
├── app.py              # Flask backend server
├── requirements.txt    # Python dependencies
├── static/
│   ├── index.html     # Chat interface
│   ├── styles.css     # Styling
│   └── script.js      # Frontend logic
└── README.md          # This file
```

## How It Works

1. **Frontend**: A simple HTML/CSS/JavaScript chat interface
2. **Backend**: Flask server that handles API requests
3. **AI Integration**: Uses Ollama Python library to communicate with llama3.2
4. **System Prompt**: Contains detailed instructions for generating Norwegian job applications
5. **Conversation History**: Maintains context across multiple messages

## Customization

### Changing the AI Model

To use a different Ollama model, edit `app.py` and change:

```python
response = ollama.chat(
    model='llama3.2',  # Change this to your preferred model
    messages=messages
)
```

Available models: `llama2`, `mistral`, `gemma2`, etc. (must be pulled first with `ollama pull <model>`)

### Modifying the System Prompt

The system prompt is defined in `app.py` as the `SYSTEM_PROMPT` variable. You can modify it to change the AI's behavior.

## Troubleshooting

### "Connection refused" error

- Make sure Ollama is running (`ollama serve`)
- Check if Ollama is running on the default port (11434)

### "Model not found" error

- Make sure llama3.2 is downloaded: `ollama pull llama3.2`
- Verify with: `ollama list`

### Slow response times

- The first response might be slower as the model loads
- Subsequent responses should be faster
- Consider using a smaller model like `llama2` for faster responses

### Server won't start

- Make sure port 5000 is not in use
- Check that all dependencies are installed: `pip install -r requirements.txt`

## Notes

- The application runs locally and does not send data to external services
- All AI processing happens on your machine through Ollama
- Conversation history is stored in memory and will be lost when the server restarts

## License

This project is for personal use by Tarek Lein.
