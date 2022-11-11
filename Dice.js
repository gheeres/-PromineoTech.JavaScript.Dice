/**
 * A base class for shared functionality of any Dice.
 */
class Dice {
  /**
   * The current value of the dice.
   */
  value = null;

  /**
   * Creates an instance of the Dice class.
   * @param {Number} sides The number of sides for the dice.
   */
  constructor(sides) {
    if ((typeof sides === 'undefined') || (! sides)) {
      throw new Error('Dice requires number of sides');
    }
    this.sides = sides;
    this.roll(); // Dice cannot NOT have a value.
  }

  /**
   * Rolls the dice.
   * @returns The rolled value.
   */
  roll() {
    this.value = Math.floor(Math.random() * this.sides) + 1;
    return this.value;
  }

  /**
   * Converts the instance into a string.
   * @returns {String} The string representation of the value.
   */
  toString() {
    switch (this.value) {
      case 1: 
        return `⚀ (${ this.value })`; // \u2680
      case 2: 
        return `⚁ (${ this.value })`; // \u2681
      case 3: 
        return `⚂ (${ this.value })`; // \u2682
      case 4: 
        return `⚃ (${ this.value })`; // \u2683
      case 5: 
        return `⚄ (${ this.value })`; // \u2684
      case 6: 
        return `⚅ (${ this.value })`; // \u2685
      default:
        return this.value.toString();
    }
  }
}

/**
 * Represents a standard 6 sided dice
 */
const defaultNumberOfSides = 6;
class StandardDice extends Dice {
  /**
   * Creates an instance of StandardDice
   */
  constructor() {
    super(defaultNumberOfSides);
  }
}

/**
 * A dice that has a higher probability to roll a higher number.
 */
class LoadedDice extends StandardDice {
  /**
   * Rolls the dice.
   * @returns The rolled value.
   */
  roll() {
    let value;
    do {
      value = super.roll();
    }
    while (value < 3);

    this.value = value;
    return this.value;
  }
}

module.exports = {
  Dice : Dice,
  StandardDice: StandardDice,
  LoadedDice: LoadedDice,
}
