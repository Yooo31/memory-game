function createCard(CardUrl : string) : HTMLDivElement {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = CardUrl;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = CardUrl;
    card.appendChild(cardContent);

    return card;
}

function duplicateArray(simpleArray : string[]) : string[] {
  let doubleArray : string[] = [];

  doubleArray.push(...simpleArray);
  doubleArray.push(...simpleArray);

  return doubleArray;
}

function shuffleArray(array : string[]) : string[] {
    const arrayShuffled : string[] = array.sort(() => 0.5 - Math.random());

    return arrayShuffled;
}

const cards : string[] = [
  'src/image1.png',
  'src/image2.png',
  'src/image3.png',
  'src/image4.png',
  'src/image5.png',
  'src/image6.png',
  'src/image7.png',
  'src/image8.png'
];

let allCards : string[] = duplicateArray(cards);
allCards = shuffleArray(allCards);
const gameBoard = document.getElementById('game-board')!;

allCards.forEach((card) => {
  const cardElement = createCard(card);
  gameBoard.appendChild(cardElement);
});
