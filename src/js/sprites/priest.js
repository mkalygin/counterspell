import Phaser from 'phaser';

class PriestSprite extends Phaser.GameObjects.Sprite {
  constructor({ key, scene, collider, x, y }) {
    super(scene, x, y, key);

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    this.scene.physics.add.collider(this, collider);
    //test

    this.setTexture('player', 'priest.0');

    this.speed = 150;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    this.anims.play('priest-idle', true);
    this.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-this.speed);
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.speed);
    } else if (this.cursors.up.isDown) {
      this.body.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown) {
      this.body.setVelocityY(this.speed);
    }

    this.body.velocity.normalize().scale(this.speed);
  }
}

export default PriestSprite;
