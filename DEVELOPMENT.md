# Development Context

## Project Overview

**AI Application Generator** - A local AI-powered tool that generates professional job applications in English for Tarek Lein, specifically designed for Norwegian job positions. Uses Ollama with llama3.2 model.

**Repository:** https://github.com/TrakeLean/Application-Creator

---

## Architecture

### Backend (Flask)
- **File:** `app.py`
- **Framework:** Flask with CORS enabled
- **AI Integration:** Ollama Python library
- **Model:** llama3.2 (2GB, local)
- **Session Management:** In-memory conversation history per session ID

### Frontend (Modern Dark UI)
- **Design Theme:** Minimalist technical dark (following frontend_chatbot_design skill)
- **Stack:** Vanilla HTML/CSS/JavaScript
- **Files:**
  - `static/index.html` - Main UI structure
  - `static/styles.css` - Dark theme with IBM Plex Sans typography, neon green accents
  - `static/script.js` - Chat functionality, session management

### Key Design Decisions

1. **English Output Only**
   - Initially tried Norwegian output
   - Switched to English to avoid awkward literal translations of technical terms
   - User handles Norwegian translation manually
   - Technical terms stay in English (AI, DevOps, cloud, etc.)

2. **Anti-Hallucination Rules**
   - Critical section in system prompt to prevent fabrication
   - AI must only use information from prompt and CV
   - Cannot invent projects, experience, or achievements
   - Coding experience is from hobby projects + bachelor degree ONLY (not professional dev roles)

