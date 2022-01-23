import Phaser from 'phaser';

class SkeletonSprite extends Phaser.GameObjects.Sprite {
  constructor({ key, scene, collider, x, y }) {
    super(scene, x, y, key);

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    this.scene.physics.add.collider(this, collider);

    this.setTexture('enemy', 'walk1');

    this.speed = 15;
    
    this.distance = 60;
    this.startX = x;
    this.startY = y;

    this.health = 100;

    //this.body.setVelocityX(this.speed);

    this.mystate = 'stand';
    this.anims.play('skeleton-' + this.mystate, true);
  }

  update(player) {

  }

  animate_damage() {
    this.anims.play('skeleton-damage', false);
    var timer = this.scene.time.delayedCall(700, this.start_moving, [], this);
  }

  animate_death() {
    this.anims.play('skeleton-die', false);
    var timer = this.scene.time.delayedCall(1000, this.die, [], this);
  }

  die() {
    this.anims.stop();
    //this.kill();
    this.destroy();
  }

  start_moving() {
    this.anims.play('skeleton-walk', false);
    this.scene.physics.moveToObject(this, this.scene.player, this.speed);
  }

  triggerDamage(damage_value) {
    this.health -= damage_value;
    console.log(this.health);
    if (this.health > 0) {
      this.animate_damage();
    } else {
      this.animate_death();
    }
  }
}

export default SkeletonSprite;
