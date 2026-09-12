const path = require('path');
const loadSongs = require('./songLoader');
const setupKeyControls = require('./keyHandler');
const controller = require('./controller');

// 1. Get the data
const songs = loadSongs();
const songsFolder = path.join(__dirname, 'songs');

// 2. Hand the data over to the controller
controller.init(songs, songsFolder);

// 3. Connect the keyboard straight to the controller's functions
setupKeyControls(
  controller.handleUp,
  controller.handleDown,
  controller.handleEnter,
  controller.handleQuit,
  controller.handleSpace
);