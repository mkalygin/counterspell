import Phaser from 'phaser';
import { SpellKeyIdx, SpellPoolCellType } from 'js/const';
import { Magic } from 'js/sprites';

class PriestSprite extends Phaser.GameObjects.Sprite {
  constructor({ key, scene, collider, x, y }) {
    super(scene, x, y, key);

    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    this.scene.physics.add.collider(this, collider);

    this.setTexture('player', 'priest.0');

    this.speed = 150;

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.cursorsAlt = this.scene.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S, 'left': Phaser.Input.Keyboard.KeyCodes.A, 'right': Phaser.Input.Keyboard.KeyCodes.D });
    this.spellKeys = this.scene.input.keyboard.addKeys(
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

    this.spellBook = {
      "midodo": "fireball",
      "doremifa": "blink"
    };

    this.magic = new Magic({
          key: 'magic',
          scene: this.scene,
          x: 0,
          y: 0,
      });

    this.activeSpells = [];
    this.currentUndoneSpell = "";
  }

  update(time, delta, hud) {
    this.anims.play('priest-idle', true);
    this.updateHeroPosition();
    this.updateHeroSpellCastingEvents(hud);
    this.updateHeroSpellReleasingEvents(hud);
  }

  updateHeroPosition() {
      this.body.setVelocity(0);
      if (this.cursors.left.isDown || this.cursorsAlt['left'].isDown) {
          this.body.setVelocityX(-this.speed);
      } else if (this.cursors.right.isDown || this.cursorsAlt['right'].isDown) {
          this.body.setVelocityX(this.speed);
      } else if (this.cursors.up.isDown || this.cursorsAlt['up'].isDown) {
          this.body.setVelocityY(-this.speed);
      } else if (this.cursors.down.isDown || this.cursorsAlt['down'].isDown) {
          this.body.setVelocityY(this.speed);
      }
      this.body.velocity.normalize().scale(this.speed);
  }

  updateHeroSpellCastingEvents(hud) {
      for (const spellNota in this.spellKeys) {
          if (Phaser.Input.Keyboard.JustDown(this.spellKeys[spellNota])) {
              if (spellNota == 'space') {
                  this.currentSpell = "";
                  return;
              }

              let idx = SpellKeyIdx[spellNota];
              hud.speller.cells[idx].setTintFill(0xDE3163);
              this.currentSpell += spellNota;

              if (this.spellBook.hasOwnProperty(this.currentSpell) && this.activeSpells.length < 3) {
                  let spellName = this.spellBook[this.currentSpell];
                  this.magic.activateSpell(spellName);
                  hud.spellpool.cells[this.activeSpells.length].setFrame(SpellPoolCellType[spellName]);
                  this.activeSpells.push(spellName);
                  this.currentSpell = "";
              }
          }
          if (this.spellKeys[spellNota].isUp && spellNota != "space") {
              let idx = SpellKeyIdx[spellNota];
              hud.speller.cells[idx].setTintFill(0x40E0D0);
          }
      }
  }

  updateHeroSpellReleasingEvents(hud) {
      if (this.scene.input.activePointer.isDown)
      {
          this.waitmouseup = true;
      } else if (!this.scene.input.activePointer.isDown && this.waitmouseup) {
          if (this.magic.activeSpell) {
              this.magic.activeSpell.act(this.scene.input.activePointer);
              this.magic.deactivateSpell();
              //remove from hud
              this.activeSpells.pop();
              hud.spellpool.cells[this.activeSpells.length].setFrame(SpellPoolCellType['empty']);
              if (this.activeSpells.length > 0) this.magic.activateSpell(this.activeSpells[this.activeSpells.length - 1]);
          }
          this.waitmouseup = false;
      }
  }
}

export default PriestSprite;
