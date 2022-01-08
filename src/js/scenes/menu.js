import Phaser from 'phaser';
import { SCREEN_WIDTH, SCREEN_HEIGHT, DEFAULT_FONT } from 'js/const';

class MenuScene extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  create() {
    const cx = SCREEN_WIDTH / 2;
    const cy = SCREEN_HEIGHT / 2;

    this.lastGameState = JSON.parse(window.localStorage.getItem('gameState') || 'null');
    this.options = [
      {
        title: 'Continue',
        disabled: this.lastGameState,
        onSelect: this.onContinueSelect,
      },
      {
        title: 'Start New Game',
        onSelect: this.onStartSelect,
      },
    ];

    this.options
      .filter(option => !option.disabled)
      .map(({ title, onSelect }, index) => {
        const shift = (-this.options.length / 2 + index) * 30;
        const text = this.add.text(cx, cy + shift, title, {
          fontFamily: DEFAULT_FONT,
          fontSize: '20px',
          stroke: 0xffffff,
        });

        text.setOrigin(0.5, 0.5);
        text.setInteractive({ cursor: 'pointer' });

        text.on('pointerup', onSelect.bind(this));
        text.on('pointerover', this.onOptionOver.bind(text));
        text.on('pointerout', this.onOptionOut.bind(text));
      });
  }

  onOptionOver() {
    this.setTint(0xa2a2fe);
  }

  onOptionOut() {
    this.clearTint();
  }

  onContinueSelect() {
    this.scene.start('main', this.lastGameState);
  }

  onStartSelect() {
    this.scene.start('main', {});
  }
}

export default MenuScene;
