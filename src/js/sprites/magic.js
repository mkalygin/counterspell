import Phaser from "phaser";

class Magic extends Phaser.GameObjects.Sprite {
    constructor({key, scene, collider, x, y}) {
        super(scene, x, y, key);
        this.scene.physics.add.collider(this, collider);
        this.activeSpell = null;

        //preload all magic objects
        this.fireball = new Fireball({scene: this.scene});
        this.blink = new Blink({scene: this.scene});
    }

    activateSpell(key) {
        if (key == 'fireball') {
            this.activeSpell = this.fireball;
        }
        if (key == 'blink') {
            this.activeSpell = this.blink;
        }
    }

    deactivateSpell() {
        this.activeSpell = null;
    }
}

class Fireball
{
    constructor({scene})
    {
        this.scene = scene;
        this.spellKey = 'fireball';
        this.bullets = this.scene.physics.add.group({
            defaultKey: this.spellKey,
            maxSize: 10
        });
    }

    act(pointer)
    {
        this.scene.magic_sound[this.spellKey].play();

        let bullet = this.bullets.get(this.scene.player.x, this.scene.player.y);
        bullet.setScale(0.05);
        bullet.setActive(true);
        bullet.setVisible(true);
        this.scene.physics.add.collider(bullet, this.scene.wallsLayer,
            function(bullet, wall) {
                bullet.setVisible(false);
                bullet.destroy(false);
            });

        this.scene.physics.add.collider(bullet, this.scene.skeletons,
            function(bullet, skeleton) {
                bullet.setVisible(false);
                bullet.destroy(false);
                skeleton.triggerDamage(34);
            });

        this.scene.physics.moveToObject(bullet, pointer, 100);
    }
}

class Blink
{
    constructor({scene})
    {
        this.scene = scene;
        this.spellKey = 'blink';
        this.bullets = this.scene.physics.add.group({
            defaultKey: this.spellKey,
            maxSize: 1
        });
    }

    act(pointer)
    {
        this.scene.magic_sound[this.spellKey].play();
        let bullet = this.bullets.get(this.scene.player.x, this.scene.player.y);
        bullet.setScale(0.01);
        bullet.setActive(true);
        bullet.setVisible(true);
        this.scene.physics.add.collider(bullet, this.scene.player,
            function(bullet, wall) {
                bullet.destroy(false);
                bullet.setVisible(false);
            });

        this.scene.physics.moveToObject(bullet, pointer, 500);
        this.scene.physics.moveToObject(bullet, pointer, 500);
        this.scene.player.x = pointer.x;
        this.scene.player.y = pointer.y;

    }
}


export default Magic;
