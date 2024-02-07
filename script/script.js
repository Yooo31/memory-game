//? Fonction qui créé une carte
function createCard(CardUrl, index) {
    console.log(index);
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = index.toString();
    var cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = CardUrl;
    card.appendChild(cardContent);
    return card;
}
//? Initialisation des cartes
var cards = [
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
function duplicateArray(simpleArray) {
    var doubleArray = [];
    doubleArray.push.apply(doubleArray, simpleArray);
    doubleArray.push.apply(doubleArray, simpleArray);
    return doubleArray;
}
//? Fonction pour mélanger les cartes
function shuffleArray(array) {
    var arrayShuffled = array.sort(function () { return 0.5 - Math.random(); });
    return arrayShuffled;
}
//? Fonction pour changer la vue des cartes
function changeCardView(elementClicked) {
    var card = document.querySelector("[data-value=\"".concat(elementClicked, "\"]"));
    var cardContent = card === null || card === void 0 ? void 0 : card.querySelector('.card-content');
    if (cardContent) {
        cardContent.src = allCards[parseInt(elementClicked)];
    }
}
//? Retourner les cartes lors de l'erreur
function resetCards() {
    choice.forEach(function (card) {
        var cardElement = document.querySelector("[data-value=\"".concat(card, "\"]"));
        var cardContent = cardElement === null || cardElement === void 0 ? void 0 : cardElement.querySelector('.card-content');
        if (cardContent) {
            cardContent.src = 'src/image.png';
        }
    });
}
//? Vérification de la correspondace des cartes
function checkCorrepondence() {
    if (allCards[parseInt(choice[0])] === allCards[parseInt(choice[1])]) {
        score++;
    }
    else {
        resetCards();
    }
    choice = [];
}
//! Déroulement du jeu
//? Score
var score = 0;
//? Création du tableau  final
var allCards = duplicateArray(cards);
//? Choix de l'utilisateur
var choice = [];
// allCards = shuffleArray(allCards);
var gameBoard = document.getElementById('game-board');
//? Affichage des cartes
allCards.forEach(function (card, index) {
    var cardElement = createCard('src/image.png', index);
    gameBoard.appendChild(cardElement);
});
//? Ajout de l'event listener pour le click sur une carte
var cardElements = document.querySelectorAll('.card');
if (cardElements) {
    cardElements.forEach(function (cardElement) {
        cardElement.addEventListener('click', function () {
            var dataValue = cardElement.getAttribute('data-value');
            //? Vérification de victoire
            if (dataValue) {
                choice.push(dataValue);
                changeCardView(dataValue);
                setTimeout(function () {
                    choice.length === 2 && checkCorrepondence();
                }, 1500);
            }
        });
    });
}
