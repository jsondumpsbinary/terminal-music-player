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

console.log('--- Terminal Music Player ---');
songs.forEach((song, index) => {
  console.log(`${index + 1}. ${song}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentAudioProcess = null;

function playSong(songIndex) {
  if (currentAudioProcess) {
    currentAudioProcess.kill();
  }

  const songName = songs[songIndex];
  const songPath = path.join(songsFolder, songName);

  console.log(`\nNow playing: ${songName}`);
  
  currentAudioProcess = spawn('afplay', [songPath]);

  askForSong();
}

