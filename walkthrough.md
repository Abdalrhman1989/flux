# Flux Platform - Project Walkthrough

**"The Mood Market"** is ready for launch (Alpha). 
We have successfully built a viral-ready crypto platform that differentiates itself through gamification and social sentiment analysis.

## Key Features Implemented

### 1. The Hype Stream (Viral Feed)
- **Location**: Home Page (Right Column)
- **Concept**: A vertical, auto-updating feed of trending tokens.
- **Tech**: Custom `HypeStream` component with real-time simulated AI data.
- **Visuals**: Uses `GlassContainer` and "Neon Glass" aesthetics to pop on dark mode.

### 2. AI Hype Velocity Charts
- **Location**: Inside Hype Stream Cards
- **Concept**: Visualizes the *speed* of a trend, not just price.
- **Tech**: SVG-based `VelocityChart` with "Scanning Bar" animation.

### 3. Gamified "Swipe-to-Swap"
- **Location**: `/play` (Click "Launch App")
- **Concept**: Tinder-style interface for trading. Swipe Right to Buy, Left to Pass.
- **Visuals**: 3D CSS Card transitions with dynamic background lighting.

### 4. Neon Glass Design System
- **Style**: Custom Vanilla CSS variables (`globals.css`) for high-performance glassmorphism.
- **Font**: Inter (Google Fonts) for clean readability.
- **Animations**: CSS keyframes for `float`, `pulse`, and `glow`.

## How to Verify
1. Run the development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:3000`.
3. Observe the **auto-updating feed** on the right.
4. Click **"Launch App"** to go to the Arcade mode.
5. Try the **Swipe Interface** buttons (🚀 / ✕).

## Project Structure
- `src/components/feed/HypeStream.tsx`: The heart of the viral feed.
- `src/components/trading/SwipeSwap.tsx`: The gamified trading card.
- `src/lib/mock-ai`: The "Brain" simulating social sentiment.
