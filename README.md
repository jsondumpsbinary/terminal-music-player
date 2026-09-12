content = """# Terminal Music Player

A simple, interactive command-line application built with Node.js that lists and plays `.mp3` files from a local directory.

## Features

* **Auto-Discovery:** Automatically scans a local `songs` folder for `.mp3` files.
* **Interactive Menu:** Displays a numbered list of available songs.
* **Seamless Switching:** Automatically stops the currently playing song when you select a new one.
* **Graceful Exit:** Type `exit` to stop the music and close the application safely.

## Prerequisites

* **Node.js**: Must be installed on your system.
* **macOS**: This script currently uses the `afplay` command, which is a built-in audio player exclusive to macOS. *(Note: To run on Linux, change `afplay` to `aplay` or `mpg123`. For Windows, you would need a third-party package or different command).*

## Setup & Installation

1. Clone or download this project to your local machine.
2. Create a folder named `songs` in the root directory of the project (in the same folder as `index.js`).
3. Place your `.mp3` audio files inside the `songs` folder.

## How to Run

1. Open your terminal and navigate to the root of this project.
2. Run the application using Node:

   ```bash
   node index.js