const { spawn } = require('child_process');
const path = require('path');
const setupKeyControls = require('./keyHandler');
const loadSongs = require('./songLoader');

// We replaced 10 lines of file-system code with this single line!
const songs = loadSongs();
const songsFolder = path.join(__dirname, 'songs');

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
      console.log(`  \x1b[36m> ${song}\x1b[0m`);
    } else {
      console.log(`    ${song}`);
    }
  });
  
  console.log('-----------------------------');
  
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
  isPaused = false; 
  
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
  if (!currentAudioProcess) {
    return;
  }

  if (isPaused) {
    currentAudioProcess.kill('SIGCONT');
    isPaused = false;
  } else {
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

setupKeyControls(handleUp, handleDown, handleEnter, handleQuit, handleSpace);

renderMenu();