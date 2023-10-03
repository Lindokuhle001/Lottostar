import moneyBagSVG from "/money_bag.svg";

const gameContainer = document.getElementById("game-container");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const modal = document.getElementById("myModal");
const restartButton = document.getElementById("restart-button");
const winnings = document.getElementById("winnings");

let selectedCard: HTMLElement | null = null;
let randomizedCard: HTMLElement | null = null;

const uniqueRandomAmounts: number[] = [];
for (let i = 0; i < 16; i++) {
  let uniqueRandomAmount: number;
  do {
    uniqueRandomAmount = getRandomValue(500, 250000);
  } while (uniqueRandomAmounts.includes(uniqueRandomAmount));
  uniqueRandomAmounts.push(uniqueRandomAmount);
}

function createCard() {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const svg = document.createElement("img");
  svg.src = moneyBagSVG;
  svg.classList.add("svg-content");
  cardContent.appendChild(svg);

  card.appendChild(cardContent);

  card.addEventListener("click", () => {
    if (!selectedCard) {
      selectedCard = card;
      card.classList.add("selected");
      randomizedCard = getRandomCard();
      showModal();
    }
  });

  return card;
}

function getRandomCard() {
  const cards = Array.from(document.querySelectorAll(".card")) as HTMLElement[];
  let randomCard: HTMLElement;
  do {
    const randomIndex = Math.floor(Math.random() * cards.length);
    randomCard = cards[randomIndex];
  } while (randomCard === selectedCard);
  return randomCard;
}

function enableButtons() {
  yesButton?.removeAttribute("disabled");
  noButton?.removeAttribute("disabled");
}

function disableButtons() {
  yesButton?.setAttribute("disabled", "true");
  noButton?.setAttribute("disabled", "true");
}

function getRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setWinnings(amountWon: string) {
  winnings!.innerHTML = `Congratulations, you won ${amountWon}`;
}

yesButton?.addEventListener("click", () => {
  if (selectedCard && randomizedCard) {
    updateCardContent(selectedCard);
    updateCardContent(randomizedCard);


    const randomizedCardContent = randomizedCard.getElementsByClassName(
      "card-content"
    )[0] as HTMLElement;

    const randomizedAmount = randomizedCardContent.textContent || "";

    setWinnings(randomizedAmount);
    selectedCard.classList.remove("selected");
    randomizedCard.classList.add("random-selected");
  }
  hideModal();
  disableButtons();
  randomizedCard = null;
});

noButton?.addEventListener("click", () => {
  if (selectedCard && randomizedCard) {
    updateCardContent(selectedCard);
    updateCardContent(randomizedCard);

    const selectedCardContent = selectedCard.getElementsByClassName(
      "card-content"
    )[0] as HTMLElement;

    const selectedAmount = selectedCardContent.textContent || "";

    setWinnings(selectedAmount);

    selectedCard.classList.remove("selected");
    randomizedCard.classList.add("random-selected");
  }
  hideModal();
  disableButtons();
  randomizedCard = null;
});

restartButton?.addEventListener("click", () => {
  resetGame();
});

function showModal() {
  modal!.style.display = "block";
}

function hideModal() {
  modal!.style.display = "none";
}

function updateCardContent(card: HTMLElement) {
  const cardContent = card.querySelector(".card-content");
  if (cardContent) {
    const index = Array.from(gameContainer!.children).indexOf(card);
    const value = uniqueRandomAmounts[index];
    cardContent.classList.add('display')
    cardContent.textContent = `R ${value}`;
  }
}

function resetGame() {
  while (gameContainer?.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }

  selectedCard = null;
  randomizedCard = null;
  winnings!.innerHTML = "";

  enableButtons();
  initializeGame();
}

function initializeGame() {
  for (let i = 0; i < 16; i++) {
    const card = createCard();
    gameContainer?.appendChild(card);
  }
}

initializeGame();
