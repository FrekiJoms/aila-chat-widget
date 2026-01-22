export default class AILAChatWidget {
    constructor(options = {}) {
        this.webhookUrl = options.webhookUrl || '';
        this.welcomeMessage = options.welcomeMessage || 'Hello! How can I help you today?';
        this.position = options.position || 'bottom-right';
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        
        // Generate or retrieve session ID for user tracking
        this.sessionId = this.getSessionId();
        
        this.createElements();
        this.bindEvents();
    }
    
    hideFloatingText() {
        if (this.floatingText) {
            this.floatingText.style.display = 'none';
        }
    }
    
    getSessionId() {
        let sessionId = sessionStorage.getItem('aila_session_id');
        if (!sessionId) {
            // Generate UUID-like session ID
            sessionId = 'widget-guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('aila_session_id', sessionId);
        }
        return sessionId;
    }
    
    createElements() {
        // Create launcher bubble
        this.launcher = document.createElement('div');
        this.launcher.className = 'aila-chat-launcher';
        this.launcher.setAttribute('aria-label', 'Open chat');
        this.launcher.setAttribute('role', 'button');
        this.launcher.setAttribute('tabindex', '0');
        this.launcher.innerHTML = `
            <img src="./icon.png" alt="AILA" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%;">
            <div class="aila-floating-text">Chat with AILA</div>
        `;
        
        // Get reference to floating text
        this.floatingText = this.launcher.querySelector('.aila-floating-text');
        
        // Create chat container
        this.container = document.createElement('div');
        this.container.className = 'aila-chat-container';
        this.container.setAttribute('aria-hidden', 'true');
        
        this.container.innerHTML = `
            <div class="aila-chat-header">
                <h3>AILA CHATBOT</h3>
                <p style="position: absolute; top: 2.115rem; font-size: 0.75rem; color: var(--aila-text-muted);">Version 1.9.5</p>
                <button class="aila-chat-close" aria-label="Close chat">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="aila-chat-messages" role="log" aria-live="polite"></div>
            <div class="aila-chat-input-container">
                <div style="position: relative; flex: 1; display: flex; align-items: center;">
                    <textarea 
                        class="aila-chat-input" 
                        placeholder="Type your message..." 
                        rows="1"
                        aria-label="Type your message"
                    ></textarea>
                    <button class="aila-chat-send aila-send-active" aria-label="Send message">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        // Get references to inner elements
        this.messagesContainer = this.container.querySelector('.aila-chat-messages');
        this.input = this.container.querySelector('.aila-chat-input');
        this.sendButton = this.container.querySelector('.aila-chat-send');
        this.sendButton.classList.add('aila-send-active');

        // Dynamic send button positioning
        this.input.addEventListener('input', () => {
            const textLength = this.input.value.length;
            if (textLength > 40) {
                this.sendButton.style.position = 'absolute';
                this.sendButton.style.right = '12px';
                this.sendButton.style.left = 'auto';
                this.sendButton.style.transform = 'translateY(-50%)';
            } else {
                this.sendButton.style.position = 'absolute';
                this.sendButton.style.right = '12px';
                this.sendButton.style.left = 'auto';
                this.sendButton.style.transform = 'translateY(-50%)';
            }
        });
        this.closeButton = this.container.querySelector('.aila-chat-close');
    }
    
    bindEvents() {
        this.launcher.addEventListener("click", () => this.open());
        this.launcher.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                this.open();
            }
        });
        

        
        // Close button events
        this.closeButton.addEventListener('click', () => this.close());
        this.closeButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.close();
            }
        });
        
        // Send button events
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Input events
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize textarea
        this.input.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = Math.min(this.input.scrollHeight, 220) + 'px';
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
        
        // Close on outside click
        this.handleOutsideClick = (e) => {
            if (this.isOpen && 
                !this.container.contains(e.target) && 
                !this.launcher.contains(e.target)) {
                this.close();
            }
        };
        
        document.addEventListener('click', this.handleOutsideClick, true);
    }
    
    mount() {
        document.body.appendChild(this.container);
        document.body.appendChild(this.launcher);
    }
    
    open() {
        this.isOpen = true;
        this.launcher.setAttribute('aria-expanded', 'true');
        this.container.setAttribute('aria-hidden', 'false');
        this.container.classList.add('aila-chat-open');
        
        // Add welcome message if this is the first time opening
        if (this.messages.length === 0) {
            this.addMessage(this.welcomeMessage, 'bot');
        }
        
        // Focus input
        setTimeout(() => this.input.focus(), 300);
    }
    
    close() {
        this.isOpen = false;
        this.launcher.setAttribute('aria-expanded', 'false');
        this.container.setAttribute('aria-hidden', 'true');
        this.container.classList.remove('aila-chat-open');
    }
    
// CSP-safe text rendering with HTML and markdown support
    renderSafeMarkdown(mdText) {
        if (typeof mdText !== "string") mdText = String(mdText || "");
        
        // Allow safe HTML tags and convert markdown to HTML
        return mdText
            // First escape all HTML to prevent XSS
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Then unescape safe HTML tags we want to allow
            .replace(/&lt;br&gt;/g, '<br>')
            .replace(/&lt;\/br&gt;/g, '<br>')
            .replace(/&lt;br\s*\/?&gt;/g, '<br>')
            .replace(/&lt;strong&gt;/g, '<strong>')
            .replace(/&lt;\/strong&gt;/g, '</strong>')
            .replace(/&lt;b&gt;/g, '<strong>')
            .replace(/&lt;\/b&gt;/g, '</strong>')
            .replace(/&lt;em&gt;/g, '<em>')
            .replace(/&lt;\/em&gt;/g, '</em>')
            .replace(/&lt;i&gt;/g, '<em>')
            .replace(/&lt;\/i&gt;/g, '</em>')
            .replace(/&lt;code&gt;/g, '<code>')
            .replace(/&lt;\/code&gt;/g, '</code>')
            .replace(/&lt;pre&gt;/g, '<pre>')
            .replace(/&lt;\/pre&gt;/g, '</pre>')
            .replace(/&lt;p&gt;/g, '<p>')
            .replace(/&lt;\/p&gt;/g, '</p>')
            .replace(/&lt;div&gt;/g, '<div>')
            .replace(/&lt;\/div&gt;/g, '</div>')
            .replace(/&lt;span&gt;/g, '<span>')
            .replace(/&lt;\/span&gt;/g, '</span>')
            .replace(/&lt;ul&gt;/g, '<ul>')
            .replace(/&lt;\/ul&gt;/g, '</ul>')
            .replace(/&lt;ol&gt;/g, '<ol>')
            .replace(/&lt;\/ol&gt;/g, '</ol>')
            .replace(/&lt;li&gt;/g, '<li>')
            .replace(/&lt;\/li&gt;/g, '</li>')
            // Convert markdown to HTML
            // Bold text: **text** or __text__
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>')
            // Italic text: *text* or _text__
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            // Inline code: `code`
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // Line breaks (but only if not already HTML breaks)
            .replace(/\n(?!(?:[^<]*>|[^>]*<\/))/g, '<br>');
    }

    addMessage(content, type = 'user') {
        const message = document.createElement('div');
        message.className = `aila-chat-message aila-chat-message-${type}`;
        
        if (type === 'bot') {
            // Support markup for bot messages
            message.innerHTML = this.renderSafeMarkdown(content);
        } else {
            // Plain text for user messages
            message.textContent = content;
        }
        
        this.messagesContainer.appendChild(message);
        this.messages.push({ content, type, timestamp: Date.now() });
        
        // Scroll to bottom
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        
        return message;
    }
    
    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const typingMessage = document.createElement('div');
        typingMessage.className = 'aila-chat-message aila-chat-message-bot aila-chat-typing';
        typingMessage.innerHTML = `
            <div class="aila-chat-typing">
                <span class="aila-chat-typing-dot"></span>
                <span class="aila-chat-typing-dot"></span>
                <span class="aila-chat-typing-dot"></span>
            </div>
        `;
        
        this.messagesContainer.appendChild(typingMessage);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        
        return typingMessage;
    }
    
    hideTypingIndicator(typingElement) {
        if (typingElement && typingElement.parentNode) {
            typingElement.parentNode.removeChild(typingElement);
        }
        this.isTyping = false;
    }
    
    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        // Clear input and reset height
        this.input.value = '';
        this.input.style.height = 'auto';
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Show typing indicator
        const typingIndicator = this.showTypingIndicator();
        
        try {
            // Send to webhook with session ID
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: message,
                    sessionId: this.sessionId,
                    timestamp: Date.now()
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Handle streaming response if available
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/plain')) {
                // Handle streaming
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let botMessage = '';
                
                // Remove typing indicator and add bot message container
                this.hideTypingIndicator(typingIndicator);
                const botMessageElement = this.addMessage('', 'bot');
                
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    
                    const chunk = decoder.decode(value, { stream: true });
                    botMessage += chunk;
                    botMessageElement.textContent = botMessage;
                    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
                }
            } else {
                // Handle JSON response
                const data = await response.json();
                this.hideTypingIndicator(typingIndicator);
                this.addMessage(data.reply || data.response || data.message || 'Sorry, I couldn\'t process that.', 'bot');
            }
        } catch (error) {
            console.error('Chat widget error:', error);
            this.hideTypingIndicator(typingIndicator);
            this.addMessage('Sorry, I\'m having trouble connecting. Please try again later.', 'bot');
        }
    }
    
    destroy() {
        // Remove event listeners
        if (this.handleOutsideClick) {
            document.removeEventListener('click', this.handleOutsideClick, true);
        }
        
        this.launcher.remove();
        this.container.remove();
    }
}