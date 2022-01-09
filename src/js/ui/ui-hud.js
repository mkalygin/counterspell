import Phaser from 'phaser';
import { UiBar, UiInventory } from 'js/ui';
import { Size, Depth, BarType } from 'js/const';

class UiHud extends Phaser.GameObjects.Container {
  constructor({ scene, hp, totalHp, mp, totalMp }) {
    super(scene, 0, 0);

    this.hp = hp;
    this.totalHp = totalHp;
    this.mp = mp;
    this.totalMp = totalMp;

    this.hpBar = new UiBar({
      scene,
      x: 10,
      y: 10,
      width: 200,
      height: 25,
      type: BarType.Green,
      text: `${this.hp}/${this.totalHp}`,
      percent: this.hp / this.totalHp * 100,
    });

    this.mpBar = new UiBar({
      scene,
      x: 10,
      y: 35,
      width: 200,
      height: 25,
      type: BarType.Blue,
      text: `${this.mp}/${this.totalMp}`,
      percent: this.mp / this.totalMp * 100,
    });

    this.inventory = new UiInventory({
      scene,
      x: 10,
      y: Size.ScreenHeight - 50,
      size: 40,
    });

    this.add(this.hpBar);
    this.add(this.mpBar);
    this.add(this.inventory);
    this.setDepth(Depth.Hud);
  }

  setHp(hp) {
    this.hp = hp;

    this.hpBar.setPercent(this.hp / this.totalHp * 100);
    this.hpBar.setText(`${this.hp}/${this.totalHp}`);
  }

  setMp(mp) {
    this.mp = mp;

    this.mpBar.setPercent(this.mp / this.totalMp * 100);
    this.mpBar.setText(`${this.mp}/${this.totalMp}`);
  }
}

export default UiHud;
