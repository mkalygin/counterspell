import Phaser from 'phaser';
import { Color, Size, Font } from 'js/const';
import { UiBar } from 'js/ui';

import hudTilesetPng from 'assets/tilesets/hud.png';
import rpgTilesetPng from 'assets/tilesets/Tileset.png';
import dungeonTilesetPng from 'assets/tilesets/dungeon.png';
import dungeonTilemapJson from 'assets/tilemaps/dungeon.json';
import priestAtlasPng from 'assets/atlases/priest/priest.png';
import priestAtlasJson from 'assets/atlases/priest/priest.json';
import skeletonAtlasPng from 'assets/atlases/skeleton/skeleton_full.png';
import skeletonAtlasJson from 'assets/atlases/skeleton/skeleton_full.json';
import fireBallPng from 'assets/pics/fireball.png';
import blinkPng from 'assets/pics/blink.png';
import {SpellKeyIdx} from "../const";

//load audio
const themeAudioMp3 = new URL('../../assets/audio/wizball_highscore.mp3', import.meta.url);
// music keys
const od = new URL('../../assets/audio/piano_keys/do.mp3', import.meta.url);
const re = new URL('../../assets/audio/piano_keys/re.mp3', import.meta.url);
const mi = new URL('../../assets/audio/piano_keys/mi.mp3', import.meta.url);
const fa = new URL('../../assets/audio/piano_keys/fa.mp3', import.meta.url);
const so = new URL('../../assets/audio/piano_keys/sol.mp3', import.meta.url);
const la = new URL('../../assets/audio/piano_keys/la.mp3', import.meta.url);
const si = new URL('../../assets/audio/piano_keys/si.mp3', import.meta.url);
const space = new URL('../../assets/audio/piano_keys/space.wav', import.meta.url);
const fireball_sound = new URL('../../assets/audio/fireball_shot.wav', import.meta.url);
const blink_sound = new URL('../../assets/audio/blink.wav', import.meta.url);

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

    this.load.audio('theme', themeAudioMp3.href);
    this.load.audio('od', od.href);
    this.load.audio('re', re.href);
    this.load.audio('mi', mi.href);
    this.load.audio('fa', fa.href);
    this.load.audio('so', so.href);
    this.load.audio('la', la.href);
    this.load.audio('si', si.href);
    this.load.audio('space', space.href);
    this.load.audio('fireball_sound', fireball_sound.href);
    this.load.audio('blink_sound', blink_sound.href);
  }

  create() {
    //const music = this.sound.add('theme');
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
      key: 'skeleton-stand',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNames('enemy', {
        prefix: 'stand',
        start: 1,
        end: 4,
        zeroPad: 1,
      }),
    });

    this.anims.create({
      key: 'skeleton-walk',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNames('enemy', {
        prefix: 'walk',
        start: 1,
        end: 24,
        zeroPad: 1,
      }),
    });

    this.anims.create({
      key: 'skeleton-damage',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNames('enemy', {
        prefix: 'damage',
        start: 1,
        end: 7,
        zeroPad: 1,
      }),
    });
    
    this.anims.create({
      key: 'skeleton-attack',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNames('enemy', {
        prefix: 'attack',
        start: 1,
        end: 16,
        zeroPad: 1,
      }),
    });

    this.anims.create({
      key: 'skeleton-die',
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNames('enemy', {
        prefix: 'die',
        start: 1,
        end: 15,
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
