# Aria AI - Premium Voice Agent

Aria is a production-ready, multilingual AI voice assistant for business websites. It uses Gemini 2.0 Flash Live for real-time, low-latency voice conversations.

## Features
- **Real-time Voice**: Sub-second latency using the Live API.
- **Multilingual**: Supports 12+ languages with auto-detection.
- **Lead Capture**: Integrated business inquiry collection.
- **Premium UI**: Polished, responsive widget with voice state animations.
- **Full-Stack**: Express backend for lead management and Vite frontend.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express.
- **AI**: Gemini 2.0 Flash Live (@google/genai).

## Setup

1. **Environment Variables**:
   Create a `.env` file based on `.env.example`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development**:
   ```bash
   npm run dev
   ```

## Deployment

### Railway / Render / Fly.io
1. Connect your GitHub repository.
2. Add `GEMINI_API_KEY` to environment variables.
3. The `Dockerfile` is pre-configured for deployment.

### Vercel (Frontend Only)
If you only want to deploy the frontend, you can use Vercel. Ensure you set `GEMINI_API_KEY` in the Vercel dashboard.

## Testing Checklist
- [ ] Microphone permission requested on start.
- [ ] AI greets automatically in English.
- [ ] User speaks in Tamil/Hindi/Arabic -> AI detects and responds in kind.
- [ ] Lead capture form sends data to `/api/leads`.
- [ ] Connection recovers if network drops.
