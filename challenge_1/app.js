// current player
const players = ['X', 'O'];
let gameOver, currentPlayerIdx;
// board status
const boardVals = new Array(9);
const boardDivs = new Array(9);

/**************
DOM ELEMENTS
**************/
const boardElement = document.getElementById("board");
for (let i = 0; i < 9; i++) {
  boardDivs[i] = document.getElementById(`box${i}`);
}
const resetButton = document.getElementById("board-reset");
const messageBox = document.getElementById("message-box");
const turnBox = document.getElementById("turn-box");

/**************
EVENT HANDLERS
**************/

boardElement.addEventListener('click', (event) => {
  let boxNum = event.target.id[event.target.id.length - 1];
  handleBoxClicked(boxNum);
});

resetButton.addEventListener('click', (event) => {
  setupNewBoard();
  render();
});

/**************
HELPER FUNCTIONS
**************/

const setupNewBoard = () => {
  boardVals.forEach((boxVal, index) => {
    boardVals[index] = '';
  });
  gameOver = false;
  messageBox.innerHTML = '';
  currentPlayerIdx = -1;
  switchPlayer();
};

const switchPlayer = () => {
  currentPlayerIdx = (currentPlayerIdx + 1) % 2;
  turnBox.innerHTML = `Now Playing: ${players[currentPlayerIdx]}`;
};

const render = () => {
  boardVals.forEach((boxVal, index) => {
    boardDivs[index].innerHTML = boxVal;
  });
};

const isGameOver = () => {
  let idxsToCheck = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  idxsToCheck.forEach(combo => {
    let i = combo[0];
    let j = combo[1];
    let k = combo[2];
    if (boardVals[i] && boardVals[i] === boardVals[j] && boardVals[j] === boardVals[k]) {
      turnBox.innerHTML = `Game over. ${players[currentPlayerIdx]} is the winner!`
      gameOver = true;
    }
  });

  if (!gameOver && boardVals.join('').length === 9) {
    messageBox.innerHTML = 'Game over. It\'s a tie.';
    gameOver = true;
  }
  return gameOver;
};

/**************
 MAIN GAMEPLAY
**************/

setupNewBoard();

// Game starts when a box is clicked--until then, nothing happens
const handleBoxClicked = (boxNumber) => {
  if (!gameOver) {
    if (!boardVals[boxNumber]) {
      messageBox.innerHTML = '';
      boardVals[boxNumber] = players[currentPlayerIdx];
      render();
      if (!isGameOver()) {
        switchPlayer();
      }
    } else {
      messageBox.innerHTML = 'That space is already taken. Please choose another.';
    }
  } else {
    messageBox.innerHTML = `Click 'Reset Board' to start a new game!`;
  }
}



