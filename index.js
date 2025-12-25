// Query selectors

const container = document.querySelector(".container");


// front page load

function landingPage() {

  container.innerHTML = `    <div class="greeting">
      <h1 class="announcement">Greeting fighters</h1>
    </div>

    <form class="my-form" action="">
      <div class="form-container">


        <div class="form-left">

          <img src="images/Ryu.gif" alt="">
          <input type="text" id="player1" name="player1">
          <label for="player1">Player 1</label>

        </div>

        <div class="versus">
          <h1>VS</h1>
        </div>


        <div class="form-right">
          <img src="images/Ken.gif" alt="">
          <input type="text" id="player2" name="player2">
          <label for="player2"> Player 2</label>

        </div>



      </div>

      <div class="submit-container">
        <button type="submit"> PLAY</button>

      </div>


    </form>
`


  const form = document.querySelector(".my-form")
  const announcement = document.querySelector(".announcement");

  // Saart game after submit

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const playerNameinput1 = document.getElementById("player1").value;
    const playerNameinput2 = document.getElementById("player2").value;


    const player1 = player(playerNameinput1, "X");
    const player2 = player(playerNameinput2, "O");

    const game = Gamecontrol(player1, player2);

    form.remove();
    announcement.remove()

    createBoard(playerNameinput1, playerNameinput2);
    console.log(game.getPlayer());

    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        if (game.isGameOver()) return;
        if (cell.textContent !== "") return; // prevent overwrite

        cell.textContent = game.getMark();

        const ended = game.checkCombo(cells);
        if (ended) return;

        game.incrementTurns();
        game.switchPlayer();
        console.log(game.getPlayer());

      });

    });

    const resetBtn = document.querySelector(".reset-button");

    resetBtn.addEventListener("click", () => {
      const cells = document.querySelectorAll(".cell");
      game.resetGame(cells);
    });

  });


}

landingPage()


// Create elements incl. classes

function createEl(tag, className, content) {
  const el = document.createElement(tag);

  if (className) el.className = className;
  if (content !== undefined && content !== null) el.innerHTML = content;


  return el;
}


// Create playgound


// create players
function player(name, mark) {
  return {
    name,
    mark
  }
}

// Game control
function Gamecontrol(player1, player2) {
  const players = [
    player1,
    player2,
  ];

  function resetGame(cells) {


    // reset state
    currentPlayerIndex = 0;
    turns = 0;
    gameOver = false;

    // clear board
    cells.forEach(cell => cell.textContent = "");

    // reset images
    const playerLeftImg = document.querySelector(".player-cage-left .player-pic");
    const playerRightImg = document.querySelector(".player-cage-right .player-pic");

    playerLeftImg.src = "images/Ryu.gif";
    playerRightImg.src = "images/Ken.gif";

    // reset announcement
    const announcement = document.querySelector(".announcement");
    if (announcement) {
      announcement.innerHTML = "<h1>FIGHT!</h1>";
    }

    // reset arrow
    const existingArrow = document.querySelector(".arrow");
    if (existingArrow) existingArrow.remove();

    const arrow = createEl("img", "arrow");
    arrow.src = "images/selection-arrow.gif";

    document.querySelector(".player-cage-left").prepend(arrow);
  };

  function getMark() {
    return players[currentPlayerIndex].mark;
  };

  let gameOver = false


  // Game over

  function isGameOver() {
    return gameOver;
  };

  // Switch players 
  let currentPlayerIndex = 0;

  function switchPlayer() {
    const playerCageLeft = document.querySelector(".player-cage-left");
    const playerCageRight = document.querySelector(".player-cage-right");

    // Remove any existing arrow first
    const existingArrow = document.querySelector(".arrow");
    if (existingArrow) existingArrow.remove();

    const selectionArrow = createEl("img", "arrow");
    selectionArrow.setAttribute("src", "images/selection-arrow.gif");

    if (currentPlayerIndex === 0) {
      currentPlayerIndex = 1;
      playerCageRight.prepend(selectionArrow); // arrow moves to player 2
    } else {
      currentPlayerIndex = 0;
      playerCageLeft.prepend(selectionArrow); // arrow moves to player 1
    };

  };

  // Count turns
  let turns = 0;

  function incrementTurns() {
    return turns++
  }

  function getTurns() {
    return turns;
  }

  //Get player
  function getPlayer() {

    if (turns < 9) {
      return `It is ${players[currentPlayerIndex].name}'s turn`
    } else {
      return 'Game over'
    }
  };

  // Check and announce winner
  function winnerImg() {

    let currentPlayerName = players[currentPlayerIndex].name;

    const playerLeftImg = document.querySelector(".player-cage-left .player-pic");
    const playerRightImg = document.querySelector(".player-cage-right .player-pic");
    const announcement = document.querySelector(".announcement");

    container.prepend(announcement);

    announcement.innerHTML = `${currentPlayerName} wins!`




    const animations = [
      "images/Ryu-hadouken.gif", // Ryu wins
      "images/Ken-shuryuken.gif", // Ken wins
      "images/Ryu-dizzy.gif", // Ryu loses
      "images/Ken-dizzy.gif" // Ken loses
    ];


    if (currentPlayerIndex === 0) { // Player 1 wins
      playerLeftImg.src = animations[0]; // winner
      playerRightImg.src = animations[3]; // loser

    } else { // Player 2 wins
      playerLeftImg.src = animations[2]; // loser
      playerRightImg.src = animations[1]; // winner

    }
  };

  function removeSelectionArrow() {
    const arrow = document.querySelector(".arrow");
    if (arrow) arrow.remove();
  }

  function checkCombo(cells) {

    if (gameOver) return true;

    let currentPlayerMark = players[currentPlayerIndex].mark;
    let currentPlayerName = players[currentPlayerIndex].name;



    if ((cells[0].textContent === currentPlayerMark && cells[1].textContent === currentPlayerMark && cells[2].textContent === currentPlayerMark) ||
      (cells[3].textContent === currentPlayerMark && cells[4].textContent === currentPlayerMark && cells[5].textContent === currentPlayerMark) ||
      (cells[6].textContent === currentPlayerMark && cells[7].textContent === currentPlayerMark && cells[8].textContent === currentPlayerMark) ||
      (cells[0].textContent === currentPlayerMark && cells[3].textContent === currentPlayerMark && cells[6].textContent === currentPlayerMark) ||
      (cells[1].textContent === currentPlayerMark && cells[4].textContent === currentPlayerMark && cells[7].textContent === currentPlayerMark) ||
      (cells[2].textContent === currentPlayerMark && cells[5].textContent === currentPlayerMark && cells[8].textContent === currentPlayerMark) ||
      (cells[0].textContent === currentPlayerMark && cells[4].textContent === currentPlayerMark && cells[8].textContent === currentPlayerMark) ||
      (cells[2].textContent === currentPlayerMark && cells[4].textContent === currentPlayerMark && cells[6].textContent === currentPlayerMark)

    ) {
      console.log(`${currentPlayerName} wins`);
      winnerImg();
      removeSelectionArrow();
      gameOver = true;
      return true;
    }

    let isTie = true;

    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent === "") {
        isTie = false;
        break;
      }
    }

    if (isTie) {
      console.log("it's a tie!")
      removeSelectionArrow();
      gameOver = true;
      return true;
    }
  }


  return {
    switchPlayer,
    getPlayer,
    getMark,
    checkCombo,
    incrementTurns,
    getTurns,
    isGameOver,
    resetGame,
  }
}

