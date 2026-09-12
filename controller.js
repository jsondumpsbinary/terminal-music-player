const { spawn } = require('child_process');
const path = require('path');
const renderMenu = require('./ui');

// 1. We moved all our State variables here!
let currentAudioProcess = null;
let selectedIndex = 0;
let currentlyPlaying = "Nothing";
let isPaused = false; 

// We leave these blank initially. index.js will fill them in when the app starts.
let songs = [];
let songsFolder = '';

// 2. An initialization function to start the app logic
function init(loadedSongs, folderPath) {
  songs = loadedSongs;
  songsFolder = folderPath;
  updateScreen();
}

function updateScreen() {
  renderMenu(songs, selectedIndex, currentlyPlaying, isPaused);
}

function playSong() {
  if (currentAudioProcess) {
    currentAudioProcess.kill();
  }

  const songName = songs[selectedIndex];
  const songPath = path.join(songsFolder, songName);
  
  currentlyPlaying = songName;
  isPaused = false; 
  
  currentAudioProcess = spawn('afplay', [songPath]);
  
  updateScreen();
}

// 3. All our handlers are safely kept here, modifying the local variables
function handleUp() {
  if (selectedIndex > 0) {
    selectedIndex--;
    updateScreen();
  }
}

function handleDown() {
  if (selectedIndex < songs.length - 1) {
    selectedIndex++;
    updateScreen();
  }
}

function handleEnter() {
  playSong();
}

function handleSpace() {
  if (!currentAudioProcess) return;

  if (isPaused) {
    currentAudioProcess.kill('SIGCONT');
    isPaused = false;
  } else {
    currentAudioProcess.kill('SIGSTOP');
    isPaused = true;
  }
  
  updateScreen();
}

function handleQuit() {
  if (currentAudioProcess) {
    currentAudioProcess.kill();
  }
  console.clear();
  process.exit(0);
}

// 4. We export everything index.js needs in a neat object
module.exports = {
  init,
  handleUp,
  handleDown,
  handleEnter,
  handleQuit,
  handleSpace
};