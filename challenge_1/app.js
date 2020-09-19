const app = {
  state: {
    gameOver: null,
    currentPlayerIdx: null,
    loser: null,
    markers: ['X', 'O'],
    players: ['X', 'O'],
    playerNames: ['', ''],
    boardVals: new Array(9),
  },
  dom: {
    board: document.getElementById("board"),
    boardDivs: new Array(9),
    resetButton: document.getElementById("board-reset"),
    messageBox: document.getElementById("message-box"),
    turnBox: document.getElementById("turn-box"),
    winCounts: [document.getElementById("x-win-count"), document.getElementById("o-win-count")],
    scoreboard: document.getElementById("score-table"),
  }
}

for (let i = 0; i < 9; i++) {
  app.dom.boardDivs[i] = document.getElementById(`box${i}`);
}

/**************
EVENT HANDLERS
**************/

app.dom.board.addEventListener('click', (event) => {
  let boxNum = event.target.id[event.target.id.length - 1];
  handleBoxClicked(boxNum);
});

app.dom.resetButton.addEventListener('click', (event) => {
  setupNewBoard(app.state.loser);
  render();
});

app.dom.scoreboard.addEventListener('change', (event) => {
  let idx = event.target.id[event.target.id.length - 1];
  let oldName = app.state.players[idx];
  app.state.playerNames[idx] = `<br> (${event.target.value})`;
  let newName = app.state.markers[idx] + app.state.playerNames[idx];
  app.state.players[idx] = newName;
  putNewNameInTurnBox(oldName, newName);
});

/**************
HELPER FUNCTIONS
**************/

const setupNewBoard = (playerIdxNotStarting = 1) => {
  app.state.boardVals.forEach((boxVal, index) => {
    app.state.boardVals[index] = '';
  });
  app.state.gameOver = false;
  app.dom.messageBox.innerHTML = '';
  app.state.currentPlayerIdx = playerIdxNotStarting;
  switchPlayer();
};

const switchPlayer = (forcedPlayerIdx = app.state.currentPlayerIdx) => {
  app.state.currentPlayerIdx = (forcedPlayerIdx + 1) % 2;
  app.dom.turnBox.innerHTML = `Now Playing: ${app.state.players[app.state.currentPlayerIdx]}`;
};

const putNewNameInTurnBox = (oldName, newName) => {
  let oldTurnBox = app.dom.turnBox.innerHTML;
  let idxOfOldName = oldTurnBox.indexOf(oldName);
  if (idxOfOldName >= 0) {
    let beforeText = oldTurnBox.slice(0, idxOfOldName);
    let afterText = oldTurnBox.slice(idxOfOldName + oldName.length);
    app.dom.turnBox.innerHTML = beforeText + newName + afterText;
  }
}

const render = () => {
  app.state.boardVals.forEach((boxVal, index) => {
    app.dom.boardDivs[index].innerHTML = boxVal;
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
    let val1 = app.state.boardVals[combo[0]];
    let val2 = app.state.boardVals[combo[1]];
    let val3 = app.state.boardVals[combo[2]];
    if (val1 && val1 === val2 && val2 === val3) {
      app.dom.turnBox.innerHTML = `Game over. ${app.state.players[app.state.currentPlayerIdx]} is the winner!`;
      let currentWinCount = Number(app.dom.winCounts[app.state.currentPlayerIdx].innerHTML);
      app.dom.winCounts[app.state.currentPlayerIdx].innerHTML = currentWinCount + 1;
      app.state.loser = app.state.currentPlayerIdx + 1;
      app.state.gameOver = true;
    }
  });

  if (!app.state.gameOver && app.state.boardVals.join('').length === 9) {
    app.dom.messageBox.innerHTML = 'Game over. It\'s a tie.';
    app.state.gameOver = true;
  }
  return app.state.gameOver;
};

/**************
 MAIN GAMEPLAY
**************/

setupNewBoard();

// Game starts when a box is clicked--until then, nothing happens
const handleBoxClicked = (boxNumber) => {
  if (!app.state.gameOver) {
    if (!app.state.boardVals[boxNumber]) {
      app.dom.messageBox.innerHTML = '';
      app.state.boardVals[boxNumber] = app.state.players[app.state.currentPlayerIdx];
      render();
      if (!isGameOver()) {
        switchPlayer();
      }
    } else {
      app.dom.messageBox.innerHTML = 'That space is already taken. Please choose another.';
    }
  } else {
    app.dom.messageBox.innerHTML = `Click 'Reset Board' to start a new game!`;
  }
}



