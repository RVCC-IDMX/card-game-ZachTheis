import Deck from './deck.js';
import { select, listen } from './util.js';

const cardSlotElement = select('.card-slot');
const deckElement = select('.deck');
const textElement = select('.text');
const newGameButton = select('#new-game-button');
const diamondsButton = select('#diamonds-button');
const heartsButton = select('#hearts-button');
const clubsButton = select('#clubs-button');
const spadesButton = select('#spades-button');

let deck, score, nextCard;

listen(newGameButton, 'click', startGame);
listen(diamondsButton,'click', () => {playRound('♦')});
listen(heartsButton, 'click', () => {playRound('♥')});
listen(clubsButton, 'click', () => {playRound('♣')});
listen(spadesButton, 'click', () => {playRound('♠')});

function startGame() {
  deck = new Deck;
  deck.shuffle();
  console.log(`First card: ${deck.cards[0].getSuit()}`);

  cleanUp();

  // console.log(`Game started. First card: ${nextCard.getSuit()}`);
  textElement.innerText = 'Pick a suit';
};

function playRound(prediction) {
  console.log(`clicked ${prediction}`);
  if(deck.numberOfCards > 0) {
    const topCard = flipCard();
    if (isWinner(topCard, prediction)) {
      score += 4;
      textElement.innerText = `You Win! Score: ${score}`;
    } else {
      score--;
      textElement.innerText = `You Lose. Score: ${score}`;
    }
    console.log(`Next card: ${deck.cards[0].getSuit()}`);
  } else {
    textElement.innerText = `You're out of cards. Final Score: ${score}`
  }
}

function cleanUp() {
  textElement.innerText = '';
  cardSlotElement.innerHTML = '';
  updateDeckCount();
  score = 0;
};

function updateDeckCount() {
  deckElement.innerText = deck.numberOfCards;
};

function flipCard() {
  const card = deck.pop();

  cardSlotElement.innerHTML = card.getHTML();
  updateDeckCount();
  return card;
};

function isWinner(topCard, prediction) {
  return topCard.getSuit() === prediction;
};

startGame();
