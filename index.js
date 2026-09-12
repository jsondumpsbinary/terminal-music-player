const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const setupKeyControls = require('./keyHandler');

const songsFolder = path.join(__dirname, 'songs');
const files = fs.readdirSync(songsFolder);

const songs = files.filter(file => file.endsWith('.mp3'));

if (songs.length === 0) {
  console.log('No mp3 files found in the songs folder.');
  process.exit(0);
}

let currentAudioProcess = null;
let selectedIndex = 0;
let currentlyPlaying = "Nothing";
let isPaused = false; 
let isFirstRender = true;

function renderMenu() {
  if (!isFirstRender) {
    const linesToMoveUp = songs.length + 3;
    process.stdout.write(`\x1B[${linesToMoveUp}A`);
  }
  isFirstRender = false;

  console.log('--- Terminal Music Player ---');
  
  songs.forEach((song, index) => {
    if (index === selectedIndex) {
      console.log(`  > ${song}`);
    } else {
      console.log(`    ${song}`);
    }
  });
  
  console.log('-----------------------------');
  
  // If we are paused, add a [PAUSED] tag to the text
  const status = isPaused ? `[PAUSED] ${currentlyPlaying}` : currentlyPlaying;
  console.log(`Now playing: ${status}                                        `);
}

function playSong() {
  if (currentAudioProcess) {
    currentAudioProcess.kill();
  }

  const songName = songs[selectedIndex];
  const songPath = path.join(songsFolder, songName);
  
  currentlyPlaying = songName;
  isPaused = false; // Always start a new song unpaused
  
  currentAudioProcess = spawn('afplay', [songPath]);
  
  renderMenu();
}

function handleUp() {
  if (selectedIndex > 0) {
    selectedIndex--;
    renderMenu();
  }
}

function handleDown() {
  if (selectedIndex < songs.length - 1) {
    selectedIndex++;
    renderMenu();
  }
}

function handleEnter() {
  playSong();
}

function handleSpace() {
  // If no song has started yet, do nothing
  if (!currentAudioProcess) {
    return;
  }

  if (isPaused) {
    // Unfreeze the process to resume music
    currentAudioProcess.kill('SIGCONT');
    isPaused = false;
  } else {
    // Freeze the process to pause music
    currentAudioProcess.kill('SIGSTOP');
    isPaused = true;
  }
  
  renderMenu();
}

function handleQuit() {
  if (currentAudioProcess) {
    currentAudioProcess.kill();
  }
  console.clear();
  process.exit(0);
}

// Pass handleSpace as the final argument!
setupKeyControls(handleUp, handleDown, handleEnter, handleQuit, handleSpace);

renderMenu();