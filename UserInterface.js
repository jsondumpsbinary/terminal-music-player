// We moved the first-render tracker here, because only the UI cares about it
let isFirstRender = true;

// The function now requires 4 pieces of data to know how to draw the screen
function renderMenu(songs, selectedIndex, currentlyPlaying, isPaused) {
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
  // Extra spaces at the end ensure we overwrite any long previous song names
  console.log(`Now playing: ${status}                                        `);
}

module.exports = renderMenu;