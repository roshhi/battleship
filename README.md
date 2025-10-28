# Battleship Game

A modern, browser-based implementation of the classic **Battleship** strategy game — built with **HTML**, **CSS**, and **JavaScript**, and bundled using **Webpack** for a modular and efficient development workflow.


## Preview

<img width="1920" height="1243" alt="Screenshot 2025-10-07 at 6 05 14 AM" src="https://github.com/user-attachments/assets/fd7e6730-269b-4aa3-8a25-9da5a03207b6" />

<img width="3840" height="2486" alt="Screenshot 2025-10-28 at 4 45 32 AM (1)" src="https://github.com/user-attachments/assets/acd8f975-856f-4abc-b86f-3b4ca7d4cfc9" />

<img width="3840" height="2486" alt="Screenshot 2025-10-28 at 4 45 45 AM (1)" src="https://github.com/user-attachments/assets/1090f923-7497-47b3-b0ea-de8309f9d394" />

<img width="1920" height="1243" alt="Screenshot 2025-10-08 at 5 46 47 PM" src="https://github.com/user-attachments/assets/3b61eb82-ba66-412a-bf56-5edbe5ff1c11" />

<img width="3840" height="2486" alt="Screenshot 2025-10-28 at 4 46 24 AM" src="https://github.com/user-attachments/assets/2a82a7e0-72d7-4441-8e24-256fa859f5a9" />

<img width="3840" height="2486" alt="Screenshot 2025-10-28 at 4 46 42 AM" src="https://github.com/user-attachments/assets/c83087f2-320e-42be-95a2-97e79e835b6f" />

<img width="3840" height="2486" alt="Screenshot 2025-10-28 at 4 47 47 AM" src="https://github.com/user-attachments/assets/bf911d41-4a71-4947-ad37-2cafea30a603" />

<img width="3840" height="2486" alt="Screenshot 2025-10-28 at 4 48 37 AM" src="https://github.com/user-attachments/assets/b2334fcf-5da3-41b8-8829-b75b4432230c" />

---

## Project Structure

```
BATTLESHIP/
│
├── dist/                     # Compiled output after Webpack build
├── src/                      # Source files
│   ├── assets/               # Game assets (audio, images, svgs)
│   │   ├── audio/            # Sound effects and music
│   │   ├── images/           # Game visuals and icons
│   │   └── svgs/             # SVG assets
│   │
│   ├── components/           # Reusable UI/game components
│   │   ├── hero.js           # Hero page components
│   │   └── main.js           # Main game page components
│   │
│   ├── pages/                # Page-level logic
│   │   ├── landing-page.js   # Handles landing/start screen
│   │   └── game-page.js      # Main gameplay logic
│   │
│   ├── utils/                # Utility and helper functions
│   │   ├── domFunctions.js   # DOM manipulation helpers
│   │   └── gameFunctions.js  # Core game logic (ship placement, hits, etc.)
│   │
│   ├── styles.css            # Global CSS styling
│   ├── index.js              # Entry point for Webpack
│   └── template.html         # HTML template used by Webpack
│
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
│
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/battleship.git
cd battleship
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run in Development Mode
```bash
npm run start
```
Runs the game locally using **Webpack Dev Server**.  
Once started, visit `http://localhost:8080` in your browser to play.

### 4. Build for Production
```bash
npm run build
```
Generates an optimized production build in the `dist/` folder.

---

## How It Works

- Players place ships dynamically using drag-and-drop.
- The grid system is generated and updated through DOM manipulation.
- Game logic (hit detection, turn switching, win condition) is handled in `gameFunctions.js`.
- Audio feedback (hits, misses, explosions) enhances gameplay immersion.

---

## Features

- Interactive gameplay with hit/miss logic  
- Dynamic ship placement around both axis x and y
- Sound effects for actions  
- Responsive design for multiple screen sizes  
- Modular architecture with reusable components  
- Webpack setup for efficient builds and hot reloading  

---

## Technologies Used

| Technology | Purpose |
|-------------|----------|
| **JavaScript (ES6)** | Core logic and interactivity |
| **Webpack** | Module bundling and optimization |
| **CSS3** | Styling and responsiveness |

---

## License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute this project with proper attribution.

---

## Author

Developed by **[Your Name]**  
💡 Open for contributions and feedback.

---


## Overview

The Battleship game challenges players to strategically position their ships on a grid and take turns firing at their opponent’s hidden fleet. The objective is simple: **sink all enemy ships before they sink yours**.

This version features a clean UI, responsive layout, and modular architecture, making it both enjoyable to play and easy to maintain or extend.

---
````


