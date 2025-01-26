
const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("resetBtn");
const computerScore = document.getElementById("compScore");
const userScore = document.getElementById("userScore");

let winArr = ["","","","","","","","",""];
let gameActive = true;
let computerScoreCount = 0;
let userScoreCount = 0;
let mark;

function displayWinner(winner) {
    let message;
    if(winner === 'X'){
         message = 'Computer Wins!';
        ++computerScore.textContent;
    }else{
         message = 'You Win!';
        ++userScore.textContent;
    }
    setTimeout(() => {
        alert(message);
        resetBoard();
    }, 100);
}

function drawBoard () {
    boxes.forEach((box, index) => {
        box.innerText = winArr[index];
    });
}
drawBoard();

boxes.forEach((element, index) => {
    element.addEventListener("click", (e) => {
            generateMoves(e, index);
    })
})

resetBtn.addEventListener("click", (e) => {
    resetBoard();
    drawBoard();
})

function generateComputerMove () {
    if(!gameActive) return;
    
    if(checkForWin()){
        displayWinner('0');
        return;
    }
    if(!checkForDraw()){
        alert("It's a Draw!");
        resetBoard();
        return;
    }
    mark = 'X';
    let number = 1;
    do {
        number = Math.floor(Math.random() * 9);
    }while(boxes[number].textContent != "")
    
    winArr[number] = mark;
    boxes[number].innerText = winArr[number];
    
    if(checkForWin()){
        displayWinner('X');
        return;
    }
}

function generateMoves(element, index) {
    if(!gameActive || winArr[index] !== '') return;
    
    mark = '0';
    winArr[index] = mark;
    element.target.innerText = winArr[index];
    
    if(checkForWin()){
        displayWinner('0');
        return;
    }
    
    if(!checkForDraw()){
        alert("It's a Draw!");
        resetBoard();
        return;
    }
    
    generateComputerMove();
}

function checkForDraw () {
    let gameState = 0;
    winArr.forEach(value => {
        if(value == '') gameState++;
    })

    return gameState
}

function checkForWin () {


    for(let i = 0; i < 3; i++) {
        if(winArr[i] !== '' && winArr[i] === winArr[i+3] && winArr[i+3] === winArr[i+6]){  //vertical check
            return 1;
        } 
    }
    for(let i = 0 ; i < 9; i+=3) {
        if(winArr[i] !== '' && winArr[i] === winArr[i+1] && winArr[i+1] === winArr[i+2]) {    //horizontal check
            return 1;
        }
    }
    if(winArr[0] !== '' && winArr[0] === winArr[4] && winArr[4] === winArr[8]){   //diagonal check
        return 1;   
    }
    if(winArr[2] !== '' && winArr[2] === winArr[4] && winArr[4] === winArr[6]) {      //diagonal check
        return 1;
    }
    return 0;
}

function resetBoard () {
    gameActive = true;
    for(let i = 0; i < 9; i++){
        winArr[i] = "";
    }
    boxes.forEach(box => {
        box.innerText = "";
    });
}





















