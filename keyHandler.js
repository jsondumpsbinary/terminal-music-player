const readline = require('readline');

// We added 'onSpace' as our 5th instruction
function setupKeyControls(onUp, onDown, onEnter, onQuit, onSpace) {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
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

    // Node.js calls the spacebar 'space'
    if (key.name === 'space') {
      onSpace();
    }
  });
}

module.exports = setupKeyControls;