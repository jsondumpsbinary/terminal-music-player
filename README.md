# 🎵 Terminal Music Player

A sleek, interactive command-line application that plays `.mp3` files directly from your terminal. Built entirely with Node.js, this project demonstrates how to handle raw terminal data streams, manage background processes, and build a text-based user interface.

## ✨ Features

- **Interactive UI**: Navigate through your music library using the arrow keys.
- **Visual Highlighting**: The currently selected song is highlighted in bright cyan using ANSI color codes.
- **In-Place Rendering**: The menu redraws itself cleanly without flooding the terminal with scrolling text.
- **Live Updates**: Displays the currently playing song and playback status in real-time.
- **Process Management**: Safely stops background audio processes when switching songs or closing the app.
- **OS-Level Pause/Resume**: Freezes and unfreezes the audio process using native `SIGSTOP` and `SIGCONT` signals.
- **Modular Architecture**: Built with a clean separation of concerns, dividing file-system logic, UI rendering, keyboard inputs, and core application state.

## 📋 Prerequisites

Before you begin, ensure you have the following:

- **Operating System**: **macOS** is strictly required. This app uses `afplay`, a native audio player built into macOS.
- **Environment**: [Node.js](https://nodejs.org/) installed on your machine.

## 🚀 Setup & Installation

1. Clone this repository or download the source code to your machine.
2. Open your terminal and navigate to the project directory.
3. Create a folder named `songs` in the root directory:
   ```bash
   mkdir songs
Place your .mp3 files inside the songs folder.

## 🎮 Usage
Run the application using Node:

```Bash
node index.js
## ⌨️ Commands
Use your keyboard to navigate the application:

- Up Arrow (↑): Move selection up the list

- Down Arrow (↓): Move selection down the list

- Enter / Return: Play the highlighted song

- Spacebar: Pause / Resume the currently playing song

- Esc / Ctrl + C: Stop the music and safely quit

## 🗂️ Project Structure
```bash
terminal-player/
├── songs/              # Directory for your .mp3 files
├── index.js            # Main entry point wiring the modules together
├── controller.js       # Core application state and logic handler
├── songLoader.js       # File system logic for reading audio files
├── ui.js               # Visual interface and ANSI text rendering
├── keyHandler.js       # Custom module for parsing raw keyboard byte streams
├── package.json        # Node.js project metadata
└── README.md           # Project documentation