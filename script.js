import Deck from './deck.js';
import { select, listen } from './utils.js';

const cardSlotElement = select('.card-slot');
const deckElement = select('.deck');
const textElement = select('.text');
const newGameButton = select('#new-game-button');
const diamondsButton = select('#diamonds-button');
const heartsButton = select('#hearts-button');
const clubsButton = select('#clubs-button');
const spadesButton = select('#spades-button');

let deck, score;

listen(newGameButton, 'click', startGame);
listen(diamondsButton,'click', () => {playRound('♦')});
listen(heartsButton, 'click',  () => {playRound('♥')});
listen(clubsButton, 'click',   () => {playRound('♣')});
listen(spadesButton, 'click',  () => {playRound('♠')});

function startGame() {
  console.log("This is the startGame function")

  deck = new Deck;
  deck.shuffle();

  cleanUp();
  console.log(deck.cards[0]);

  textElement.innerText = 'Pick a suit';
};

function playRound(prediction) {
  console.log(prediction);
  console.log("This is the playRound function");
  if(deck.numberOfCards > 0) {
    const topCard = flipCard();
    if (isWinner(topCard, prediction)) {
      score += 4;
      textElement.innerText = `You Win! Score: ${score}`;
    } else {
      score--;
      textElement.innerText = `You Lose. Score: ${score}`;
    }
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

  //cardSlotElement.appendChild(card.getHTML());
  cardSlotElement.innerHTML = card.getHTML();
  updateDeckCount();
  return card;
};

function isWinner(topCard, prediction) {
  return topCard.getSuit() === prediction;
};


startGame();
