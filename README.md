# KANA Club Demo

A dark disco-themed single-page React website demo for a nightclub, featuring interactive 3D elements and modern UI components.

## Features

### 3D Interactive Elements
- **3D Disco Ball** - Animated hemisphere disco ball with mirror tiles and colorful lighting effects
- **Card Carousel** - 3D rotating carousel above the disco ball with drag controls
- **Suspension String** - Realistic hanging animation for the disco ball

### Modern UI Components
- **Dance Tile Cards** - Interactive cards with spotlight mouse-tracking effect
- **3D Testimonials Carousel** - Auto-playing carousel with 3D rotation and drag controls
- **Dark Disco Theme** - Very dark background with neon accent colors (magenta/cyan)
- **Responsive Design** - Mobile-friendly layout

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Helper components for R3F
- **Framer Motion** - Animation library for carousel
- **@use-gesture/react** - Drag interactions
- **React Icons** - Icon library

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── DiscoBall.jsx          # 3D disco ball with mirror tiles
│   ├── CardCarousel.jsx        # 3D rotating card carousel
│   ├── SuspensionString.jsx    # Hanging string component
│   ├── DanceTileCard.jsx       # Dance tile card with spotlight
│   ├── SpotlightCard.jsx       # Mouse-tracking spotlight effect
│   ├── Carousel.jsx            # Testimonials carousel
│   └── *.css                   # Component styles
├── App.jsx                     # Main application component
├── App.css                     # Global styles
├── main.jsx                    # Application entry point
└── index.css                   # Base styles and CSS variables

## Customization

### Colors
The color scheme can be modified in `src/index.css`:
```css
:root {
  --bg-dark: #0a0a0a;
  --bg-darker: #050505;
  --tile-glow: #ff00ff;
  --tile-glow-secondary: #00ffff;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
}
```

### 3D Scene
Adjust the disco ball and carousel settings in their respective component files:
- `DiscoBall.jsx` - Mirror tile density, lighting colors, rotation speed
- `CardCarousel.jsx` - Card count, radius, rotation speed
- `Carousel.jsx` - Autoplay delay, card content, styling

### Spotlight Effect
Customize the spotlight in `SpotlightCard.jsx`:
- Change `spotlightColor` prop for different glow colors
- Adjust gradient radius in `SpotlightCard.css`

## Demo Sections

1. **Hero Section** - 3D disco ball with interactive carousel and title
2. **About Section** - Lorem ipsum placeholder text
3. **Events Section** - Grid of dance tile cards with features
4. **Testimonials Section** - Auto-playing 3D carousel with customer reviews
5. **Gallery Section** - Placeholder grid for images
6. **Contact Section** - Call-to-action button

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Note: WebGL support required for 3D elements.

## License

This is a demo project for client presentation.

## Credits

Created for KANA Club demo presentation.
```
