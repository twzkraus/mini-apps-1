// current player
const players = ['X', 'O'];
let currentPlayerIdx = 0;
// board status
const board = ['', '', '', '', '', '', '', '', ''];
const boardDivs = new Array(9);
// game-over
let gameOver = false;

const boardElement = document.getElementById("board");
for (let i = 0; i < 9; i++) {
  boardDivs[i] = document.getElementById(`box${i}`);
}

// high level:
  // while !gameOver
  // render board
  // alternate turns for X and O
    // click handlers need to be in place
    // check whether gameOver
/**************
HELPER FUNCTIONS
**************/
// click handler
boardElement.addEventListener('click', (event) => {
  // note: use "path" on event to figure out which element was clicked
  // debugger;
  let boxNum = event.target.id[event.target.id.length - 1];
  handleBoxClicked(boxNum);
});

// gameplay handler of box clicked
handleBoxClicked = (boxNumber) => {
  if (!board[boxNumber]) {
    board[boxNumber] = players[currentPlayerIdx];
    render();
    checkIfGameOver();
    currentPlayerIdx = (currentPlayerIdx + 1) % 2;
  }
  // possible improvement: add an else and message of 'please select a new box'
}
// render
render = () => {
  // loop over board array, make it match the html
  board.forEach((boxVal, index) => {
    if (boxVal) {
      // render on the dom
      boardDivs[index].innerHTML = boxVal;
    }
  });
};
// checkIfGameOver
checkIfGameOver = () => {
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
    if (board[i] && board[i] === board[j] && board[j] === board[k]) {
      console.log('game over!');
      gameOver = true;
    }
  });
};

/**************
MAIN GAMEPLAY
**************/




