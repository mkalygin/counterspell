import Phaser from 'phaser';
import { PriestSprite } from '../sprites';
import { SkeletonSprite } from '../sprites';

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
    
    this.skeletons = [];
    for (let i = 1; i < 2; i++) {
      this.skeletons.push(new SkeletonSprite({
        key: 'enemy',
        scene: this,
        collider: this.wallsLayer,
        x: i * 30,
        y: i * 30,
      })
      );
    }

    this.fireballs = this.physics.add.group({
      defaultKey: 'fireball',
      maxSize: 10
    });

    const camera = this.cameras.main;

    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.input.on('pointerdown', 
    function (pointer)
    {
        var bullet = this.fireballs.get(this.player.x, this.player.y);
        bullet.setScale(0.05);
          bullet.setActive(true);
          bullet.setVisible(true);
          this.physics.add.collider(bullet, this.wallsLayer, 
            function(bullet, wall) {
              bullet.setVisible(false);
              bullet.setActive(false);
          });

          this.physics.add.collider(bullet, this.skeletons, 
            function(bullet, skeleton) {
              bullet.setVisible(false);
              bullet.setActive(false);
              skeleton.setActive(false);
              skeleton.setVisible(false);
          });

          this.physics.moveToObject(bullet, pointer, 100);
    },
    this);

    //this.debug();
  }

  update(time, delta) {
    this.player.update(time, delta);
    this.skeletons.forEach((x, i) => x.update(this.player))
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
