# Vite Frontend Boilerplate

A lightweight and efficient frontend boilerplate based on Vite with SCSS, autoprefixer, and asset optimization.

## Features

- ⚡️ Fast development with [Vite](https://vitejs.dev/)
- 🎨 SCSS support with glob imports
- 🔧 Autoprefixer and CSS minification
- 📦 JS minification using Terser
- 🔄 Font conversion (TTF/OTF → WOFF2)
- 🖼️ Image optimization (WebP conversion)
- 🎭 SVG sprite generation

## Project Structure

```
├── src/
│   ├── assets/
│   │   ├── fonts/        # Place TTF/OTF font files here
│   │   ├── images/       # Place original images here (JPG, PNG, etc.)
│   │   └── icons/        # Place SVG icons here for sprite generation
│   ├── scss/
│   │   ├── base/         # Base/reset styles
│   │   ├── components/   # Component styles
│   │   └── utils/        # Utilities, variables, mixins
│   ├── fonts/            # Generated WOFF2 fonts
│   ├── images/           # Generated WebP images and SVG sprite
│   └── main.js           # Entry point
├── scripts/              # Asset processing scripts
└── index.html            # Main HTML file
```

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Asset Processing

### Font Conversion

Place your TTF/OTF fonts in `src/assets/fonts/`, then run:

```bash
npm run fonts
```

This will:
- Convert fonts to WOFF2 format
- Save them to `src/fonts/`
- Generate a `fonts.css` file with proper `@font-face` declarations

### Image Conversion

Place your images in `src/assets/images/`, then run:

```bash
npm run images
```

This will convert images to WebP format and save them to `src/images/`.

### SVG Sprite Generation

Place your SVG icons in `src/assets/icons/`, then run:

```bash
npm run svg
```

This will:
- Generate an SVG sprite at `src/images/sprite.svg`
- Create a SCSS file with icon utility classes at `src/scss/utils/_icons.scss`

### Process All Assets

To run all asset processing scripts at once:

```bash
npm run assets
```

## Building for Production

```bash
npm run build
```

This will create a production-ready build in the `dist/` directory with:
- Minified CSS and JS
- Autoprefixed CSS
- Optimized assets

## Preview Production Build

```bash
npm run preview
```

---

Made with ❤️ using [Vite](https://vitejs.dev/) 