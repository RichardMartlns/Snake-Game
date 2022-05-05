import { equalPositions  } from "./auxiliar.js";
import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;

let newSegments = 0;

const snakeBody = [
  { x: 11, y:11 },
]

export function update() {
  addSegments();

  const inputDirection = getInputDirection();

  // move snake segments
  for (let i = snakeBody.length -2; i >= 0; i-- ){
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  // make head move
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
};

export function draw(gameboard) {
  snakeBody.forEach(segment => {
    // create element
    const snakeElement = document.createElement('div')

    // config css
    snakeElement.classList.add('snake')

    // position
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;

    // append on DOM
    gameboard.appendChild(snakeElement)
  });
};

// collision
export function collision(position) {
  return snakeBody.some(segment => { 
     return equalPositions(position, segment);
  })
}

// expand snake - expandindo a cobra
export function expandSnake(amount) {
  newSegments = amount;
}

function addSegments() {
  if (newSegments > 0) {
    snakeBody.push({
      ...snakeBody[snakeBody.length -1]
    });

    newSegments -= 1;
  }
}

// auxiliar functions

export function getSnakeHead() {
  return snakeBody[0];
}

export function SelfCollision() {
    const snakeHead = snakeBody[0];
    
    return snakeBody.some((segment, index) => {
    if (index === 0 ) return false;
    
    return equalPositions(snakeHead, segment);
  });
}