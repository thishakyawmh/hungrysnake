# Hungry Snake

A small browser-based Snake game built with HTML, CSS, and vanilla JavaScript.

## Features

- Keyboard arrow-key controls
- On-screen directional controls for touch devices
- Food collection and snake growth
- Wall and self-collision detection
- Restart after game over
- Food placement avoids occupied snake cells

## Run locally

Serve the project with a local static server because the game uses JavaScript modules:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Quality checks

Node.js 22 or newer:

```bash
npm test
npm run check
```

Game rules are separated into pure utility functions and tested without a browser.
