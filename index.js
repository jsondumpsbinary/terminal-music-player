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

function askForSong() {
  rl.question('\nEnter a song number to play (or type "exit" to quit): ', (answer) => {
    if (answer.trim().toLowerCase() === 'exit') {
      if (currentAudioProcess) {
        currentAudioProcess.kill();
      }
      process.exit(0);
    }

    const songNumber = parseInt(answer, 10);
    const songIndex = songNumber - 1;

    if (isNaN(songNumber) || songIndex < 0 || songIndex >= songs.length) {
      console.log('Invalid number. Try again.');
      askForSong();
    } else {
      playSong(songIndex);
    }
  });
}

askForSong();

