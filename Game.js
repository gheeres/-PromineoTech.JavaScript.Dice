const prompt = require('./Console').prompt;
const DiceTypes = require('./Dice');
const Dice = DiceTypes.Dice;
const StandardDice = DiceTypes.StandardDice;
const LoadedDice = DiceTypes.LoadedDice;
const Player = require('./Player');

class Game {
  constructor() {
    this.players = [];
    this.rounds = 0;
  }

  /**
   * Sets up the game.
   */
  setup() {
    let numberOfPlayers = prompt('How many players?\nPlayers> ');
    for(let index = 0; index < numberOfPlayers; index++) {
      let playerName = prompt(`Enter player ${ index + 1 } name:\nPlayer ${ index + 1 }> `);
      if (! playerName) {
        playerName = `Player ${ index + 1 }`;
      }
      let isHousePlayer = (playerName.toUpperCase() === 'George'.toUpperCase());

      let player = new Player(playerName);
      player.add(new StandardDice())
            .add(isHousePlayer ? new LoadedDice() : new StandardDice())
            .add(isHousePlayer ? new LoadedDice() : new StandardDice())
            .add(isHousePlayer ? new LoadedDice() : new StandardDice())
            .add(new StandardDice());
      this.players.push(player);
    }

    let numberOfRounds;
    console.log('How many rounds?');
    do {
      numberOfRounds = prompt('Rounds> ');
    } while((! numberOfRounds) || (parseInt(numberOfRounds, 10) <= 0));
    this.rounds = numberOfRounds;
  }
  
  /**
   * Displays a summary of the game stats.
   */
  displayStats() {
    console.log('Game Statistics: WINS vs LOSES');
    this.players.sort((p1,p2) => (p1.score - p2.score) * -1).forEach((player) => {
      console.log(`  ${player.name}:  ${player.score}`);
    });
  }

  start() {
    this.setup();

    for(let round = 0; round < this.rounds; round++) {
      let winner = null;
      console.log(`Round #${ round + 1 }`);
      this.players.forEach((player) => {
        let rolled = player.throw();
        if ((! winner) || (rolled > winner.getTotal())) {
          winner = player;
        }
        console.log(`  ${ player }`);
      });
      winner.score++;
      console.log(`WINNER: ${ winner }`);
    }
    console.log('GAME OVER\n');

    this.displayStats();
  }
}

module.exports = Game;
