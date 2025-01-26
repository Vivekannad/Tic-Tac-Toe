
const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("resetBtn");
const restartBtn = document.getElementById("restart");
const computerScore = document.getElementById("compScore");
const userScore = document.getElementById("userScore");

let winArr = Array(9).fill(""); // filled array with the given value till length is 9.

let gameActive = true;
let computerScoreCount = 0;
let userScoreCount = 0;
let mark;

function displayWinner(winner) {
    let message;
    if(winner === 'X'){
         message = 'Computer Wins!';
        computerScore.textContent = ++computerScoreCount ;
    }else{
         message = 'You Win!';
        userScore.textContent = ++userScoreCount;
    }
    setTimeout(() => {
        alert(message);
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

restartBtn.addEventListener("click", () => {
    computerScoreCount = userScoreCount = 0;
    computerScore.innerText = userScore.innerText = 0; 
    resetBoard();
})



function generateComputerMove () {
    if(!gameActive) return;
    
    if(checkForWin()){
        displayWinner('0');
        return;
    }
    if(!checkForDraw()){
        alert("It's a Draw!");
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
        return;
    }
    
    generateComputerMove();
}

function checkForDraw () {
    //returns true if array contains empty string and false if it doesn't
    return winArr.includes(""); 
}

function checkForWin () {
    let winPatterns = [
        [0,1,2] , [3,4,5] , [6,7,8] , //horizontal 
        [0,3,6] , [1,4,7] , [2,5,8] , // vertical 
        [0,4,8] , [2,4,6]   //diagonal
    ];

    // It will return true if comes true even one time.
    return winPatterns.some(pattern =>     
        winArr[pattern[0]] !== '' &&    // checking if it is empty
           winArr[pattern[0]] === winArr[pattern[1]] &&
            winArr[pattern[1]] == winArr[pattern[2]]
)


}

function resetBoard () {
    gameActive = true;
    winArr.fill("");    //fills the array with empty strings
    boxes.forEach(box => {
        box.innerText = "";
    });
}
