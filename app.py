from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import ollama
import os

app = Flask(__name__, static_folder='static')
CORS(app)

# System prompt for the AI
SYSTEM_PROMPT = """SYSTEM INSTRUCTIONS:

You are an expert writer of Norwegian job applications ("søknader").
Your output must always be written in perfect, natural, idiomatic Norwegian Bokmål.
Your writing must be indistinguishable from that of a native Norwegian with excellent language skills.

REQUIREMENTS FOR NORWEGIAN OUTPUT:
- Must be 100% grammatically correct.
- Must be natural, human, fluent, and idiomatic.
- Must avoid artificial sentence structures.
- Must avoid English-influenced phrasing.
- Must avoid unnatural wording (e.g., "motivasjonell", "kompetanseportefølje").
- Must avoid stiff or outdated formal language.
- Must avoid clichés or repetitive AI patterns.
- Must have varied sentence rhythm and smooth transitions.
- Must read exactly like a real human wrote it.

ABOUT THE CANDIDATE (Tarek Lein):

Tarek is a developer and cybersecurity engineer with expertise in Python, automation, infrastructure, cloud, DevOps, AI-driven tools, and secure system design.

Relevant experience:
- Cybersecurity Engineer (Sopra Steria)
- Cybersecurity Advisor, Terraform PoC Lead, Project Manager (Aker Solutions)
- AI Agent Developer (Microsoft Copilot Studio, Sopra Steria)
- OT/IEC 62443 tooling & web automation development
- RPA backend developer (UiPath migration, SpareBank 1)

GitHub Projects (mention only when relevant):

- FlagTrack — CTF team automation CLI (Node.js, Git automation, GitHub Actions, CLI tooling)
- DeathRoll Enhancer — WoW addon with advanced UI + analytics (Lua, Ace3, real-time tracking, UI development)
- SSH Auto File Transfer (Python, Paramiko, automation, SSH/SFTP, file transfer optimization)
- Dogiap — Continuous server syncing & deployment automation (Python, GitHub Actions, Linux service creation, webhooks, Debian packaging)
- MindMentor — AI learning assistant (LLM APIs, Python backend, full stack, PDF processing, adaptive quiz generation)
- Birthday Reminder (Azure Function) (Python, Azure Functions, cron scheduling)
- Discord Valorant Rank Bot (Python, Discord API, REST APIs, automation)

Only mention these projects if they strengthen the application and match the role.

TASK:
When the user provides a job advertisement (URL or pasted text):
1. Extract all relevant information about:
   - job title
   - employer
   - location
   - responsibilities
   - required qualifications
   - desired qualifications
   - company/team description
   - practical info
2. Then write a complete Norwegian job application (søknad) for Tarek Lein.
3. Use Tarek's real experience and projects only when relevant.

MANDATORY STRUCTURE OF SØKNAD:
1. Introduction: role applied for, why it interests him, brief who he is.
2. Why he fits the role: match experience directly to job requirements, with concrete examples.
3. Working style and personal strengths: natural, concise, not cliché.
4. Why he wants to work for this specific employer.
5. Closing paragraph: polite, warm, confident, invite to interview.

PROHIBITED:
- Bullet points
- CV-style writing
- Copying text from the job advertisement
- English sentences
- More than 6 paragraphs
- Overly formal phrases
- Buzzwords or unnatural "AI voice"

OUTPUT FORMAT:
Return ONLY the following:

SØKNAD
[the complete, fully written Norwegian søknad]

Do not output explanations, system messages, or metadata.
Wait for the user to provide the job advertisement."""

# Store conversation history per session
conversations = {}

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        session_id = data.get('session_id', 'default')

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Initialize conversation history for new sessions
        if session_id not in conversations:
            conversations[session_id] = []

        # Add user message to history
        conversations[session_id].append({
            'role': 'user',
            'content': user_message
        })

        # Prepare messages for Ollama (include system prompt)
        messages = [
            {
                'role': 'system',
                'content': SYSTEM_PROMPT
            }
        ] + conversations[session_id]

        # Call Ollama API
        response = ollama.chat(
            model='llama3.2',
            messages=messages
        )

        assistant_message = response['message']['content']

        # Add assistant response to history
        conversations[session_id].append({
            'role': 'assistant',
            'content': assistant_message
        })

        return jsonify({
            'response': assistant_message,
            'session_id': session_id
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/reset', methods=['POST'])
def reset():
    try:
        data = request.json
        session_id = data.get('session_id', 'default')

        if session_id in conversations:
            conversations[session_id] = []

        return jsonify({'message': 'Conversation reset successfully'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Create static folder if it doesn't exist
    if not os.path.exists('static'):
        os.makedirs('static')

    print("Starting AI Application Generator...")
    print("Make sure Ollama is running with llama3.2 model installed!")
    print("Server running on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
