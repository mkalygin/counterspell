import Phaser from 'phaser';
import dungeonTilesetPng from 'assets/tilesets/dungeon.png';
import dungeonTilemapJson from 'assets/tilemaps/dungeon.json';
import priestAtlasPng from 'assets/atlases/priest/priest.png';
import priestAtlasJson from 'assets/atlases/priest/priest.json';
import skeletonAtlasPng from 'assets/atlases/skeleton/skeleton.png';
import skeletonAtlasJson from 'assets/atlases/skeleton/skeleton.json';

class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('tiles', dungeonTilesetPng);
    this.load.tilemapTiledJSON('dungeon', dungeonTilemapJson);
    this.load.atlas('player', priestAtlasPng, priestAtlasJson);
    this.load.atlas('enemy', skeletonAtlasPng, skeletonAtlasJson);
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
}

export default PreloaderScene;
