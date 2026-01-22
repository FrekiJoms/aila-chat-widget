# 🤖 AILA Chat Widget

Enhanced, production-ready chat widget with n8n-compatible API and beautiful AILA gradient design.

## ✨ Features

- 🎨 **Beautiful AILA Gradient Design** - Animated gradient backgrounds and glass morphism
- 💬 **Rich Message Support** - Markdown (bold, italic, code) and HTML tags
- ⚡ **Typing Indicators** - Smooth animated typing indicators
- 📱 **Mobile Responsive** - Perfect on all devices
- 🔄 **n8n Compatible API** - Drop-in replacement for @n8n/chat
- 🎯 **Session Tracking** - Automatic session ID generation
- ♿ **Accessibility** - ARIA labels, keyboard navigation
- 🔒 **CSP Safe** - Content Security Policy compliant
- 🌙 **High Contrast** - Supports reduced motion and high contrast modes

## 🚀 Quick Start

### Basic Integration (n8n Compatible)

```html
<link href="chat-widget.css" rel="stylesheet" />
<script type="module">
    import { createChat } from './aila-chat.js';

    createChat({
        webhookUrl: 'YOUR_WEBHOOK_URL'
    });
</script>
```

### Advanced Configuration

```html
<link href="chat-widget.css" rel="stylesheet" />
<script type="module">
    import { createChat } from './aila-chat.js';

    createChat({
        webhookUrl: 'YOUR_WEBHOOK_URL',
        welcomeMessage: 'Hello! I\\'m AILA, your AI assistant.',
        position: 'bottom-right',          // 'bottom-right', 'bottom-left'
        autoShow: false                   // Auto-open chat on load
    });
</script>
```

## 📁 Files

### Required Files
- `chat-widget.css` - All styles (consolidated from style.css)
- `aila-chat.js` - Simple API wrapper
- `chat-widget.js` - Core widget class

### Optional Files
- `demo.html` - Complete working demo
- `test-server.js` - Local development server

## 🎯 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `webhookUrl` | string | **(Required)** | Your n8n webhook URL |
| `welcomeMessage` | string | 'Hello! How can I help you today?' | Initial greeting message |
| `position` | string | 'bottom-right' | Widget position ('bottom-right', 'bottom-left') |
| `autoShow` | boolean | true | Auto-open chat on page load |

## 💬 Message Format

Your webhook should return JSON with a `reply` field:

```json
{
    "reply": "Hello! **This is bold** and *this is italic* text."
}
```

### Supported Formatting

**Markdown:**
- `**bold text**` → **bold text**
- `*italic text*` → *italic text*
- `_italic text_` → *italic text*
- `__bold text__` → **bold text**
- `` `inline code` `` → `inline code`

**HTML:**
- `<br>` for line breaks
- `<strong>` and `<b>` for bold
- `<em>` and `<i>` for italic
- `<code>` and `<pre>` for code blocks
- `<p>`, `<div>`, `<span>` for structure
- `<ul>`, `<ol>`, `<li>` for lists

## 🔧 Development

### Local Testing

```bash
# Start development server
node test-server.js

# Open browser
http://localhost:8002/
```

### Widget API

```javascript
import { AILAChatWidget } from './chat-widget.js';

const widget = new AILAChatWidget({
    webhookUrl: 'https://your-webhook-url.com/webhook',
    welcomeMessage: 'Custom welcome message',
    position: 'bottom-right'
});

widget.mount();       // Add to DOM
widget.open();        // Open chat
widget.close();       // Close chat
widget.destroy();     // Remove from DOM
```

### Session Tracking

Each widget instance automatically generates a session ID:

```javascript
console.log(widget.sessionId); // "guest_1642694400000_abc123def"
```

The session ID is sent with every message:

```json
{
    "message": "Hello",
    "sessionId": "guest_1642694400000_abc123def",
    "timestamp": 1642694400000
}
```

## 🌐 CDN Deployment

### Using CDN (Coming Soon)

```html
<link href="https://cdn.jsdelivr.net/npm/aila-chat/dist/style.css" rel="stylesheet" />
<script type="module">
    import { createChat } from 'https://cdn.jsdelivr.net/npm/aila-chat/dist/chat.bundle.es.js';

    createChat({
        webhookUrl: 'YOUR_WEBHOOK_URL'
    });
</script>
```

### Self-Hosting

1. Upload the three required files to your server
2. Update the import paths in your HTML
3. Ensure your server serves files with correct MIME types

## 🎨 Customization

### CSS Variables

Override these variables in your CSS:

```css
:root {
    --aila-primary: #00d1ff;        /* Primary accent color */
    --aila-primary-hover: #1dd3c9;   /* Hover accent color */
    --aila-bg-primary: #041428;      /* Main background */
    --aila-text-primary: #e8fbff;    /* Main text color */
    --aila-radius: 1.2rem;           /* Border radius */
}
```

### Logo

Replace the launcher bubble icon by adding an `icon.png` file or updating the HTML in `chat-widget.js`.

## 🔒 Security & CSP

The widget is Content Security Policy (CSP) safe:
- No `eval()` or dangerous functions
- Sanitized HTML rendering
- Safe markdown parsing
- No inline styles or scripts

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari/iOS
- ✅ Chrome Mobile

## 🐛 Troubleshooting

### Chat doesn't appear
1. Check console for errors
2. Verify all required files are loaded
3. Ensure webhook URL is valid

### Messages not sending
1. Check webhook URL is accessible
2. Verify CORS headers on your webhook
3. Check network tab in browser dev tools

### Styling issues
1. Ensure `chat-widget.css` is loaded
2. Check for CSS conflicts with your site
3. Verify CSS variables are not overridden

## 📄 License

MIT License - Feel free to use in commercial projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Made with ❤️ by the AILA Team**