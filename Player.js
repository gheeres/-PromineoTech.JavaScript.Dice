const DiceTypes = require('./Dice');
const Dice = DiceTypes.Dice;
const StandardDice = DiceTypes.StandardDice

class Player {
  dice = [];
  score = 0;

  constructor(name, dice) {
    if ((typeof name === 'undefined') || (! name)) {
      throw new Error('Player name is required.');
    }
    this.name = name;
    this.dice = ((typeof(dice) !== 'undefined') ? this.dice = dice.map(d => d) : null) || [];
    this.score = 0;
  }

  /**
   * Add the specified dice into the players hand.
   * @param {Dice} dice The dice to add.
   * @returns {Player} The current instance.
   */
  add(dice) {
    if ((typeof dice !== 'undefined') && (dice instanceof Dice)) {
      this.dice.push(dice);
    }
    return this;
  }

  /**
   * Rolls or throws all of the dice that the player has.
   * @returns {Number} The total value of the dice rolled.
   */
  throw() {
    this.dice.forEach(d => d.roll());
    return this.getTotal();
  }

  /**
   * Gets the total for all of the dice.
   * @returns {Number} The total value of the current dice.
   */
  getTotal() {
    return this.dice.reduce((prev,dice) => {
       return prev + dice.value;
    }, 0);
  }

  toString() {
    let dice = this.dice.reduce((previous,dice) => {
      return `${ previous } ${ dice }`;
    }, ' ');
    return `${ this.name } : ${ dice } => ${ this.getTotal() }`;
  }
}

module.exports = Player;