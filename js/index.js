// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const moveSound = new Audio('music/move.mp3');
let speed = 5; //change this value to change the speed of the snake
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        inputDir =  {x: 0, y: 0}; 
        messageBox.innerHTML = "Better Luck Next Time!!!";
        snakeArr = [{x: 13, y: 15}];
        score = 0; 
    }
    
    if(score === 15){
        inputDir =  {x: 0, y: 0};
        messageBox.innerHTML = "Congratulations!!! You Win!!!";
        snakeArr = [{x: 13, y: 15}];
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else if(index % 2 === 0){
            snakeElement.classList.add('snake1');
        }
        else if(index % 2 === 1){
            snakeElement.classList.add('snake2');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    lastDir = {x: 0, y: -1}
    messageBox.innerHTML = "";
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            if (lastDir.y === 1){
                break;
            }
            else{
                moveSound.play();
                inputDir.x = 0;
                inputDir.y = -1;
                lastDir = inputDir;
                break;
            }

        case "ArrowDown":
            console.log("ArrowDown");
            if (lastDir.y === -1){
                break;
            }
            else{
                moveSound.play();
                inputDir.x = 0;
                inputDir.y = 1;
                lastDir = inputDir;
                break;
            }

        case "ArrowLeft":
            console.log("ArrowLeft");
            if (lastDir.x === 1){
                break;
            }
            else{
                moveSound.play();
                inputDir.x = -1;
                inputDir.y = 0;
                lastDir = inputDir;
                break;
            }

        case "ArrowRight":
            console.log("ArrowRight");
            if (lastDir.x === -1){
                break;
            }
            else{
                moveSound.play();
                inputDir.x = 1;
                inputDir.y = 0;
                lastDir = inputDir;
                break;
            }
        default:
            break;
    }

});