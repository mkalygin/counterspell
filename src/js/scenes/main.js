import Phaser from 'phaser';
import { PriestSprite } from '../sprites';

class MainScene extends Phaser.Scene {
  constructor() {
    super('main');
  }

  create() {
    this.map = this.make.tilemap({ key: 'dungeon' });
    this.tileset = this.map.addTilesetImage('dungeon', 'tiles');

    this.groundLayer = this.map.createLayer('ground', this.tileset);
    this.wallsLayer = this.map.createLayer('walls', this.tileset);

    this.wallsLayer.setCollisionByProperty({ collides: true });

    this.scene.scene.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.player = new PriestSprite({
      key: 'player',
      scene: this,
      collider: this.wallsLayer,
      x: this.map.widthInPixels / 2,
      y: this.map.heightInPixels / 2,
    });

    const camera = this.cameras.main;

    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // this.debug();
  }

  update(time, delta) {
    this.player.update(time, delta);
  }

  debug() {
    this.physics.world.createDebugGraphic();

    const graphics = this.add
      .graphics()
      .setAlpha(0.75)
      .setDepth(20);

    this.wallsLayer.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  }
}

export default MainScene;
