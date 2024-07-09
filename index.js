let deckId;
const card = document.getElementById("card");
const deckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw-card");
const board = document.getElementById("display");
const remainingCards = document.getElementById("remaining");
const computerScoreDisplay = document.getElementById("score1");
const playerScoreDisplay = document.getElementById("score2");
let computerScore = 0;
let playerScore = 0;

async function fetchData() {
    try {
        const res = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/');
        const data = await res.json();
        deckId = data.deck_id;
        console.log(deckId);
    } catch (error) {
        console.error("Error fetching new deck:", error);
    }
}

deckBtn.addEventListener('click', () => {
    fetchData();
    remainingCards.innerHTML = "Remaining cards: 52";
    drawBtn.disabled = false;
    computerScore = 0;
    playerScore = 0;
    computerScoreDisplay.textContent = `Computer: ${computerScore}`;
    playerScoreDisplay.textContent = `Player: ${playerScore}`;
});

drawBtn.addEventListener('click', async () => {
    if (deckId) {
        try {
            const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`);
            const data = await res.json();
            console.log(data);
            const [card1Image, card2Image] = data.cards.map(card => card.image);
            card.children[0].innerHTML = `<img src="${card1Image}" alt="card image" class="card-image">`;
            card.children[1].innerHTML = `<img src="${card2Image}" alt="card image" class="card-image">`;
            
            board.innerHTML = checkCardNumber(data.cards[0], data.cards[1]);
            remainingCards.innerHTML = `Remaining cards: ${data.remaining}`;

            if (data.remaining === 0) {
                drawBtn.disabled = true;
                board.innerHTML = getFinalWinner();
            }
        } catch (error) {
            console.error("Error drawing cards:", error);
        }
    }
});

function checkCardNumber(card1, card2) {
    const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
    const card1Value = cardValues.indexOf(card1.value);
    const card2Value = cardValues.indexOf(card2.value);

    if (card1Value > card2Value) {
        computerScore++;
        computerScoreDisplay.textContent = `Computer: ${computerScore}`;
        return "Player 1 wins";
    } else if (card1Value < card2Value) {
        playerScore++;
        playerScoreDisplay.textContent = `Player: ${playerScore}`;
        return "Player 2 wins";
    } else {
        return "It's a tie";
    }
}

function getFinalWinner() {
    if (computerScore > playerScore) {
        return "Computer is the mega winner";
    } else if (computerScore < playerScore) {
        return "You are the mega winner";
    } else {
        return "It's a tie";
    }
}

// Test checkCardNumber function
const testCard1 = { value: 'ACE' };
const testCard2 = { value: 'KING' };
console.log(checkCardNumber(testCard1, testCard2));
