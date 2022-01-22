import Phaser from 'phaser';
import { PriestSprite, SkeletonSprite } from 'js/sprites';
import { UiHud } from 'js/ui';
import { Depth } from 'js/const';
import {SpellKeyIdx} from "../const";

class MainScene extends Phaser.Scene {
  constructor() {
    super('main');
  }

  create() {
    this.hud = new UiHud({ scene: this, hp: 100, totalHp: 150, mp: 100, totalMp: 120 });
    this.add.existing(this.hud);

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
        y: 250 + i * 30,
      })
      );
    }

    this.key_sound = {};
    for (const spellNota in SpellKeyIdx) {
      this.key_sound[spellNota] = this.sound.add(spellNota);
    }
    this.key_sound["space"] = this.sound.add("space");

    this.magic_sound = {};
    this.magic_sound["fireball"] = this.sound.add('fireball_sound');
    this.magic_sound["blink"] = this.sound.add('blink_sound');

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    //this.debug();
  }

  update(time, delta) {
    this.player.update(time, delta, this.hud);
    this.skeletons.forEach((x, i) => x.update(this.player))
  }

  debug() {
    this.physics.world.createDebugGraphic();

    const graphics = this.add
      .graphics()
      .setAlpha(0.75)
      .setDepth(Depth.Debug);

    this.wallsLayer.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  }
}

export default MainScene;
