// const readline = require('readline');

// function setupKeyControls(onUp, onDown, onEnter, onQuit, onSpace) {
//   readline.emitKeypressEvents(process.stdin);
//   process.stdin.setRawMode(true);

//   process.stdin.on('keypress', (str, key) => {
//     // Quit when the user presses Ctrl + C
//     if (key.ctrl && key.name === 'c') {
//       onQuit();
//     }
    
//     // Quit when the user presses the Escape key
//     if (key.name === 'escape') {
//       onQuit();
//     }
    
//     if (key.name === 'up') {
//       onUp();
//     }
    
//     if (key.name === 'down') {
//       onDown();
//     }
    
//     if (key.name === 'return' || key.name === 'enter') {
//       onEnter();
//     }

//     if (key.name === 'space') {
//       onSpace();
//     }
//   });
// }

// module.exports = setupKeyControls;



function setupKeyControls(onUp, onDown, onEnter, onQuit, onSpace) {
  // Translate raw keyboard bytes into a readable string (utf-8)
  process.stdin.setEncoding('utf-8');
  process.stdin.setRawMode(true);

  process.stdin.on('data', (input) => {
    // Ctrl + C sends a special "End of Text" character (\u0003)
    if (input === '\u0003') {
      onQuit();
    }
    
    // The Escape key sends the literal escape character (\u001b)
    if (input === '\u001b') {
      onQuit();
    }
    
    // The Spacebar just sends a normal space string
    if (input === ' ') {
      onSpace();
    }
    
    // The Enter key sends a Return (\r) or Newline (\n) character
    if (input === '\r' || input === '\n') {
      onEnter();
    }

    // Arrow keys always send 3 characters: Escape (\u001b), a bracket ( [ ), and a letter
    if (input.length >= 3 && input[0] === '\u001b' && input[1] === '[') {
      
      // Up Arrow
      if (input[2] === 'A') {
        onUp();
      }
      
      // Down Arrow
      if (input[2] === 'B') {
        onDown();
      }
    }
  });
}

module.exports = setupKeyControls;