// Get canvas element
var canvas = document.getElementById("myCanvas");
// Store 2D rendering context
var ctx = canvas.getContext("2d");

// Draw a red square
// ctx.beginPath();
// ctx.rect(20,40,50,50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// var rectangle = {x:10,y:20,width:20,height:40};
// rectangle.width = 60;
// ctx.fillRect(rectangle.x,rectangle.y,rectangle.width,rectangle.height);

// starting variables
var x = canvas.width / 2;
var y = canvas.height - 30;

// adding small value to x and y after every frame has been
// drawn to makeit appear that the ball is moving
var dx = 2;
var dy = -2;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// two-dimensional array (c)=brickColumns (r)=brickRows
// setting x & y coordinates of each brick
// bricks objects will be used for collision purposes later
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}

const drawBall = () => {
  // Draw ball
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  // Draw paddle
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const drawBricks = () => {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            // sets x-coordinate for individual bricks
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            // sets y-coordinates for individual bricks
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks();
  drawBall();
  drawPaddle();
  x += dx;
  y += dy;
  // Bounce off left and right (shouldReverseX)
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  // Bounce off top and end game if hits bottom (shouldReverseY)
  // Bounce off paddle as well
  if(y + dy < ballRadius) {
      dy = -dy;
  } else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
      }
      else {
          alert("GAME OVER");
          document.location.reload();
      }
  }

  // if keys are pressed - position paddle
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

setInterval(draw, 100);
