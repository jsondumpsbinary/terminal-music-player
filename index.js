const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawn } = require('child_process');

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
  // If this is not the first time drawing, move the cursor UP to overwrite the old menu
  if (!isFirstRender) {
    const linesToMoveUp = songs.length + 3;
    process.stdout.write(`\x1B[${linesToMoveUp}A`);
  }
  isFirstRender = false;

  console.log('--- Terminal Music Player ---');
  
  songs.forEach((song, index) => {
    if (index === selectedIndex) {
      console.log(`  > ${song}`); // The arrow points to our current selection
    } else {
      console.log(`    ${song}`);
    }
  });
  
  console.log('-----------------------------');
  // We add extra spaces at the end to ensure we overwrite any long song names from the previous draw
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
  
  // Redraw the menu immediately so the "Now playing" text updates
  renderMenu();
}

// Set up Node to translate raw keystrokes into readable key events
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  // If the user presses Ctrl+C, exit safely
  if (key.ctrl && key.name === 'c') {
    if (currentAudioProcess) {
      currentAudioProcess.kill();
    }
    // We clear the screen before exiting so the terminal looks clean
    console.clear();
    process.exit(0);
  }
  
  if (key.name === 'up') {
    if (selectedIndex > 0) {
      selectedIndex--;
      renderMenu();
    }
  }
  
  if (key.name === 'down') {
    if (selectedIndex < songs.length - 1) {
      selectedIndex++;
      renderMenu();
    }
  }
  
  if (key.name === 'return' || key.name === 'enter') {
    playSong();
  }
});

// Kick off the application by drawing the menu for the first time
renderMenu();