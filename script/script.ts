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

class Timer {
  private intervalId: number = 0;
  private startTime: number = 0;
  private elapsedTime: number = 0;
  private running: boolean = false;

  start() {
    if (!this.running) {
      this.startTime = Date.now() - this.elapsedTime;
      this.intervalId = window.setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;
        this.updateTimeDisplay();
      }, 1000);
      this.running = true;
    }
  }

  stop() {
    if (this.running) {
      clearInterval(this.intervalId);
      this.running = false;
    }
  }

  reset() {
    this.elapsedTime = 0;
    this.updateTimeDisplay();
  }

  private updateTimeDisplay() {
    const timerElement = document.getElementById("timer");
    if (timerElement) {
      const minutes = Math.floor(this.elapsedTime / 60000);
      const seconds = Math.floor((this.elapsedTime % 60000) / 1000);
      timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
}

class Game {
  cards: string[];
  score: number;
  choice: string[];
  gameBoard: HTMLElement;
  allCards: string[];
  gameIsStarted: boolean;
  private timer : Timer;

  constructor(cards: string[]) {
    this.cards = cards;
    this.score = 0;
    this.choice = [];
    this.gameBoard = document.getElementById('game-board')!;
    this.allCards = this.getFinalArray(cards);
    this.gameIsStarted = false;
    this.timer = new Timer();
  }

  getFinalArray(simpleArray: string[]): string[] {
    const completeArray = GameManager.duplicateArray(simpleArray);
    return GameManager.shuffleArray(completeArray);
  }

  checkCorrepondence() {
    if (this.allCards[parseInt(this.choice[0])] === this.allCards[parseInt(this.choice[1])]) {
      this.score++;
      GamePoints.updateScoreDisplay(this.score);

      if (this.score === 8) {
        GameManager.endGame(this.gameBoard);
        this.timer.stop();
      }
    } else {
      GameManager.resetCards(this.choice);
    }

    this.choice = [];
    GameManager.enableClick(this.gameBoard);
  }

  initGame() {
    this.timer.reset();
    this.allCards.forEach((card, index) => {
      const cardElement = GameManager.createCard('src/image.png', index);
      this.gameBoard.appendChild(cardElement);
    });

    const cardElements: NodeListOf<HTMLElement> = document.querySelectorAll('.card');
    if (cardElements) {
      cardElements.forEach((cardElement: HTMLElement) => {
        cardElement.addEventListener('click', () => {
          if (!this.gameIsStarted) {
            this.timer.start();
            this.gameIsStarted = true;
          }

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
