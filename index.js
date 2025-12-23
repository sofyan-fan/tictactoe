

// create players
function player(name, mark) {

  return {
    name,
    mark
  }
}

const player1 = player("sofyan", "X");
const player2 = player("Fatiha", "O");


// Game control
function Gamecontrol(player1, player2) {
  const players = [
    player1,
    player2,
  ];

  function getMark() {
    return players[currentPlayerIndex].mark;
  }

  let currentPlayerIndex = 0;


  function switchPlayer() {

    if (currentPlayerIndex === 0) {
      currentPlayerIndex = 1;
    } else {
      currentPlayerIndex = 0;
    }
  };

  let turns = 0;

  function incrementTurns() {
    return turns++
  }

  function getTurns() {
    return turns;
  }


  function getPlayer() {
    return `It is ${players[currentPlayerIndex].name}'s turn`
  };

  function checkCombo(cells) {

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
       return;
    }

    let isTie = true;

    for(let i = 0; i< cells.length; i++){
      if(cells[i].textContent === ""){
        isTie = false;
        break;
      }
    }

    if(isTie){
      console.log("it's a tie!")
    }
  }


  return {
    switchPlayer,
    getPlayer,
    getMark,
    checkCombo,
    incrementTurns,
    getTurns,

  }
}

// Create board
function createBoard() {
  let board = [];

  for (let i = 0; i < 9; i++) {
    board.push(`<div class="cell"></div>`)
  }

  const container = document.querySelector(".container");

  const grid = document.createElement("div");
  grid.classList.add("board-grid");
  container.appendChild(grid);


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

//Check winning combination

const game = Gamecontrol(player1, player2);

console.log(game.getPlayer())
console.log(game.getMark())

game.switchPlayer();

console.log(game.getPlayer())
console.log(game.getMark())

const startButton = document.querySelector(".start-button");

const form = document.querySelector(".my-form")



//change DOM

form.addEventListener("submit", (e) => {
  e.preventDefault();

  form.remove();

  createBoard();

  const cells = document.querySelectorAll(".cell");

  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      if (cell.textContent !== "") return; // prevent overwrite

      cell.textContent = game.getMark();

      game.checkCombo(cells);
      game.incrementTurns();
      game.switchPlayer();

    });

  });
});