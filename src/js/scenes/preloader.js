import Phaser from 'phaser';
import { Color, Size, Font } from 'js/const';
import { UiBar } from 'js/ui';

import hudTilesetPng from 'assets/tilesets/hud.png';
import rpgTilesetPng from 'assets/tilesets/Tileset.png';
import dungeonTilesetPng from 'assets/tilesets/dungeon.png';
import dungeonTilemapJson from 'assets/tilemaps/dungeon.json';
import priestAtlasPng from 'assets/atlases/priest/priest.png';
import priestAtlasJson from 'assets/atlases/priest/priest.json';
import skeletonAtlasPng from 'assets/atlases/skeleton/skeleton.png';
import skeletonAtlasJson from 'assets/atlases/skeleton/skeleton.json';
import fireBallPng from 'assets/pics/fireball.png'
import blinkPng from 'assets/pics/blink.png'

class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.onLoadingStart();
    this.load.on('progress', this.onLoadingProgress, this);
    this.load.on('complete', this.onLoadingComplete, this);

    this.load.spritesheet('hud', hudTilesetPng, {
      frameWidth: Size.TileSize,
      frameHeight: Size.TileSize,
    });

    this.load.spritesheet('aux_tiles', rpgTilesetPng, {
      frameWidth: Size.TileSize,
      frameHeight: Size.TileSize,
    });


    this.load.image('tiles', dungeonTilesetPng);
    this.load.tilemapTiledJSON('dungeon', dungeonTilemapJson);
    this.load.atlas('player', priestAtlasPng, priestAtlasJson);
    this.load.atlas('enemy', skeletonAtlasPng, skeletonAtlasJson);
    this.load.image('fireball', fireBallPng);
    this.load.image('blink', blinkPng);


    //this.load.audio('themesong', 'https://github.com/photonstorm/phaser3-examples/tree/master/public/assets/audio/oedipus_wizball_highscore.mp3')


    /*
    https://github.com/MacChoi/App/blob/master/Piano/app.js
    const notes = ['do','re'];
    for (const note in notes) {
      this.load.audio(note, 'assets/audio/piano_keys/' + note + '.mp3');
      console.log(this.load.audio);
    }
    */

  }

  create() {
    //var music = this.sound.add('themesong');
    //music.play();

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

    this.anims.create({
      key: 'skeleton-idle',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNames('enemy', {
        prefix: 'skeleton.',
        start: 0,
        end: 3,
        zeroPad: 1,
      }),
    });
  }

  onLoadingStart() {
    const cx = Size.ScreenWidth / 2;
    const cy = Size.ScreenHeight / 2;
    const width = Size.ScreenWidth / 3;
    const height = 30;

    this.progressBar = new UiBar({
      width,
      height,
      scene: this,
      x: cx - width / 2,
      y: cy - height / 2,
      fill: Color.Accent,
      text: '0%',
      percent: 0,
    });

    this.add.existing(this.progressBar);
  }

  onLoadingProgress(value) {
    const percent = Math.round(100 * value);

    this.progressBar.setPercent(percent);
    this.progressBar.setText(`${percent}%`);
  }

  onLoadingComplete() {
    this.progressBar.destroy();
  }
}

export default PreloaderScene;
