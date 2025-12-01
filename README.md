# 🎮 Tetris Game

A classic Tetris game implementation built with vanilla JavaScript, HTML5 Canvas, and CSS3. Features a modern, responsive design with smooth animations and an intuitive user interface.

![Tetris Game](https://img.shields.io/badge/Game-Tetris-purple?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-Responsive-blue?style=for-the-badge&logo=css3)

## 🌟 Features

- **Classic Tetris Gameplay**: All 7 standard tetromino shapes (I, J, L, O, S, T, Z)
- **Progressive Difficulty**: Speed increases with each level
- **Score System**: Points awarded for line clears and hard drops
- **Next Piece Preview**: See what's coming next
- **Pause Functionality**: Pause and resume gameplay anytime
- **Responsive Design**: Adapts to different screen sizes
- **Modern UI**: Beautiful gradient design with smooth animations
- **Keyboard Controls**: Full keyboard support for gameplay

## 🎯 Game Mechanics

### Scoring System
- **Single Line**: 100 × Level
- **Double Lines**: 300 × Level
- **Triple Lines**: 500 × Level
- **Tetris (4 Lines)**: 800 × Level
- **Soft Drop**: 1 point per cell
- **Hard Drop**: 2 points per cell

### Level Progression
- Levels increase every 10 lines cleared
- Drop speed increases with each level
- Maximum speed reached at higher levels

## 🎮 Controls

| Key | Action |
|-----|--------|
| `←` | Move piece left |
| `→` | Move piece right |
| `↓` | Soft drop (move down faster) |
| `↑` | Rotate piece clockwise |
| `Space` | Hard drop (instant drop) |
| `P` | Pause/Resume game |

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation

1. **Clone or download** this repository
2. **Open** `index.html` in your web browser
3. **Click** "Start Game" to begin playing

That's it! No build process or installation required.

### Running Locally

Simply open the `index.html` file in your browser:

```bash
# Using Python's built-in server (optional)
python -m http.server 8000

# Or using Node.js http-server (optional)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## 📁 Project Structure

```
Tetris/
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── tetris.js       # Game logic and mechanics
└── README.md       # This file
```

## 🎨 Design Features

- **Gradient Background**: Purple gradient backdrop
- **Modern Card Design**: Clean, rounded container with shadows
- **Color-Coded Pieces**: Each tetromino has a unique vibrant color
- **Shine Effects**: Blocks have subtle shine for 3D appearance
- **Responsive Layout**: Adapts to mobile and desktop screens
- **Smooth Animations**: Hover effects and transitions

## 🔧 Technical Details

### Technologies Used
- **HTML5 Canvas**: For rendering the game board and pieces
- **Vanilla JavaScript**: Pure ES6+ JavaScript, no frameworks
- **CSS3**: Modern styling with flexbox and gradients
- **RequestAnimationFrame**: Smooth 60 FPS game loop

### Game Constants
- **Board Size**: 10 columns × 20 rows
- **Block Size**: 30 pixels
- **Initial Drop Speed**: 1000ms
- **Speed Increase**: 100ms faster per level
- **Minimum Speed**: 100ms

### Code Highlights
- Object-oriented piece management
- Collision detection system
- Line clearing algorithm
- Rotation matrix implementation
- Responsive game loop with delta timing

## 🎯 Game Rules

1. **Objective**: Clear as many lines as possible by filling horizontal rows
2. **Piece Movement**: Guide falling pieces left, right, or rotate them
3. **Line Clearing**: Complete rows disappear and award points
4. **Game Over**: Game ends when pieces stack to the top
5. **Level Up**: Every 10 lines cleared increases the level and speed

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📱 Mobile Support

The game is responsive and works on mobile devices, though keyboard controls are required for gameplay. Touch controls are not currently implemented.

## 🎨 Customization

### Changing Colors
Edit the `COLORS` array in `tetris.js`:
```javascript
const COLORS = [
    null,
    '#FF0D72', // I piece
    '#0DC2FF', // J piece
    // ... modify as desired
];
```

### Adjusting Difficulty
Modify game constants in `tetris.js`:
```javascript
const COLS = 10;        // Board width
const ROWS = 20;        // Board height
const BLOCK_SIZE = 30;  // Pixel size of blocks
```

### Styling
Customize the appearance in `style.css`:
- Change gradient colors
- Modify border radius
- Adjust spacing and sizing

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

Potential features for future versions:
- [ ] Touch controls for mobile devices
- [ ] Sound effects and background music
- [ ] High score persistence (localStorage)
- [ ] Ghost piece (preview of landing position)
- [ ] Hold piece functionality
- [ ] Multiple difficulty modes
- [ ] Multiplayer support
- [ ] Custom themes

## 📄 License

This project is open source and available for personal and educational use.

## 👨‍💻 Author

Made with ❤️ by Bob

## 🙏 Acknowledgments

- Classic Tetris game design by Alexey Pajitnov
- Inspired by the timeless gameplay of the original Tetris

---

**Enjoy the game! 🎮✨**

*If you encounter any issues or have suggestions, feel free to open an issue or contribute to the project.*