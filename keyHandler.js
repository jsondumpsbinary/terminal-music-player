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
  console.log(`Now playing: ${currentlyPlaying}                                        `);
}

function playSong() {
  if (currentAudioProcess) {
    currentAudioProcess.kill();
  }

  const songName = songs[selectedIndex];
  const songPath = path.join(songsFolder, songName);
  
  currentlyPlaying = songName;
  currentAudioProcess = spawn('afplay', [songPath]);
  
  renderMenu();
}

// These are the specific instructions we will pass to our key handler
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

function handleQuit() {
  if (currentAudioProcess) {
    currentAudioProcess.kill();
  }
  console.clear();
  process.exit(0);
}

// We call the function we imported, and hand it our four logic functions
setupKeyControls(handleUp, handleDown, handleEnter, handleQuit);

renderMenu();