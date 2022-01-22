import Phaser from 'phaser';
import { Size, Font, BarType } from 'js/const';

class UiBar extends Phaser.GameObjects.Container {
  constructor({
    scene,
    x,
    y,
    width,
    height,
    type,
    stroke = 0x999999,
    fill = 0xffffff,
    text = '',
    percent = 100,
  }) {
    super(scene, x, y);

    this.width = width;
    this.height = height;
    this.type = type;
    this.percent = Math.max(0, Math.min(percent, 100));

    this.border = this.scene.add.graphics();
    this.bar = type
      ? this.scene.add.sprite(0, 1, 'hud', type)
      : this.scene.add.rectangle(1, 1, width, height, fill);
    this.text = this.scene.add.text(width / 2, height / 2, text, {
      fontFamily: Font.DefaultFamily,
      fontSize: `${Math.round(height / 1.5)}px`,
      stroke: stroke,
    });

    this.border.lineStyle(1, stroke, 1.0);
    this.border.strokeRect(0, 0, width, height);
    this.border.setScrollFactor(0);

    this.bar.setOrigin(0, 0);
    this.bar.displayWidth = type
      ? (width - 1) * Size.TileSize * this.percent / 100
      : (width - 1) * this.percent / 100;
    this.bar.displayHeight = type
      ? (height - 1) * 2
      : height - 1;
    this.bar.setScrollFactor(0);

    this.text.setOrigin(0.5, 0.6);
    this.text.setResolution(10);

    this.add(this.border);
    this.add(this.bar);
    this.add(this.text);
  }

  setPercent(percent, isAnimated = true) {
    this.percent = Math.max(0, Math.min(percent, 100));

    const newDisplayWidth = this.type
      ? (this.width - 1) * Size.TileSize * this.percent / 100
      : (this.width - 1) * this.percent / 100;

    if (isAnimated) {
      this.scene.tweens.add({
        targets: this.bar,
        displayWidth: { from: this.bar.displayWidth, to: newDisplayWidth },
        ease: 'Linear',
        duration: 250,
        repeat: 0,
        yoyo: false,
      });
    } else {
      this.bar.displayWidth = newDisplayWidth;
    }
  }

  setText(text) {
    this.text.setText(text);
  }
}

export default UiBar;
