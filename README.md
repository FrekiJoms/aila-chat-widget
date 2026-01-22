# AILA Chat Widget

Production-ready, feature-rich chat widget with beautiful AILA gradient design and seamless integration.

## Features

- **Beautiful AILA Gradient Design** - Animated gradient backgrounds with glass morphism
- **Rich Message Support** - Full Markdown (bold, italic, code) and safe HTML rendering
- **Typing Indicators** - Smooth animated typing indicators with pulsing dots
- **Mobile Optimized** - Responsive floating widget with touch-friendly interface
- **n8n Compatible API** - Drop-in replacement for existing n8n workflows
- **Session Tracking** - Automatic persistent session ID generation
- **Floating Text** - Animated "Chat with AILA" prompt above launcher
- **Click-Outside Close** - Intuitive click-outside-to-close functionality
- **Full Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **CSP Safe** - Content Security Policy compliant rendering
- **High Contrast Support** - Respects prefers-reduced-motion and high contrast
- **Safe Area Support** - Optimized for notched phones and modern devices

## Quick Start

### Basic Integration (n8n Compatible)

```html
<!-- AILA Chat Widget Styles -->
<link href="./dist/chat-widget.css" rel="stylesheet" />

<!-- AILA Chat Widget Initialization -->
<script type="module">
    import { createChat } from "./dist/aila-chat.bundle.js";

    createChat({
        webhookUrl: 'YOUR_WEBHOOK_URL'
    });
</script>
```

### Advanced Configuration

```html
<!-- AILA Chat Widget Styles -->
<link href="./dist/chat-widget.css" rel="stylesheet" />

<!-- AILA Chat Widget Initialization -->
<script type="module">
    import { createChat } from "./dist/aila-chat.bundle.js";

    createChat({
        webhookUrl: 'YOUR_WEBHOOK_URL',
        welcomeMessage: 'Hello! I\\'m AILA, your AI assistant.',
        position: 'bottom-right',          // 'bottom-right', 'bottom-left'
        autoShow: false                   // Auto-open chat on load
    });
</script>
```

## File Structure

### Distribution Files (Ready for Deployment)
```
dist/
├── chat-widget.css           # Complete widget styles (consolidated)
├── chat-widget.bundle.js     # Core AILAChatWidget class
├── aila-chat.bundle.js      # Simple API wrapper
└── types.d.ts              # TypeScript definitions
```

### Project Files
```
├── chat-widget.js           # Source widget class
├── icon.png                # AILA launcher icon
├── demo.html               # Complete working demo
├── test-floating.html       # Floating text test
├── FEATURES_ADDED.md       # Feature documentation
├── ALL_FIXES_COMPLETE.md   # Development log
└── package.json           # NPM package configuration
```

### Required Files for Integration
- `dist/chat-widget.css` - All widget styles
- `dist/aila-chat.bundle.js` - Simple API (recommended)
- `dist/chat-widget.bundle.js` - Core widget class (advanced)
- `icon.png` - Launcher icon (optional)

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `webhookUrl` | string | **(Required)** | Your n8n webhook URL |
| `welcomeMessage` | string | 'Hello! How can I help you today?' | Initial greeting message |
| `position` | string | 'bottom-right' | Widget position ('bottom-right', 'bottom-left') |
| `autoShow` | boolean | false | Auto-open chat on page load (recommended: false) |

### New Features
- **Floating Text**: "Chat with AILA" animation above launcher bubble
- **Click-Outside Close**: Click anywhere outside chat to close it
- **Mobile Optimized**: Floating widget design (not fullscreen) on mobile
- **Enhanced Accessibility**: Full keyboard navigation and ARIA support
- **Safe Area Support**: Handles notched phones and rounded corners

## Message Format

Your webhook should return JSON with a `reply`, `response`, or `message` field:

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

**Safe HTML Tags:**
- `<br>` for line breaks
- `<strong>` and `<b>` for bold
- `<em>` and `<i>` for italic
- `<code>` and `<pre>` for code blocks
- `<p>`, `<div>`, `<span>` for structure
- `<ul>`, `<ol>`, `<li>` for lists

### Streaming Support
Widget supports both JSON responses and streaming text/plain responses for real-time typing effects.

## Development

### Local Testing

```bash
# Using Python (if available)
python -m http.server 8000

# Open browser
http://localhost:8000/demo.html
```

### Widget API (Advanced Usage)

