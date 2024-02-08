class GameManager {
  static duplicateArray(array: string[]): string[] {
    let doubleArray: string[] = [];

    doubleArray.push(...array);
    doubleArray.push(...array);

    return doubleArray;
  }

  static shuffleArray(array: string[]): string[] {
    return array.sort(() => 0.5 - Math.random());
  }

  static createCard(CardUrl: string, index: number): HTMLDivElement {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = index.toString();

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = CardUrl;
    card.appendChild(cardContent);

    return card;
  }

  static changeCardView(elementClicked: string, allCards: string[]) {
    const card = document.querySelector(`[data-value="${elementClicked}"]`);
    const cardContent = card?.querySelector('.card-content') as HTMLImageElement | null;

    if (cardContent) {
      cardContent.src = allCards[parseInt(elementClicked)];
    }
  }

  static resetCards(choice: string[]) {
    choice.forEach((card) => {
      const cardElement = document.querySelector(`[data-value="${card}"]`);
      const cardContent = cardElement?.querySelector('.card-content') as HTMLImageElement | null;

      if (cardContent) {
        cardContent.src = 'src/image.png';
      }
    })
  }

  static endGame(gameBoard: HTMLElement) {
    gameBoard.classList.add('d-none');

    const endBoard = document.getElementById('game-end')!;
    endBoard.classList.remove('d-none');
  }

  static blockClick(gameBoard: HTMLElement) {
    gameBoard.classList.add('click-disabled');
  }

  static enableClick(gameBoard: HTMLElement) {
    gameBoard.classList.remove('click-disabled');
  }
}

class GamePoints {
  static updateScoreDisplay(score : number) {
    const scoreElement = document.getElementById('points');
    if (scoreElement) {
      scoreElement.textContent = `${score}`;
    }
  }
}

class Game {
  cards: string[];
  score: number;
  choice: string[];
  gameBoard: HTMLElement;
  allCards: string[];

  constructor(cards: string[]) {
    this.cards = cards;
    this.score = 0;
    this.choice = [];
    this.gameBoard = document.getElementById('game-board')!;
    this.allCards = this.getFinalArray(cards);
  }

  getFinalArray(simpleArray: string[]): string[] {
    const completeArray = GameManager.duplicateArray(simpleArray);
    return GameManager.shuffleArray(completeArray);
  }

  checkCorrepondence() {
    if (this.allCards[parseInt(this.choice[0])] === this.allCards[parseInt(this.choice[1])]) {
      this.score++;
      GamePoints.updateScoreDisplay(this.score);

      this.score === 8 && GameManager.endGame(this.gameBoard);
    } else {
      GameManager.resetCards(this.choice);
    }

    this.choice = [];
    GameManager.enableClick(this.gameBoard);
  }

  initGame() {
    this.allCards.forEach((card, index) => {
      const cardElement = GameManager.createCard('src/image.png', index);
      this.gameBoard.appendChild(cardElement);
    });

    const cardElements: NodeListOf<HTMLElement> = document.querySelectorAll('.card');
    if (cardElements) {
      cardElements.forEach((cardElement: HTMLElement) => {
        cardElement.addEventListener('click', () => {
          const dataValue: string | null = cardElement.getAttribute('data-value');

          if (dataValue) {
            this.choice.push(dataValue);
            GameManager.changeCardView(dataValue, this.allCards);

            if (this.choice.length === 2) {
              GameManager.blockClick(this.gameBoard);

              setTimeout(() => {
                this.checkCorrepondence();
              }, 1000);
            }
          }
        });
      });
    }
  }
}

const cards: string[] = [
  'src/image1.png',
  'src/image2.png',
  'src/image3.png',
  'src/image4.png',
  'src/image5.png',
  'src/image6.png',
  'src/image7.png',
  'src/image8.png'
];

const game = new Game(cards);
game.initGame();
