export function classicalRandomStrategy(_x, _y) {
  /**
   * A random classical strategy for the CHSH game
   * @param {number} _x - Alice's bit (unused)
   * @param {number} _y - Bob's bit (unused)
   * @returns {[number, number]} Alice and Bob's answer bits (respectively)
   */

  // Alice's answer
  let a = Math.floor(Math.random() * 2);

  // Bob's answer
  let b = Math.floor(Math.random() * 2);

  return [a, b];
}

export function classicalZeroStrategy(_x, _y) {
  /**
   * A classical strategy for the CHSH game where Alice always returns 0
   * @param {number} _x - Alice's bit (unused)
   * @param {number} _y - Bob's bit (unused)
   * @returns {[number, number]} Alice and Bob's answer bits (respectively)
   */

  // Alice's answer
  let a = 0;

  // Bob's answer
  let b = 0;

  return [a, b];
}

export function classicalAZeroStrategy(x, _y) {
  /**
   * A classical strategy for the CHSH game where Alice always returns x
   * and Bob always returns 0.
   * @param {number} x - Alice's bit (must be 0 or 1)
   * @param {number} _y - Bob's bit (unused)
   * @returns {[number, number]} Alice and Bob's answer bits (respectively)
   */

  // Alice's answer
  let a = x;

  // Bob's answer
  let b = 0;

  return [a, b];
}

export function classicalANotBStrategy(x, y) {
  /**
   * A classical strategy for the CHSH game where Alice always returns x
   * and Bob always returns not y.
   * @param {number} x - Alice's bit (must be 0 or 1)
   * @param {number} y - Bob's bit (must be 0 or 1)
   * @returns {[number, number]} Alice and Bob's answer bits (respectively)
   */

  // Alice's answer
  let a = x;

  // Bob's answer
  let b;
  if (y === 0) {
    b = 1;
  } else if (y === 1) {
    b = 0;
  }

  return [a, b];
}

export function getRandomStragegy() {
  /**
   * Randomly select a classical strategy
   * @returns {function} A randomly selected classical strategy
   */
  // 25% chance of failure for each strategy, therefore 75% chance of success
  const menu = [
    classicalZeroStrategy,
    classicalAZeroStrategy,
    classicalANotBStrategy,
  ];

  return menu[Math.floor(Math.random() * menu.length)];
}

export function classicalProbabilisticStrategy(x, y) {
  /**
   * A probabilistic classical strategy for the CHSH game
   * @param {number} x - Alice's bit (must be 0 or 1)
   * @param {number} y - Bob's bit (must be 0 or 1)
   * @returns {[number, number]} Alice and Bob's answer bits (respectively)
   */

  // Alice's answer
  let [a, _b] = getRandomStragegy()(x, y);

  // Bob's answer
  let [_a, b] = getRandomStragegy()(x, y);

  return [a, b];
}

export const availableStrategies = {
  classicalZeroStrategy,
  classicalAZeroStrategy,
  classicalANotBStrategy,
  classicalProbabilisticStrategy,
  classicalRandomStrategy,
};
