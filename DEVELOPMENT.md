# Development Context

## Project Overview

**AI Application Generator** - A local AI-powered tool that generates professional job applications in English for Tarek Lein, specifically designed for Norwegian job positions. Uses Ollama with llama3.2 model.

**Repository:** https://github.com/TrakeLean/Application-Creator

---

## 🔥 Quick Start - Context for Next Session

**What This Project Does:**
Generates job applications in English for Tarek Lein (cybersecurity engineer transitioning to software dev) using Ollama/llama3.2.

**Critical System:**
✅ **Skills file (`INFO/skills.md`)** is dynamically loaded into AI prompt on every request
✅ AI can ONLY mention skills listed in that file - prevents hallucination
✅ No restart needed when updating skills

**Key Files:**
- `INFO/skills.md` - Edit to update technical skills (instant effect)
- `INFO/TarekLeinCV.docx` - Candidate CV
- `INFO/Resultater_fra_Vitnemalsportalen.pdf` - Bachelor degree courses
- `app.py` - Backend with `load_skills()` function (line 10-16) and injection logic (line 248-249)

**Current State:**
✅ Skills loading implemented
✅ Anti-hallucination rules enforced
✅ INFO folder structure organized
⏸️ Changes not yet committed to git

---

## Recent Changes (2025-01-26)

### INFO Folder Structure
- Moved `TarekLeinCV.docx` to `INFO/` folder
- Added `Resultater_fra_Vitnemalsportalen.pdf` - bachelor degree course results
- Created `INFO/skills.md` - comprehensive technical skills reference

### Dynamic Skills Loading Implementation
- **Critical Feature:** AI now dynamically loads technical skills from `INFO/skills.md`
- **File:** `app.py` - Added `load_skills()` function (line 10-16)
- **Injection Point:** System prompt uses `{SKILLS_CONTENT}` placeholder (line 69)
- **Runtime:** Skills loaded and injected on every API request (line 248-249)
- **Impact:** AI cannot hallucinate or claim skills not in the file
- **Benefit:** Update `INFO/skills.md` anytime - changes apply immediately without server restart

### System Prompt Enhancements
- Added "CRITICAL - TECHNICAL SKILLS" section with strict validation rules
- Enhanced "ANTI-HALLUCINATION RULES" to reference skills file multiple times
- Multiple defensive layers to prevent false skill claims

---

## Architecture

### Backend (Flask)
- **File:** `app.py`
- **Framework:** Flask with CORS enabled
- **AI Integration:** Ollama Python library
- **Model:** llama3.2 (2GB, local)
- **Session Management:** In-memory conversation history per session ID
- **Skills Loading:** Dynamic loading from `INFO/skills.md` on every request
  - Function: `load_skills()` reads and returns skills file content
  - Injection: Skills injected into system prompt via placeholder replacement
  - Error handling: Returns error message if skills file not found

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

2. **Dynamic Skills Loading System (CRITICAL)**
   - **File:** `INFO/skills.md` - Single source of truth for all technical skills
   - **Implementation:** `app.py` loads skills file on every request and injects into system prompt
   - **Purpose:** Prevents AI from hallucinating technical skills not explicitly listed
   - **How it works:**
     - `load_skills()` function reads `INFO/skills.md`
     - Content is injected into system prompt via `{SKILLS_CONTENT}` placeholder
     - AI receives complete, up-to-date skills list with every request
     - No server restart needed when updating skills
   - **Skills Categories:**
     - Programming Languages (with proficiency levels and years of experience)
     - Frameworks & Libraries
     - Tools & Technologies
     - Databases
     - Security, Risk & Compliance
     - Consulting, Architecture & Governance
     - Other Technical Skills
   - **Strict Rules:** AI can ONLY mention skills from this file - no assumptions, no related technologies

3. **Anti-Hallucination Rules**
   - Critical section in system prompt to prevent fabrication
   - AI must only use information from prompt, CV, and `INFO/skills.md`
   - Cannot invent projects, experience, achievements, or technical skills
   - Coding experience is from hobby projects + bachelor degree ONLY (not professional dev roles)
   - Multiple layers of validation in system prompt

4. **UI Design**
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
   - **Technical Skills:** AI MUST reference INFO/skills.md - NEVER mention skills not listed there

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
   - Only use info from: candidate section, job ad, CV, INFO/skills.md
   - **MUST check INFO/skills.md before mentioning ANY technical skill**
   - Never invent: projects, experience, achievements, skills, companies, certifications
   - Never mention programming languages/frameworks/tools not in INFO/skills.md
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
├── INFO/
│   ├── TarekLeinCV.docx           # Candidate CV
│   ├── Resultater_fra_Vitnemalsportalen.pdf  # Bachelor degree course results
│   └── skills.md                  # Technical skills reference
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
6. `bc103ff` - Add comprehensive development context documentation
7. **(Pending)** - Implement dynamic skills loading system to prevent skill hallucination

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
8. **Skills Reference (CRITICAL):** AI MUST read INFO/skills.md before mentioning ANY technical skill - never claim knowledge of languages/tools not listed there
9. **Education Records:** INFO/Resultater_fra_Vitnemalsportalen.pdf contains bachelor degree course results

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

## Quick Reference

### Important Files to Edit

| File | Purpose | When to Edit |
|------|---------|--------------|
| `INFO/skills.md` | Technical skills list | Add/remove skills - changes apply immediately |
| `app.py` | System prompt & backend logic | Modify AI behavior or add features |
| `static/styles.css` | UI styling | Change appearance |
| `static/script.js` | Frontend functionality | Modify chat behavior |

### Key Implementation Details

**Skills Loading (app.py:10-16, 248-249)**
```python
def load_skills():
    skills_path = os.path.join('INFO', 'skills.md')
    try:
        with open(skills_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "ERROR: INFO/skills.md not found."
```

**System Prompt Injection (app.py:248-249)**
```python
skills_content = load_skills()
current_system_prompt = SYSTEM_PROMPT.replace('{SKILLS_CONTENT}', skills_content)
```

### Critical Constraints

✅ **DO:**
- Edit `INFO/skills.md` to update technical skills
- Keep system prompt anti-hallucination rules strict
- Output in English only (user translates to Norwegian)
- Use only real experience from prompt/CV/skills file

❌ **DON'T:**
- Let AI claim skills not in `INFO/skills.md`
- Allow hallucination of projects, experience, or achievements
- Treat coding experience as professional (it's hobby/education only)
- Use job boards (finn.no, LinkedIn) as employer names
- Output in Norwegian (technical terms get awkwardly translated)

---

## Contact & Support

- Developer: Claude Code (Anthropic)
- Repository: https://github.com/TrakeLean/Application-Creator
- User: Tarek Lein
