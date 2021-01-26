
// Basics of canvas
// ============================================================
// Getting the canvas dom element
const canvas = document.getElementById('canvas');


// The actual drawing is done using the canvas rendering context 2d interface
const ctx = canvas.getContext('2d');

// canvas.width and canvas.height give control over the height and width of the canvas

//creating a rectangle on the canvas
// Like in d3, the x axis goes fom left to right and the y axis from up to down




// UNCOMMENT REQUIRED SECTION TO VIEW CONTENT ON SCREEN



// Rectangle methods ==================================================


// ctx.fillStyle = 'red';
// ctx.fillRect(20,20,150,100); // x, y, width , height

// // Restting context style
// ctx.fillStyle = 'blue';
// ctx.fillRect(200,20,150,100)

// // strokeRect()
// ctx.lineWidth = 5;
// ctx.strokeStyle = 'green';
// ctx.strokeRect(100, 200, 150, 100);

// // clearRect(); 
// // - this is used in animations when the screen has to be cleared and new content to be drawn

// ctx.clearRect(25,25, 140, 90); // This draws a clear rectangle using the given input dimensions


// Text methods ======================================================
// ctx.font = '30px Arial';
// ctx.fillStyle = 'purple';
// ctx.fillText('Hello world!', 400, 50);

// //Stroke text
// ctx.lineWidth = 1;
// ctx.strokeStyle = 'orange';
// ctx.strokeText("Hello world", 400, 100);


// ===================================================================


// Paths =============================================================

// Triangle =======================
// ctx.beginPath();
// // This is like machine G code, where you inform coordinates and the motion steps
// ctx.moveTo(50, 50); 
// ctx.lineTo(150,50);

// ctx.lineTo(100, 200);
// // ctx.lineTo(50,50); or
// ctx.closePath();


// // ctx.stroke(); or
// ctx.fillStyle = 'coral';
// ctx.fill();

// // Drawing another triangle
// ctx.beginPath(); // This begins a new path
// ctx.moveTo(200, 50);
// ctx.lineTo(150, 200);
// ctx.lineTo(250, 200);
// ctx.closePath();

// ctx.stroke(); // This line is important to tell the canvas to draw the path


// // Rectangle ========================
// ctx.beginPath();
// ctx.rect(300,50,150,100);
// ctx.fillStyle = 'teal';
// ctx.fill(); // this line is important to tell the canvas to fill the path


// Arcs / circles ===================

// .arc() takes in a x and a y value, the position of the x and y are the middle point value, 

// Then it takes a radius, start andgle, end angle, clockwise or anti clockwise

// const centerX = canvas.width / 2;
// const centerY = canvas.height / 2;

// // draw the head
// ctx.beginPath();
// ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);

// // move to  the mouth
// ctx.moveTo(centerX + 100 ,centerY );
// //draw the mouth
// ctx.arc(centerX, centerY, 100, 0,  Math.PI, false);

// // move to left eye
// ctx.moveTo(centerX - 60, centerY - 80);

// // draw left eye
// ctx.arc(centerX - 80, centerY - 80, 20, 0, Math.PI * 2);

// // move to right eye
// ctx.moveTo(centerX + 100, centerY - 80);

// // draw the right eye
// ctx.arc(centerX + 80, centerY - 80 , 20, 0, Math.PI * 2);
// ctx.stroke();


// ==========================================================

// Animation1 =============

// creating an object
// const circle = {
//     x: 200,
//     y: 200,
//     size: 30,
//     dx: 5,
//     dy: 4
// }

// function drawCircle()
// {
//     ctx.beginPath();
//     ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI*2);
//     ctx.fillStyle = 'purple';
//     ctx.fill();
// }

// function update() 
// {
//     // clear all elements from the canvas
//     ctx.clearRect(0,0, canvas.width, canvas.height);

//     // draw the circle
//     drawCircle();

//     // change position of circle
//     circle.x += circle.dx;
//     circle.y += circle.dy;

//     // detect side walls
//     if(circle.x + circle.size > canvas.width || circle.x - circle.size < 0)
//     {
//         console.log("hit side");
//         circle.dx *= -1;
//     } 

//     // detect top and bottom walls
//     if (circle.y + circle.size > canvas.height ||  circle.y - circle.size < 0 )
//     {
//         console.log("hit top or bottom");
//         circle.dy *= -1;
//     }

//     // request next framw
//     requestAnimationFrame(update);
// }
 
// update();


// Animation 2 - character =======================

const image = document.getElementById('source');

const player = {
    w: 50,
    h: 70,
    x: 20,
    y: 200,
    speed: 5,
    dx: 0,
    dy: 0
};

function drawPlayer()
{
    ctx.drawImage(image, player.x, player.y, player.w, player.h);

}

function clear() {
    // clear all elements from the canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function detectWalls() {
    // left wall
    if(player.x < 0 ){
        player.x = 0;
    }

    //right wall
    if(player.x + player.w > canvas.width) {
        player.x = canvas.width - player.w;
    }

    // top wall
    if (player.y < 0){
        player.y = 0;
    }

    if(player.y + player.h > canvas.height) {
        player.y = canvas.height - player.h;
    }
}

function newPos()
{
    player.x += player.dx;
    player.y += player.dy;

    detectWalls();
}

function update()
{

    clear();

    drawPlayer();

    newPos();

    requestAnimationFrame(update);
}

function moveUp () {
    player.dy = -player.speed;
}

function moveDown () {
    player.dy = player.speed;
}

function moveRight () {
    player.dx = player.speed;
}

function moveLeft () {
    player.dx = -player.speed;
}

function keyDown (e)
{
    if(e.key === 'ArrowRight' || e.key === 'Right' ){
        moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left'){
        moveLeft();
    } else if (e.key === 'ArrowUp' || e.key === 'Up'){
        moveUp();
    } else if (e.key === 'ArrowDown' || e.key === 'Down'){
        moveDown();
    }
}

function keyUp (e)
{
    if (e.key === 'ArrowRight' || 
    e.key === 'Right' ||
    e.key === 'ArrowLeft' || 
    e.key === 'Left' ||
    e.key === 'ArrowUp' || 
    e.key === 'Up' ||
    e.key === 'ArrowDown' || 
    e.key === 'Down'
    ) {
        player.dx = 0;
        player.dy = 0;
    }
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);