// Create board
function createBoard(name1, name2) {
  let board = [];

  for (let i = 0; i < 9; i++) {
    board.push(`<div class="cell"></div>`)
  }

  const announcement = createEl("div", "announcement");
  const controlBtns = createEl("div", "control-btns-container");
  const grid = createEl("div", "board-grid");
  const newGame = createEl("button", "control-btns start-button ", "NEW");
  const resetBtn = createEl("button", "control-btns reset-button", "RESET");
  const playGround = createEl("div", "play-ground");
  const playerCageLeft = createEl("div", "player-cage-left");
  const playerCageRight = createEl("div", "player-cage-right");

  const playerOne = createEl("img", "player-pic");
  const playerTwo = createEl("img", "player-pic");
  const playerOneName = createEl("div", "", name1);
  const playerTwoName = createEl("div", "", name2);
  const selectionArrow = createEl("img", "arrow");

  announcement.innerHTML = "<h1>FIGHT!</h1>";



  playerOne.setAttribute("src", "images/Ryu.gif");
  playerTwo.setAttribute("src", "images/Ken.gif");
  selectionArrow.setAttribute("src", "images/selection-arrow.gif");




  container.appendChild(announcement);
  container.appendChild(controlBtns);
  container.appendChild(playGround);
  playGround.appendChild(playerCageLeft);
  playGround.appendChild(grid);
  playGround.appendChild(playerCageRight);
  playerCageLeft.appendChild(playerOne);
  playerCageLeft.appendChild(playerOneName);
  playerCageRight.appendChild(playerTwo);
  playerCageRight.appendChild(playerTwoName);
  controlBtns.appendChild(newGame);
  controlBtns.appendChild(resetBtn);
  playerCageLeft.prepend(selectionArrow);


  const newGameBtn = document.querySelector(".start-button");

  newGameBtn.addEventListener("click", () => {

    landingPage();

    return {
      playerCageRight,
      playerCageLeft,
    }

  })


  let boardGrid = document.querySelector(".board-grid");

  boardGrid.innerHTML = "";

  for (let i = 0; i < board.length; i++) {
    boardGrid.innerHTML += board[i];
  }

  return {
    board,
    boardGrid,
  }
};