```javascript
import { AILAChatWidget, createChat } from './dist/chat-widget.bundle.js';

// Method 1: Simple API (Recommended)
const widget = createChat({
    webhookUrl: 'https://your-webhook-url.com/webhook',
    welcomeMessage: 'Custom welcome message',
    position: 'bottom-right'
});

// Method 2: Direct Class
const chatWidget = new AILAChatWidget({
    webhookUrl: 'https://your-webhook-url.com/webhook',
    welcomeMessage: 'Custom welcome message',
    position: 'bottom-right'
});

chatWidget.mount();       // Add to DOM
chatWidget.open();        // Open chat
chatWidget.close();       // Close chat
chatWidget.destroy();     // Remove from DOM
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

## Deployment Guide

### GitHub Pages (Recommended)

1. **Push to GitHub Repository**
   ```bash
   git add .
   git commit -m "Deploy AILA Chat Widget"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch → main
   - Folder: / (root)
   - Save

3. **Access Your Widget**
   ```
   https://yourusername.github.io/aila-chat-widget/
   ```

### Self-Hosting

1. **Upload Required Files**
   ```
   your-server.com/aila-chat/
   ├── dist/chat-widget.css
   ├── dist/aila-chat.bundle.js
   ├── dist/chat-widget.bundle.js
   └── icon.png
   ```

2. **Integration Code**
   ```html
   <link href="/aila-chat/dist/chat-widget.css" rel="stylesheet" />
   <script type="module">
       import { createChat } from "/aila-chat/dist/aila-chat.bundle.js";
       createChat({
           webhookUrl: 'YOUR_WEBHOOK_URL'
       });
   </script>
   ```

## CDN Usage (Ready Now!)

### jsDelivr CDN (Recommended)

```html
<!-- AILA Chat Widget CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/FrekiJoms/aila-chat-widget@v1.0.0/dist/chat-widget.css">

<!-- AILA Chat Widget JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/FrekiJoms/aila-chat-widget@v1.0.0/dist/aila-chat.umd.min.js"></script>
<script>
    AILAChat.createChat({
        webhookUrl: 'YOUR_WEBHOOK_URL'
    });
</script>
```

### ES Module Version (Modern Browsers)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/FrekiJoms/aila-chat-widget@v1.0.0/dist/chat-widget.css">
<script type="module">
    import { createChat } from 'https://cdn.jsdelivr.net/gh/FrekiJoms/aila-chat-widget@v1.0.0/dist/aila-chat.bundle.js';
    
    createChat({
        webhookUrl: 'YOUR_WEBHOOK_URL'
    });
</script>
```

### unpkg Alternative

```html
<link rel="stylesheet" href="https://unpkg.com/aila-chat-widget@1.0.0/dist/chat-widget.css">
<script src="https://unpkg.com/aila-chat-widget@1.0.0/dist/aila-chat.umd.min.js"></script>
```

### ES Module Version (Modern Browsers)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/aila-chat-widget@v1.0.0/dist/chat-widget.css">
<script type="module">
    import { createChat } from 'https://cdn.jsdelivr.net/gh/YOUR_USERNAME/aila-chat-widget@v1.0.0/dist/aila-chat.bundle.js';
    
    createChat({
        webhookUrl: 'YOUR_WEBHOOK_URL'
    });
</script>
```

### unpkg Alternative

```html
<link rel="stylesheet" href="https://unpkg.com/aila-chat-widget@1.0.0/dist/chat-widget.css">
<script src="https://unpkg.com/aila-chat-widget@1.0.0/dist/aila-chat.umd.min.js"></script>
```

### NPM Package (Coming Soon)

```bash
npm install aila-chat-widget
```

## Customization

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

## Security & CSP

The widget is Content Security Policy (CSP) safe:
- No `eval()` or dangerous functions
- Sanitized HTML rendering
- Safe markdown parsing
- No inline styles or scripts

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari/iOS
- ✅ Chrome Mobile

## Troubleshooting

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

## License

MIT License - Feel free to use in commercial projects!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Pre-Deployment Checklist

### Before Deploying
- [ ] Test all features in `demo.html`
- [ ] Verify webhook URL is working
- [ ] Test on mobile devices
- [ ] Check browser compatibility
- [ ] Validate CSS variables work
- [ ] Test accessibility features

### Final Files to Deploy
```
aila-chat-widget/
├── dist/
│   ├── chat-widget.css
│   ├── aila-chat.bundle.js
│   ├── chat-widget.bundle.js
│   └── types.d.ts
├── icon.png
├── demo.html
└── README.md
```

### GitHub Release Steps
1. Tag your release: `git tag v1.0.0`
2. Push tags: `git push origin v1.0.0`
3. Create GitHub Release with release notes
4. Update repository description

---

**Production Ready - Version 1.9.5**

Made with ❤️ by freki