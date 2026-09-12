const readline = require('readline');

function setupKeyControls(onUp, onDown, onEnter, onQuit, onSpace) {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', (str, key) => {
    // Quit when the user presses Ctrl + C
    if (key.ctrl && key.name === 'c') {
      onQuit();
    }
    
    // Quit when the user presses the Escape key
    if (key.name === 'escape') {
      onQuit();
    }
    
    if (key.name === 'up') {
      onUp();
    }
    
    if (key.name === 'down') {
      onDown();
    }
    
    if (key.name === 'return' || key.name === 'enter') {
      onEnter();
    }

    if (key.name === 'space') {
      onSpace();
    }
  });
}

module.exports = setupKeyControls;