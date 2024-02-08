var GameManager = /** @class */ (function () {
    function GameManager() {
    }
    GameManager.duplicateArray = function (array) {
        var doubleArray = [];
        doubleArray.push.apply(doubleArray, array);
        doubleArray.push.apply(doubleArray, array);
        return doubleArray;
    };
    GameManager.shuffleArray = function (array) {
        return array.sort(function () { return 0.5 - Math.random(); });
    };
    GameManager.createCard = function (CardUrl, index) {
        var card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = index.toString();
        var cardContent = document.createElement('img');
        cardContent.classList.add('card-content');
        cardContent.src = CardUrl;
        card.appendChild(cardContent);
        return card;
    };
    GameManager.changeCardView = function (elementClicked, allCards) {
        var card = document.querySelector("[data-value=\"".concat(elementClicked, "\"]"));
        var cardContent = card === null || card === void 0 ? void 0 : card.querySelector('.card-content');
        if (cardContent) {
            cardContent.src = allCards[parseInt(elementClicked)];
        }
    };
    GameManager.resetCards = function (choice) {
        choice.forEach(function (card) {
            var cardElement = document.querySelector("[data-value=\"".concat(card, "\"]"));
            var cardContent = cardElement === null || cardElement === void 0 ? void 0 : cardElement.querySelector('.card-content');
            if (cardContent) {
                cardContent.src = 'src/image.png';
            }
        });
    };
    GameManager.endGame = function (gameBoard) {
        gameBoard.classList.add('d-none');
        var endBoard = document.getElementById('game-end');
        endBoard.classList.remove('d-none');
    };
    GameManager.blockClick = function (gameBoard) {
        gameBoard.classList.add('click-disabled');
    };
    GameManager.enableClick = function (gameBoard) {
        gameBoard.classList.remove('click-disabled');
    };
    return GameManager;
}());
var GamePoints = /** @class */ (function () {
    function GamePoints() {
    }
    GamePoints.updateScoreDisplay = function (score) {
        var scoreElement = document.getElementById('points');
        if (scoreElement) {
            scoreElement.textContent = "Score: ".concat(score);
        }
    };
    return GamePoints;
}());
var Game = /** @class */ (function () {
    function Game(cards) {
        this.cards = cards;
        this.score = 0;
        this.choice = [];
        this.gameBoard = document.getElementById('game-board');
        this.allCards = this.getFinalArray(cards);
    }
    Game.prototype.getFinalArray = function (simpleArray) {
        var completeArray = GameManager.duplicateArray(simpleArray);
        return GameManager.shuffleArray(completeArray);
    };
    Game.prototype.checkCorrepondence = function () {
        if (this.allCards[parseInt(this.choice[0])] === this.allCards[parseInt(this.choice[1])]) {
            this.score++;
            GamePoints.updateScoreDisplay(this.score);
            this.score === 8 && GameManager.endGame(this.gameBoard);
        }
        else {
            GameManager.resetCards(this.choice);
        }
        this.choice = [];
        GameManager.enableClick(this.gameBoard);
    };
    Game.prototype.initGame = function () {
        var _this = this;
        this.allCards.forEach(function (card, index) {
            var cardElement = GameManager.createCard('src/image.png', index);
            _this.gameBoard.appendChild(cardElement);
        });
        var cardElements = document.querySelectorAll('.card');
        if (cardElements) {
            cardElements.forEach(function (cardElement) {
                cardElement.addEventListener('click', function () {
                    var dataValue = cardElement.getAttribute('data-value');
                    if (dataValue) {
                        _this.choice.push(dataValue);
                        GameManager.changeCardView(dataValue, _this.allCards);
                        if (_this.choice.length === 2) {
                            GameManager.blockClick(_this.gameBoard);
                            setTimeout(function () {
                                _this.checkCorrepondence();
                            }, 1000);
                        }
                    }
                });
            });
        }
    };
    return Game;
}());
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
var game = new Game(cards);
game.initGame();
