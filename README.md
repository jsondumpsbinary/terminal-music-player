# 🎵 Terminal Music Player

A sleek, interactive command-line application that plays `.mp3` files directly from your terminal. Built entirely with Node.js, this project demonstrates how to handle raw terminal input, manage background processes, and build a text-based user interface.

## ✨ Features

- **Interactive UI**: Navigate through your music library using arrow keys.
- **In-Place Rendering**: The menu redraws itself cleanly without flooding the terminal with scrolling text.
- **Live Updates**: Displays the currently playing song in real-time.
- **Process Management**: Safely stops background audio processes when switching songs or closing the app.
- **OS-Level Pause/Resume**: Freezes and unfreezes the audio process using `SIGSTOP` and `SIGCONT` signals.

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

🎮 Usage
Run the application using Node:

## 🎮 Usage

Run the application using Node:

```bash
node index.js
```
⌨️ Commands
- Use your keyboard to navigate the application:

- Up Arrow (↑): Move selection up the list

- Down Arrow (↓): Move selection down the list

- Enter / Return: Play the highlighted song

- Spacebar: Pause / Resume the currently playing song

- Ctrl + C: Stop the music and quit

## 🗂️ Project Structure

terminal-player/
├── songs/              # Directory for your .mp3 files
├── index.js            # Main application logic and UI rendering
├── keyHandler.js       # Custom module for intercepting raw keyboard inputs
├── package.json        # Node.js project metadata
└── README.md           # Project documentation