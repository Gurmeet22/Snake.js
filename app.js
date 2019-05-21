const blessed = require('blessed');
const speed = 50
const arrow = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
}
const size = 4
const scolor = 'white'
const apple = 'red'
const screen = blessed.screen({
    smartCSR: true
  });
screen.title = 'Snake.js';
var gamebox = blessed.box({
    parent : screen,
    top: 1,
    left: 0,
    width: '100%',
    height: '100%-1',
    content: '',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'black',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  });
 const scorebox = blessed.box({
    parent : screen,
    top: 0,
    left: 'left',
    width: '100%',
    height: 1,
    content: '{center}{bold}Score:{/bold} 0{/center}',
    tags: true,
    style: {
      fg: 'red',
      bg: 'yellow',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  });
  const overbox = blessed.box({
    parent : screen,
    top: 'center',
    left: 'center',
    width: '30%',
    height: '30%',
    content: '{center}{bold}Game Over!!!{/bold}{/center}',
    tags: true,
    border: {
        type: 'line'
      },
    style: {
      fg: 'red',
      bg: 'yellow',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  });

screen.append(gamebox);
screen.append(scorebox);
// screen.append(overbox);

const draw = (coord, color) => {
    screen.append(blessed.box({
      parent: this.gameContainer,
      top: coord.y,
      left: coord.x,
      width: 1,
      height: 1,
      style: {
        fg: color,
        bg: color,
      },
    }));
}
const updateScore = (score) => {
    scorebox.setLine(0, `{bold}Score:{/bold} ${score}`);
}


screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
// box.focus();
draw({x:5,y:5}, 'white');
screen.render();
