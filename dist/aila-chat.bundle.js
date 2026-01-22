/**
 * AILA Chat Widget - Production Bundle
 * Version: 1.0.0
 * Simple API for n8n-compatible integration
 */
import AILAChatWidget from './chat-widget.bundle.js';

/**
 * Initialize AILA Chat Widget with simple API
 * @param {Object} options - Configuration options
 * @param {string} options.webhookUrl - Webhook URL for chat messages
 * @param {string} [options.welcomeMessage='Hello! How can I help you today?'] - Welcome message
 * @param {string} [options.position='bottom-right'] - Position of chat widget
 * @param {boolean} [options.autoShow=true] - Auto-show chat widget on load
 */
export function createChat(options = {}) {
    // Validate required webhook URL
    if (!options.webhookUrl) {
        console.error('AILA Chat: webhookUrl is required');
        return null;
    }

    // Default configuration
    const config = {
        webhookUrl: options.webhookUrl,
        welcomeMessage: options.welcomeMessage || 'Hello! How can I help you today?',
        position: options.position || 'bottom-right',
        autoShow: options.autoShow === true // Default to false (user must click)
    };

    // Create and mount widget
    const widget = new AILAChatWidget(config);
    widget.mount();

    // Auto-show if enabled
    if (config.autoShow) {
        setTimeout(() => widget.open(), 1000);
    }

    // Return widget instance for advanced usage
    return widget;
}

// Auto-initialize if global options are set
if (typeof window !== 'undefined' && window.ailaChatOptions) {
    createChat(window.ailaChatOptions);
}

// Export for ESM and CommonJS compatibility
export { AILAChatWidget };
export default { createChat, AILAChatWidget };

// Also support global script loading
if (typeof window !== 'undefined') {
    window.AILAChat = {
        createChat,
        AILAChatWidget
    };
}