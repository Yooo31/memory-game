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
allCards.forEach(function (card, index) {
    var cardElement = createCard('src/image.png', index);
    gameBoard.appendChild(cardElement);
});
function changeCardView(elementClicked) {
    var card = document.querySelector("[data-value=\"".concat(elementClicked, "\"]"));
    var cardContent = card === null || card === void 0 ? void 0 : card.querySelector('.card-content');
    if (cardContent) {
        cardContent.src = allCards[parseInt(elementClicked)];
    }
}
var cardElements = document.querySelectorAll('.card');
if (cardElements) {
    cardElements.forEach(function (cardElement) {
        cardElement.addEventListener('click', function () {
            var dataValue = cardElement.getAttribute('data-value');
            if (dataValue) {
                changeCardView(dataValue);
            }
        });
    });
}
