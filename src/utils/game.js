export function generateQuestion() {
  return Math.floor(Math.random() * 2);
}

export function generateQuestions() {
  return [generateQuestion(), generateQuestion()];
}

export function validateGame(a, b, x, y) {
  // Referee decides if Alice and Bob win or lose
  if ((a === b && (x & y) === 0) || (a !== b && (x & y) === 1)) {
    return 1; // Win
  }
  return 0; // Lose
}

export function chshGame(strategy) {
  /**
   * Plays the CHSH game
   * @param {function} strategy - A function that takes two bits (as `int`s) and
   * returns two bits (also as `int`s). The strategy must follow the
   * rules of the CHSH game.
   * @returns {number} 1 for a win, 0 for a loss.
   */

  // Referee chooses x and y randomly
  const [x, y] = generateQuestions();

  // Use strategy to choose a and b
  const [a, b] = strategy(x, y);

  return validateGame(a, b, x, y);
}

export function runGame(NUM_GAMES = 10, strategy) {
  let totalScore = 0;

  for (let i = 0; i < NUM_GAMES; i++) {
    totalScore += chshGame(strategy);
  }

  console.log('Fraction of games won:', totalScore / NUM_GAMES);

  return {
    totalScore,
    gamesWon: (totalScore / NUM_GAMES) * 100,
  };
}
