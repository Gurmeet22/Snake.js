const blessed = require('blessed');
const speed = 50;
const arrow = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
};
const size = 4;
const scolor = 'white';
const apple = 'red';
let snake = [];
let curdir = 'right';
let dot = {};
let score = 0;
var timer = null;
for (let i = size+1; i >= 1; i--) {
    snake[size - i] = { x: i, y: 5 };
}


const screen = blessed.screen({
    smartCSR: true
});


screen.title = 'Snake-Game';
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
      parent: gamebox,
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

const drawSnake = () => {
    
    snake.forEach((pixel) => {
      draw(pixel, scolor);
    })
};

const drawDot = () => {
    draw(dot, apple);
};


const updateScore = (score) => {
    scorebox.setLine(0, `{center}{bold}Score:{/bold} ${score}{/center}`);
}

const getRanPixelCoord = (min, max) => Math.round(Math.random() * (max - min) + min);


const changeDirection = (key) => {
    if ((key.name === 'up' || key.name === 'w') && curdir !== 'down') {
      curdir = 'up'
    }
    if ((key.name === 'down' || key.name === 's') && curdir !== 'up') {
      curdir = 'down'
    }
    if ((key.name === 'left' || key.name === 'a') && curdir !== 'right') {
      curdir = 'left'
    }
    if ((key.name === 'right' || key.name === 'd') && curdir !== 'left') {
      curdir = 'right'
    }
}

// box.focus();
// draw({x:5,y:5}, 'white');

const generateDot = () => {
    // Generate a dot at a random x/y coordinate
    dot.x = getRanPixelCoord(0, gamebox.width - 1);
    dot.y = getRanPixelCoord(1, gamebox.height - 1);

    // If the pixel is on a snake, regenerate the dot
    snake.forEach((pixel) => {
      if (pixel.x === dot.x && pixel.y === dot.y) {
        generateDot();
      }
    })
};

const moveSnake = () => {
    
    const head = {
        x: snake[0].x + arrow[curdir].x,
        y: snake[0].y + arrow[curdir].y,
    };

    snake.unshift(head);
    
    if (snake[0].x === dot.x && snake[0].y === dot.y) {
      score++;
      updateScore(score);
      generateDot();
    } else {
      snake.pop();
    }
};


const isGameOver = () => {
    
    const collide = snake.find((segment) => segment.x === snake[0].x && segment.y === snake[0].y);

    return (
      collide || snake[0].x >= gamebox.width - 1 || snake[0].x <= -1 || snake[0].y >= gamebox.height - 1 || snake[0].y <= -1
    );
};
gamebox.key(['up','down','left','right'],  function(ch, key) {
    changeDirection(key);
    screen.render();
});
generateDot();
const tick = () => {
    

    
    drawDot();
    moveSnake();
    drawSnake();
    gamebox.focus();
    screen.render();
      if (isGameOver()) {
          screen.append(overbox);
        }
}

if (!timer) {
    timer = setInterval(tick, speed);
}







screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

 