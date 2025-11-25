// ================================
// Session Management
// ================================
const SESSION_ID = 'session_' + Date.now();
let isFirstMessage = true;

// ================================
// DOM Elements
// ================================
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const resetButton = document.getElementById('resetButton');

// ================================
// Event Listeners
// ================================

// Send message on button click
sendButton.addEventListener('click', sendMessage);

// Send message on Enter (Shift+Enter for new line)
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Reset conversation
resetButton.addEventListener('click', resetConversation);

// Auto-resize textarea
userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// ================================
// Core Functions
// ================================

async function sendMessage() {
    const message = userInput.value.trim();

    if (!message) {
        return;
    }

    // Remove welcome card on first message
    if (isFirstMessage) {
        const welcomeCard = chatContainer.querySelector('.welcome-card');
        if (welcomeCard) {
            welcomeCard.style.animation = 'fadeSlideOut 0.3s cubic-bezier(0.4, 0, 1, 1)';
            setTimeout(() => welcomeCard.remove(), 300);
        }
        isFirstMessage = false;
    }

    // Add user message to chat
    addMessageToChat('user', message);

    // Clear input and reset height
    userInput.value = '';
    userInput.style.height = 'auto';

    // Disable send button and input while processing
    sendButton.disabled = true;
    userInput.disabled = true;

    // Show typing indicator
    const typingId = addTypingIndicator();

    try {
        // Send message to backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                session_id: SESSION_ID
            })
        });

        // Remove typing indicator
        removeTypingIndicator(typingId);

        if (!response.ok) {
            throw new Error('Failed to get response from server');
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        // Add assistant response to chat
        addMessageToChat('assistant', data.response);

    } catch (error) {
        removeTypingIndicator(typingId);
        addMessageToChat('assistant', `❌ Error: ${error.message}\n\nMake sure Ollama is running and the llama3.2 model is installed.`);
        console.error('Error:', error);
    } finally {
        // Re-enable send button and input
        sendButton.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }
}

function addMessageToChat(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;

    messageDiv.appendChild(messageContent);
    chatContainer.appendChild(messageDiv);

    // Scroll to bottom smoothly
    smoothScrollToBottom();
}

function addTypingIndicator() {
    const typingId = 'typing_' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = typingId;
    typingDiv.className = 'typing-indicator';

    typingDiv.innerHTML = `
        <div class="typing-content">
            <span class="typing-text">Generating application</span>
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    chatContainer.appendChild(typingDiv);
    smoothScrollToBottom();

    return typingId;
}

function removeTypingIndicator(typingId) {
    const typingElement = document.getElementById(typingId);
    if (typingElement) {
        typingElement.style.animation = 'fadeOut 0.2s ease-out';
        setTimeout(() => typingElement.remove(), 200);
    }
}

async function resetConversation() {
    // Custom confirmation dialog would be better, but using native for simplicity
    const shouldReset = confirm('Are you sure you want to reset the conversation?');

    if (!shouldReset) {
        return;
    }

    try {
        // Call backend reset endpoint
        await fetch('/api/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session_id: SESSION_ID
            })
        });

        // Clear chat container
        chatContainer.innerHTML = `
            <div class="welcome-card">
                <div class="welcome-icon">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2"/>
                        <path d="M16 22C16 22 18 26 24 26C30 26 32 22 32 22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="18" cy="18" r="2" fill="currentColor"/>
                        <circle cx="30" cy="18" r="2" fill="currentColor"/>
                    </svg>
                </div>
                <h2 class="welcome-title">Welcome to Application AI</h2>
                <p class="welcome-text">I generate tailored job applications in English based on Tarek Lein's experience in cybersecurity, DevOps, and AI development.</p>
                <div class="welcome-features">
                    <div class="feature-item">
                        <span class="feature-icon">✦</span>
                        <span>Customized for Norwegian job postings</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">✦</span>
                        <span>Professional tone and structure</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">✦</span>
                        <span>Based on real experience and projects</span>
                    </div>
                </div>
                <p class="welcome-prompt">Paste the job posting below to get started →</p>
            </div>
        `;

        isFirstMessage = true;

    } catch (error) {
        alert('Error resetting conversation: ' + error.message);
        console.error('Error:', error);
    }
}

// ================================
// Utility Functions
// ================================

function smoothScrollToBottom() {
    // Use requestAnimationFrame for smooth scrolling
    requestAnimationFrame(() => {
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: 'smooth'
        });
    });
}

// Add CSS animation for fade out
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeSlideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================================
// Initialize
// ================================

// Focus input on load
userInput.focus();
