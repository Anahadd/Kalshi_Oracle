# Kalshi Called It - 2025 Year in Review

A stunning interactive showcase of Kalshi's accurate prediction market results from 2025. This Next.js application features a 3D carousel gallery and scroll-driven market cards highlighting the predictions that came true.

![Kalshi Called It](https://kalshi.com/og-image.png)

## Features

- **Hero Section**: Animated statistics showcasing prediction accuracy
- **Featured Markets**: Scroll-driven 3D market cards with parallax effects
- **Interactive 3D Gallery**: Carousel-style gallery with 20+ successful predictions
- **Smooth Animations**: Powered by Framer Motion and React Three Fiber
- **Responsive Design**: Optimized for all screen sizes
- **Dark Theme**: Premium dark aesthetic with Kalshi brand colors

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **3D Graphics**: React Three Fiber + Three.js
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Typography**: Custom fonts (Inter, Dahlia)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/kalshi/called-it-2025.git
cd called-it-2025

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/
│   ├── called-it/       # 3D Gallery page
│   │   ├── data.ts      # Market data
│   │   ├── page.tsx     # Gallery component
│   │   └── styles.css   # Gallery-specific styles
│   ├── fonts/           # Custom fonts
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/
│   ├── hero.tsx         # Hero section with stats
│   ├── market-card.tsx  # Scroll-driven market cards
│   ├── navigation.tsx   # Site navigation
│   ├── scroll-to-explore.tsx
│   ├── site-footer.tsx
│   ├── smooth-scroll.tsx
│   └── stats-section.tsx
├── public/
│   └── images/          # Market images (img1-20.jpg)
└── package.json
```

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Customization

### Adding New Markets

Edit `app/called-it/data.ts` to add or modify market predictions:

```typescript
{
  id: "market-id",
  title: "Market Title",
  question: "Will X happen?",
  category: "POLITICS", // POLITICS, SPORTS, CRYPTO, ECONOMICS, CULTURE, TECH
  outcome: "YES",
  predictionDate: "Dec 1, 2025",
  resolutionDate: "Dec 15, 2025",
  finalProbability: 94,
  volume: "$1.2M",
  imageIndex: 1, // Corresponds to img1.jpg
  kalshiUrl: "https://kalshi.com/markets/...",
  description: "Description of the prediction."
}
```

### Updating Images

Replace images in `public/images/` with new ones. Images should be:
- Format: JPEG
- Naming: `img1.jpg` through `img20.jpg`
- Recommended size: 800x600px or similar aspect ratio

## License

© 2025 Kalshi Inc. All rights reserved.

## Links

- [Kalshi.com](https://kalshi.com)
- [Kalshi Markets](https://kalshi.com/markets)
- [Twitter](https://twitter.com/Kalshi)
