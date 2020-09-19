const app = {
  state: {
    gameOver: null,
    currentPlayerIdx: null,
    loser: null,
    markers: ['X', 'O'],
    players: ['', ''],
    playerNames: ['', ''],
    markerVals: new Array(9).fill(''),
    nameVals: new Array(9).fill(''),
  },
  dom: {
    board: document.getElementById("board"),
    boardDivs: new Array(9),
    resetButton: document.getElementById("board-reset"),
    messageBox: document.getElementById("message-box"),
    turnBox: document.getElementById("turn-box"),
    winCounts: [document.getElementById("x-win-count"), document.getElementById("o-win-count")],
    scoreboard: document.getElementById("score-table"),
  },
  func: {},
}

/**************
EVENT HANDLERS
**************/

app.dom.board.addEventListener('click', (event) => {
  let boxNum = event.target.id[event.target.id.length - 1];
  app.func.handleBoxClicked(boxNum);
});

app.dom.resetButton.addEventListener('click', (event) => {
  app.func.setupNewBoard(app.state.loser);
  app.func.render();
});

app.dom.scoreboard.addEventListener('change', (event) => {
  let idx = event.target.id[event.target.id.length - 1];
  // let oldName = app.state.players[idx];
  app.state.playerNames[idx] = event.target.value;
  let newName = app.state.playerNames[idx];
  app.state.players[idx] = newName;
  app.func.handleNewName(idx, newName);
});

/**************
HELPER FUNCTIONS
**************/

app.func.buildBoard = () => {
  for (let i = 0; i < 3; i++) {
    let thisRow = document.createElement('div');
    // thisRow.setAttribute('class', 'row');
    thisRow.setAttribute('class', `row row${i}`);
    for (let j = 0; j < 3; j++) {
      let thisBox = document.createElement('div');
      thisBox.setAttribute('class', 'box');
      thisBox.setAttribute('id', `box${i * 3 + j}`);
      let thisMarker = document.createElement('div');
      thisMarker.setAttribute('class', 'marker');
      thisMarker.setAttribute('id', `marker${i * 3 + j}`);
      let thisNameBox = document.createElement('div');
      thisNameBox.setAttribute('class', 'name-box');
      thisNameBox.setAttribute('id', `name-box${i * 3 + j}`);
      thisBox.appendChild(thisMarker);
      thisBox.appendChild(thisNameBox);
      thisRow.appendChild(thisBox);
    }
    app.dom.board.appendChild(thisRow);
  }

  // save them in boardDivs
  for (let i = 0; i < 9; i++) {
    app.dom.boardDivs[i] = document.getElementById(`box${i}`);
  }
}

app.func.setupNewBoard = (playerIdxNotStarting = 1) => {
  app.state.markerVals.forEach((markerVal, index) => {
    app.state.markerVals[index] = '';
    app.state.nameVals[index] = '';
  });
  app.state.gameOver = false;
  app.dom.messageBox.innerHTML = '';
  app.state.currentPlayerIdx = playerIdxNotStarting;
  app.func.switchPlayer();
};

app.func.switchPlayer = (forcedPlayerIdx = app.state.currentPlayerIdx) => {
  app.state.currentPlayerIdx = (forcedPlayerIdx + 1) % 2;
  app.dom.turnBox.innerHTML = app.state.players[app.state.currentPlayerIdx] ?
  `Now Playing: ${app.state.players[app.state.currentPlayerIdx]}` :
  `Now Playing: ${app.state.markers[app.state.currentPlayerIdx]}`;
};

app.func.handleNewName = (playerIndex, newName) => {
  let oldTurnBox = app.dom.turnBox.innerHTML;
  let idxOfMarker = oldTurnBox.indexOf(app.state.markers[playerIndex]);
  if (idxOfMarker >= 0) {
    let beforeText = oldTurnBox.slice(0, idxOfMarker);
    let afterText = oldTurnBox.slice(idxOfMarker + 1);
    app.dom.turnBox.innerHTML = beforeText + newName + afterText;
  }
  app.state.nameVals.forEach((val, index) => {
    if (app.state.markerVals[index] === app.state.markers[playerIndex]) {
      app.state.nameVals[index] = newName;
    }
  });
  app.func.render();
}

app.func.render = () => {
  app.state.markerVals.forEach((boxVal, index) => {
    app.dom.boardDivs[index].firstElementChild.innerHTML = boxVal;
    app.dom.boardDivs[index].lastElementChild.innerHTML = app.state.nameVals[index];
  });
};

app.func.isGameOver = () => {
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
    let val1 = app.state.markerVals[combo[0]];
    let val2 = app.state.markerVals[combo[1]];
    let val3 = app.state.markerVals[combo[2]];
    if (val1 && val1 === val2 && val2 === val3) {
      if (app.state.players[app.state.currentPlayerIdx]) {
        app.dom.turnBox.innerHTML = `Game over. ${app.state.players[app.state.currentPlayerIdx]} is the winner!`;
      } else {
        app.dom.turnBox.innerHTML = `Game over. ${app.state.markers[app.state.currentPlayerIdx]} is the winner!`;
      }
      let currentWinCount = Number(app.dom.winCounts[app.state.currentPlayerIdx].innerHTML);
      app.dom.winCounts[app.state.currentPlayerIdx].innerHTML = currentWinCount + 1;
      app.state.loser = app.state.currentPlayerIdx + 1;
      app.state.gameOver = true;
    }
  });

  if (!app.state.gameOver && app.state.markerVals.join('').length === 9) {
    app.dom.messageBox.innerHTML = 'Game over. It\'s a tie.';
    app.state.gameOver = true;
  }
  return app.state.gameOver;
};

/**************
 MAIN GAMEPLAY
**************/

app.func.buildBoard();

app.func.setupNewBoard();

// Game starts when a box is clicked--until then, nothing happens
app.func.handleBoxClicked = (boxNumber) => {
  if (!app.state.gameOver) {
    if (!app.state.markerVals[boxNumber]) {
      app.dom.messageBox.innerHTML = '';
      app.state.markerVals[boxNumber] = app.state.markers[app.state.currentPlayerIdx];
      app.state.nameVals[boxNumber] = app.state.players[app.state.currentPlayerIdx];
      app.func.render();
      if (!app.func.isGameOver()) {
        app.func.switchPlayer();
      }
    } else {
      app.dom.messageBox.innerHTML = 'That space is already taken. Please choose another.';
    }
  } else {
    app.dom.messageBox.innerHTML = `Click 'Reset Board' to start a new game!`;
  }
}



