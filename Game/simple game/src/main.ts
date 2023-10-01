import moneyBagSVG from '/money_bag.svg';

const gameContainer = document.getElementById("game-container");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const modal = document.getElementById("myModal");
const restartButton = document.getElementById("restart-button");

let selectedCard: HTMLElement | null = null;
let randomizedCard: HTMLElement | null = null;

// Create an array of 16 unique random amounts
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

yesButton?.addEventListener("click", () => {
    if (selectedCard && randomizedCard) {
        selectedCard.classList.remove("selected");
        randomizedCard.classList.add("random-selected");
        updateCardContent(selectedCard);
        updateCardContent(randomizedCard);
    }
    hideModal();
    disableButtons();
    randomizedCard = null;
});

noButton?.addEventListener("click", () => {
    if (selectedCard && randomizedCard) {
        selectedCard.classList.remove("selected");
        randomizedCard.classList.add("random-selected");
        updateCardContent(selectedCard);
        updateCardContent(randomizedCard);
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
        cardContent.textContent = `$ ${value}`;
    }
}

function resetGame() {
    // Clear the game container
    while (gameContainer?.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }

    // Reset game variables
    selectedCard = null;
    randomizedCard = null;

    enableButtons();
    // Reinitialize the game
    initializeGame();
}

function initializeGame() {
    for (let i = 0; i < 16; i++) {
        const card = createCard();
        gameContainer?.appendChild(card);
    }
}

initializeGame();
