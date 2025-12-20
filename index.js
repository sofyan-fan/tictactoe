function player(name, mark) {

  return {
    name,
    mark
  }
}

const player1 = player("sofyan", "X");
const player2 = player("Fatiha", "O");

function Gamecontrol(player1, player2){
      const players = [
        player1,
        player2,
      ];

      let currentPlayerIndex = 0;

      function switchPlayer(){
        if (currentPlayerIndex === 0){
          currentPlayerIndex = 1;
        }
        else{
          currentPlayerIndex = 0;
        }
      };

      function getPlayer(){
        return `It is ${players[currentPlayerIndex].name}'s turn`     
      };   
      
      return{
        switchPlayer,
        getPlayer,
      }
}

function createboard(){
  return{
    row: 3,
    column: 3,
  }
}



const game = Gamecontrol(player1, player2);

console.log(game.getPlayer())

game.switchPlayer();

console.log(game.getPlayer())

const startButton = document.querySelector(".start-button");

const form = document.querySelector(".my-form")

//change DOM

form.addEventListener("submit", (e) => {
  e.preventDefault();
 
  form.remove();
  const container = document.querySelector(".container");

  container.innerHTML = `<div class="board-grid">
      <div class="cube">1</div>
      <div class="cube">2</div>
      <div class="cube">3</div>
      <div class="cube">4</div>
      <div class="cube">5</div>
      <div class="cube">6</div>
      <div class="cube">7</div>
      <div class="cube">8</div>
      <div class="cube">9</div>
    </div> `;

  

});




