import Phaser from 'phaser';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'js/const';
import dungeonTilesetPng from 'assets/tilesets/dungeon.png';
import dungeonTilemapJson from 'assets/tilemaps/dungeon.json';
import priestAtlasPng from 'assets/atlases/priest.png';
import priestAtlasJson from 'assets/atlases/priest.json';

class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.onLoadingStart();
    this.load.on('progress', this.onLoadingProgress.bind(this));
    this.load.on('complete', this.onLoadingComplete.bind(this));

    this.load.image('tiles', dungeonTilesetPng);
    this.load.tilemapTiledJSON('dungeon', dungeonTilemapJson);
    this.load.atlas('player', priestAtlasPng, priestAtlasJson);
  }

  create() {
    this.scene.start('main');

    this.anims.create({
      key: 'priest-idle',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNames('player', {
        prefix: 'priest.',
        start: 0,
        end: 3,
        zeroPad: 1,
      }),
    });
  }

  onLoadingStart() {
    const cx = SCREEN_WIDTH / 2;
    const cy = SCREEN_HEIGHT / 2;
    const bw = SCREEN_WIDTH / 3;
    const bh = 50;

    this.progressPos = { cx, cy, bw, bh };
    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();

    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(cx - bw / 2, cy - bh / 2, bw, bh);

    this.progressText = this.add.text(cx, cy - bh, 'Loading...', {
      fontFamily: 'Gremlin, monospace',
      fontSize: '20px',
      stroke: 0xffffff,
    });

    this.progressPercent = this.add.text(cx, cy, '0%', {
      fontFamily: 'Gremlin, monospace',
      fontSize: '16px',
      stroke: 0xffffff,
    });

    this.progressText.setOrigin(0.5, 0.5);
    this.progressPercent.setOrigin(0.5, 0.5);
  }

  onLoadingProgress(value) {
    const { cx, cy, bw, bh } = this.progressPos;

    this.progressPercent.setText(`${Math.round(value * 100)}%`);
    this.progressBar.clear();
    this.progressBar.fillStyle(0xffffff, 1);
    this.progressBar.fillRect(cx - bw / 2, cy - bh / 2, bw * value, bh);
  }

  onLoadingComplete() {
    this.progressBar.destroy();
    this.progressBox.destroy();
    this.progressText.destroy();
    this.progressPercent.destroy();
  }
}

export default PreloaderScene;
