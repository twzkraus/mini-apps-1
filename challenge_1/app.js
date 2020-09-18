// current player
const players = ['X', 'O'];
let currentPlayerIdx = 0;
// board status
const board = [
  [[], [], []],
  [[], [], []],
  [[], [], []]
];
// game-over
let gameOver = false;

const boardElement = document.getElementById("board");

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
  let boxNum = event.target.className[event.target.className.length - 1];
  console.log('box number', boxNum, 'was clicked!');
});
// render
render = () => {};
// checkIfGameOver
checkIfGameOver = () => {};

/**************
MAIN GAMEPLAY
**************/

while (!gameOver) {
  render();
  checkIfGameOver();
  currentPlayerIdx = (currentPlayerIdx + 1) % 2;
  gameOver = true;
}
