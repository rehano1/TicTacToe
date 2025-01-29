// Game module which containes all the code 
// all variables and functions are private
let gameModule = (function () {
    'use strict';
    // all module code here
    // All required variables and constants for the use
    let currentPlayer = "X";
    const gameStatusMessage = document.querySelector(".game-status");
    const winningMessage = () => `${currentPlayer} has won`;
    const tieMessage = `Its a tie`;
    let gameActive = true;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    
    
    ];
    // function for handling click and executing the code
    function handleClick (e) {
        if (!gameActive) return;

        const clickedSquare = e.target;
        const clickedSquareNumber = parseInt(clickedSquare.getAttribute('data-key'));

        if(gameBoard[clickedSquareNumber] !== "") {
            return;
        }
        handlePlay(clickedSquare, clickedSquareNumber);
        handleResult();
    }


    // function to changeBoard to current player
    function handlePlay (clickedElement, squareIndex) {
        gameBoard[squareIndex] = currentPlayer;
        clickedElement.innerText = currentPlayer;
    }


    // function to check if the game is finished or not
    function handleResult () {
        let gameWon = false;
        for (let i = 0; i < winningCombos.length; i++) {
            let a = gameBoard[winningCombos[i][0]];
            let b = gameBoard[winningCombos[i][1]];
            let c = gameBoard[winningCombos[i][2]];

            if (!a || !b || !c) {
                continue;
            }
            if (a === b && b === c) {
                gameWon = true;
                break;
            } 
        }
            if (gameWon) {
                gameStatusMessage.innerText = winningMessage();
                gameActive = false;
                return;
            }
            let tieGame = !gameBoard.includes("");
            if (tieGame) {
                gameStatusMessage.innerText = tieMessage;
                gameActive = false;
                return;
            }

            changePlayer();

        }
            // Next player's turn 
    function changePlayer () {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
    // changing everything to initial values
    function restartGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        document.querySelectorAll('.cell').forEach(cell => cell.innerText = "");

        gameActive = true;
        currentPlayer = 'X';
        gameStatusMessage.innerText = currentPlayerTurn();



    }
    // for listing public functions and variables
    return { handleClick, restartGame };
    }
)(); 

// 
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', gameModule.handleClick));
document.querySelector('#restart-game').addEventListener('click' , gameModule.restartGame);