3. **UI Design**
   - No generic purple gradients or Inter font
   - IBM Plex Sans typography with weight extremes (300 + 700)
   - Neon green accent (#9EFFA9) on dark graphite background
   - Sidebar navigation with status indicator
   - Smooth animations and transitions
   - No clichés or generic chatbot aesthetics

---

## System Prompt Structure

Located in `app.py` as `SYSTEM_PROMPT` variable.

### Key Sections:

1. **SYSTEM INSTRUCTIONS**
   - Output in clear, professional English
   - Natural, human-sounding writing
   - Easy for native Norwegian speaker to translate

2. **CANDIDATE INFORMATION (Tarek Lein)**
   - Background: Cybersecurity engineer wanting to transition to software development
   - **Critical:** Coding experience from hobby projects + bachelor degree only
   - Professional experience: Listed roles at Sopra Steria, Aker Solutions, SpareBank 1
   - 7 GitHub projects (only mention when relevant)

3. **JOB AD PARSING RULES**
   - Must extract employer correctly (not job board like finn.no)
   - Parse requirements, qualifications, company info internally
   - Don't show structured data to user

4. **TASK**
   - Write complete job application in English
   - First-person perspective ("I")
   - Use ONLY real experience listed in prompt
   - Remember: dev experience is hobby/education, not professional

5. **MANDATORY STRUCTURE**
   - 3-6 paragraphs, no headings
   - Introduction (role, interest, who he is)
   - Why he fits (match experience to requirements)
   - Working style and strengths
   - Why this employer
   - Closing (must include contact: +47 467 94 109 / jobb@tareklein.com)
   - Signature: "Sincerely, Tarek Lein"

6. **CRITICAL: ANTI-HALLUCINATION RULES**
   - Only use info from: candidate section, job ad, CV
   - Never invent: projects, experience, achievements, skills, companies, certifications
   - If no specific info, write generally or omit

7. **STYLE REQUIREMENTS**
   - Clear, natural, professional English
   - No buzzwords, jargon, corporate tone
   - No AI patterns or clichés
   - Keep technical terms in English
   - No headings, markdown, bullet points
   - First person only

8. **PROHIBITED**
   - Bullet points, headings, bold text
   - Third-person writing
   - Copying job ad text
   - More than 6 paragraphs
   - Generic/robotic phrases
   - CV-style lists
   - Using job board as employer name
   - Hallucinating information

---

## File Structure

```
Application-Creator/
├── app.py                          # Flask backend + system prompt
├── requirements.txt                # Python dependencies
├── static/
│   ├── index.html                 # Main UI (English)
│   ├── styles.css                 # Dark theme CSS
│   └── script.js                  # Frontend logic
├── skills/
│   └── frontend_chatbot_design.md # UI design guidelines
├── TarekLeinCV.docx               # Candidate CV
├── README.md                      # User documentation
├── QUICKSTART.md                  # Quick start guide
├── DEVELOPMENT.md                 # This file
├── .gitignore                     # Git ignore rules
└── start.bat                      # Windows startup script
```

---

## Running the Application

### Prerequisites
1. Python 3.8+
2. Ollama installed and running
3. llama3.2 model downloaded: `ollama pull llama3.2`

### Installation
```bash
pip install -r requirements.txt
```

### Start Server
```bash
python app.py
# or on Windows
start.bat
```

### Access
Open browser to: http://localhost:5000

---

## Git Commits History

1. `69682ca` - Initial commit: AI Søknad Generator with modern UI
2. `ba66371` - Enhance system prompt with Ultra-Human Norwegian Writing Style
3. `1d708ec` - Refactor system prompt to cleaner English structure
4. `07bde5b` - Switch output language to English for better technical term handling
5. `97dc2ad` - Add strict anti-hallucination rules and clarify coding experience

---

## Key Features

- **Session Management:** Unique session ID per browser session
- **Conversation History:** Maintains context across multiple messages
- **Real-time Typing Indicator:** Shows "Generating application" while AI processes
- **Reset Functionality:** Clear conversation and start fresh
- **Auto-resize Textarea:** Input grows as user types
- **Smooth Scrolling:** Auto-scroll to latest message
- **Error Handling:** Clear error messages with troubleshooting hints
- **Responsive Design:** Works on mobile and desktop

---

## Design Principles (frontend_chatbot_design skill)

### Typography
- Primary: IBM Plex Sans (300, 400, 600, 700)
- Monospace: JetBrains Mono
- NO Inter, Roboto, or generic sans-serif

### Colors (Minimalist Technical Dark)
- Background: #0D0D0F / #12121A
- Panels: #15151A / #1A1A24
- Accent: #9EFFA9 (neon green)
- Text: #EDEDED / #A8A8B3
- Borders: #2A2A35

### Layout
- Left sidebar (260px) with navigation
- Main content area with chat
- Fixed header with status indicator
- Bottom input area with send button

### Animations
- Fade+slide for page load
- Staggered reveal for messages
- Pulse for typing indicator
- Hover micro-interactions (5-15% scaling)

### Avoid
- Purple/blue gradients
- Generic SaaS palettes
- Bordered white cards on light gray
- iMessage-style bubbles
- Space Grotesk overuse
- Massive border radiuses
- Generic robot icons

---

## Important Notes

1. **No Norwegian Output:** System outputs English only. User translates manually.
2. **Technical Terms:** AI, DevOps, cloud, ML, etc. stay in English
3. **Coding Experience:** From hobbies + education, NOT professional roles
4. **Contact Info:** Always include +47 467 94 109 and jobb@tareklein.com
5. **Signature:** Always end with "Sincerely, Tarek Lein"
6. **Employer Parsing:** finn.no is job board, not employer - parse actual company name
7. **No Hallucination:** Strict rules - only use provided information

---

## Future Development Ideas

- [ ] Add CV upload functionality
- [ ] Multiple application templates
- [ ] Save/export applications
- [ ] Application history
- [ ] Dark/light mode toggle
- [ ] Custom system prompt editor
- [ ] Support for other Ollama models
- [ ] Batch application generation
- [ ] Cover letter variations
- [ ] Integration with job boards API

---

## Troubleshooting

**AI not responding:**
- Check Ollama is running: `ollama list`
- Verify llama3.2 installed: `ollama pull llama3.2`

**Server won't start:**
- Port 5000 in use: Change in app.py
- Dependencies missing: `pip install -r requirements.txt`

**Slow responses:**
- First response slower (model loading)
- Consider smaller model: `llama2`

**Static files 404:**
- Flask route `/<path:filename>` serves from static folder
- Check static folder exists

---

## Development Commands

```bash
# Start development
python app.py

# Install dependencies
pip install -r requirements.txt

# Pull Ollama model
ollama pull llama3.2

# Git commands
git add .
git commit -m "message"
git push
```

---

## Contact & Support

- Developer: Claude Code (Anthropic)
- Repository: https://github.com/TrakeLean/Application-Creator
- User: Tarek Lein
