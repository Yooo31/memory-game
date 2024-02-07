//? Fonction qui créé une carte

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

//? Initialisation des cartes

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

//? Fonction pour la duplication du tableau

function duplicateArray(simpleArray : string[]) : string[] {
  let doubleArray : string[] = [];

  doubleArray.push(...simpleArray);
  doubleArray.push(...simpleArray);

  return doubleArray;
}

//? Fonction pour mélanger les cartes

function shuffleArray(array : string[]) : string[] {
    const arrayShuffled : string[] = array.sort(() => 0.5 - Math.random());

    return arrayShuffled;
}

//? Fonction pour changer la vue des cartes

function changeCardView(elementClicked : string) {
  const card = document.querySelector(`[data-value="${elementClicked}"]`);
  const cardContent = card?.querySelector('.card-content') as HTMLImageElement | null;

  if (cardContent) {
    cardContent.src = allCards[parseInt(elementClicked)];
  }
}

//? Vérification de la correspondace des cartes

function checkCorrepondence() {
  console.log(choice)
  if (choice[0] === choice[1]) {
    alert('Bravo');
  } else {
    alert('Dommage');
  }
}

//! Déroulement du jeu

//? Création du tableau  final

let allCards : string[] = duplicateArray(cards);
let choice : string[] = [];

// allCards = shuffleArray(allCards);
const gameBoard = document.getElementById('game-board')!;

//? Affichage des cartes

allCards.forEach((card, index) => {
  const cardElement = createCard('src/image.png', index);
  gameBoard.appendChild(cardElement);
});

//? Ajout de l'event listener pour le click sur une carte

const cardElements: NodeListOf<HTMLElement> = document.querySelectorAll('.card');
if (cardElements) {
  cardElements.forEach((cardElement: HTMLElement) => {
    cardElement.addEventListener('click', () => {
      const dataValue: string | null = cardElement.getAttribute('data-value');

      //? Vérification de victoire

      if (dataValue) {
        choice.push(allCards[parseInt(dataValue)]);
        changeCardView(dataValue);

        choice.length === 2 && checkCorrepondence();
      }
    });
  });
}
