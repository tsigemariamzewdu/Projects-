const canvas=document.querySelector(".canvas");
const ctx=canvas.getContext('3d'); // here what we are saying is that we want to use a 2d drawing thingy
console.log(ctx);


// to be able to control the movt of our snake we are going to create a grid like system on our canvas 
//the snake will follow the square grid on our canvas 


//lets divide our canvas into 10 by 10 small squares
const scale=20;
const rows= canvas.height/scale; //25
const columns=canvas.width/scale;//25


let snake=[];

snake[0]={
    // we want the snake to start at random place whenever we start the game so we have to make the starting point of the snake random 
    // and this is how we do it 
    x:(Math.floor(Math.random()*columns))*scale,
    y:(Math.floor(Math.random()*columns))*scale
}
let food={
    x:(Math.floor(Math.random()*columns))*scale,
    y:(Math.floor(Math.random()*columns))*scale
}
let d='right'; // this is the direction that we want our snake to move
 document.onkeydown=direction; // we are putting the event listener on the whole since we have no specific button or something
// lets write now the direction changer function
function direction(event){
    let key=event.keyCode;
    if(key==37 && d!="right"){
        d="left"
    }
    else if(key==38 && d!="down"){
        d="up"
    }
    else if(key==39 && d!="left"){
        d="right"
    }
    else if(key==40 && d!="up"){
        d="down"
    }

}


let playGame=setInterval(draw,100); // this is a function that i am not sure what it is doing actually but i will figure it out when 
function draw(){
    // before we start drawing we have to clear every single thing drawn on our canvas

    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<snake.length;i++){
ctx.fillStyle="#fff";
ctx.strokeStyle='pink';
ctx.fillRect(snake[i].x,snake[i].y,scale,scale);
ctx.strokeRect(snake[i].x,snake[i].y,scale,scale);
    }

ctx.fillStyle="beige";
ctx.strokeStyle='green';
ctx.fillRect(food.x,food.y,scale,scale);
ctx.strokeRect(food.x,food.y,scale,scale)
//old head position
let snakeX=snake[0].x;
let snakeY=snake[0].y;

//which direction
if(d=="left") snakeX-= scale;
if(d=="up") snakeY-= scale;
if(d=="right")snakeX+= scale;
if(d=="down")snakeY+= scale;

//new object



// now we have to control the snake we are drawing how?
if(snakeX >= canvas.width){
    snakeX=0; // go back to zero gn what i am thinking right now is is this going to disrupt the thing that we made before 
    
}
if(snakeY >= canvas.height){
    snakeY=0; // go back to zero gn what i am thinking right now is is this going to disrupt the thing that we made before 
    
}
if(snakeX <0){
    snakeX=canvas.width-scale; // go back to zero gn what i am thinking right now is is this going to disrupt the thing that we made before 
    
}
if(snakeY <0){
    snakeY=canvas.height-scale; // go back to zero gn what i am thinking right now is is this going to disrupt the thing that we made before 
    
}
if(snakeX==food.x && snakeY==food.y){
    food={
        x:(Math.floor(Math.random()*columns))*scale,
        y:(Math.floor(Math.random()*columns))*scale

    }

}
else{
    snake.pop();

}
let newhead={
    x:snakeX,
    y:snakeY
}


// we have to add a condition that says when the snake eats it self
if(eatSelf(newhead,snake)){
    clearInterval(playGame);
    let gameover = {
        x: 0,
        y: 0
    };
    
    // Draw the game over box
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.fillRect(gameover.x, gameover.y, 500, 500);
    ctx.strokeRect(gameover.x, gameover.y, 500, 500);
    
    // Set text style
    ctx.fillStyle = "black"; // Text color
    ctx.font = "50px Arial"; // Font size and font family
    ctx.textAlign = "center"; // Align the text to the center
    ctx.fillText("Game Over", gameover.x + 100, gameover.y + 120); // Position the text inside the box
    
}
    snake.unshift(newhead);
}
function eatSelf(head,array){
    for (let i=0;i<array.length;i++){
        if(head.x==array[i].x && head.y==array[i].y){
            return true;
        }
    }
    return false;
}













