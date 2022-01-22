import Phaser from 'phaser';
import { Color, Size, Font } from 'js/const';

class MenuScene extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  create() {
    const cx = Size.ScreenWidth / 2;
    const cy = Size.ScreenHeight / 2;

    this.lastGameState = JSON.parse(window.localStorage.getItem('gameState') || 'null');
    this.options = [
      {
        title: 'Continue',
        disabled: !this.lastGameState,
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
          fontFamily: Font.DefaultFamily,
          fontSize: Font.LargeSize,
          stroke: 0xffffff,
        });

        text.setOrigin(0.5, 0.5);
        text.setInteractive({ cursor: 'pointer' });

        text.on('pointerup', onSelect, this);
        text.on('pointerover', this.onOptionOver, text);
        text.on('pointerout', this.onOptionOut, text);
      });
  }

  onOptionOver() {
    this.setTint(Color.Accent);
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
