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

    this.body.setVelocityX(this.speed);

    this.mystate = 'walk';
    this.anims.play('skeleton-' + this.mystate, true);
  }

  update(player) {
   
    if (this.mystate == 'walk') {
      this.scene.physics.moveToObject(this, player, this.speed);
    } else {
      this.speed = 0;
    }

/*
    if (Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y) >= this.distance) {
        this.startX = this.x;
        this.startY = this.y;
        this.speed = this.speed * (-1);
        this.body.setVelocityX(this.speed);
    }
*/
    //this.body.velocity.normalize().scale(this.speed);
  }


  triggerDamage() {
      this.anims.play('skeleton-damage');
      this.playAfterRepeat('skeleton-walk');
  }
}

export default SkeletonSprite;
