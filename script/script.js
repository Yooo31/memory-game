function createCard(CardUrl) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = CardUrl;
    var cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = CardUrl;
    card.appendChild(cardContent);
    return card;
}
function duplicateArray(simpleArray) {
    var doubleArray = [];
    doubleArray.push.apply(doubleArray, simpleArray);
    doubleArray.push.apply(doubleArray, simpleArray);
    return doubleArray;
}
function shuffleArray(array) {
    var arrayShuffled = array.sort(function () { return 0.5 - Math.random(); });
    return arrayShuffled;
}
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
var allCards = duplicateArray(cards);
allCards = shuffleArray(allCards);
var gameBoard = document.getElementById('game-board');
allCards.forEach(function (card) {
    var cardElement = createCard(card);
    gameBoard.appendChild(cardElement);
});
