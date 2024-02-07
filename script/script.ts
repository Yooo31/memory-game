function createCard(CardUrl : string, index : number) : HTMLDivElement {
    console.log(index);
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = index.toString();

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

allCards.forEach((card, index) => {
  const cardElement = createCard('src/image.png', index);
  gameBoard.appendChild(cardElement);
});

function changeCardView(elementClicked : string) {
  const card = document.querySelector(`[data-value="${elementClicked}"]`);
  const cardContent = card?.querySelector('.card-content') as HTMLImageElement | null;

  if (cardContent) {
    cardContent.src = allCards[parseInt(elementClicked)];
  }
}


const cardElements: NodeListOf<HTMLElement> = document.querySelectorAll('.card');

if (cardElements) {
  cardElements.forEach((cardElement: HTMLElement) => {
    cardElement.addEventListener('click', () => {
      const dataValue: string | null = cardElement.getAttribute('data-value');

      if (dataValue) {
          changeCardView(dataValue);
      }
    });
  });
}

