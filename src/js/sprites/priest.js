import Phaser from 'phaser';
import { SpellKeyIdx } from 'js/const';

class PriestSprite extends Phaser.GameObjects.Sprite {
  constructor({ key, scene, collider, x, y }) {
    super(scene, x, y, key);

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    this.scene.physics.add.collider(this, collider);

    this.setTexture('player', 'priest.0');

    this.speed = 150;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.spellkeys = this.scene.input.keyboard.addKeys(
        {
          'do': Phaser.Input.Keyboard.KeyCodes.ONE,
          're': Phaser.Input.Keyboard.KeyCodes.TWO,
          'mi': Phaser.Input.Keyboard.KeyCodes.THREE,
          'fa': Phaser.Input.Keyboard.KeyCodes.FOUR,
          'sol': Phaser.Input.Keyboard.KeyCodes.FIVE,
          'la': Phaser.Input.Keyboard.KeyCodes.SIX,
          'si': Phaser.Input.Keyboard.KeyCodes.SEVEN,
          'space': Phaser.Input.Keyboard.KeyCodes.SPACE
        });

    this.spellbook = {
      "midodo": "fireball"
    };

    this.spellcount = 0;

    this.current_spell = "";
  }



  update(time, delta, hud) {
    this.anims.play('priest-idle', true);
    this.updateHeroPosition();
    this.updateHeroSpellCastingEvents(hud);
  }

  updateHeroPosition() {
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

  updateHeroSpellCastingEvents(hud) {
      for (const spell_note in this.spellkeys) {
          if (Phaser.Input.Keyboard.JustDown(this.spellkeys[spell_note])) {
              if (spell_note == 'space') {
                  this.current_spell = "";
              } else {
                  let idx = SpellKeyIdx[spell_note];
                  hud.speller.cells[idx].setTintFill(0xDE3163);
                  this.current_spell += spell_note;
              }
              if (this.spellbook.hasOwnProperty(this.current_spell)) {
                  console.log("spell crafted!");
                  hud.spellpool.cells[this.spellcount].setFrame(51*32 + 1);
                  if (this.spellcount < 2) {this.spellcount++;}
                  this.current_spell = "";
              }
          }
          if ((this.spellkeys[spell_note].isUp) && (spell_note != 'space')) {
              let idx = SpellKeyIdx[spell_note];
              hud.speller.cells[idx].setTintFill(0x40E0D0);
          }
      }
  }

  updateHeroSpellReleasingEvents(hud) {

  }


}

export default PriestSprite;
