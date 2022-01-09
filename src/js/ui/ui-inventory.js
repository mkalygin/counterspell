import Phaser from 'phaser';
import { Size, InventoryCellType, Character } from 'js/const';

class UiInventory extends Phaser.GameObjects.Container {
  constructor({
    scene,
    x,
    y,
    size = Size.TileSize,
    items = [],
  }) {
    super(scene, x, y);

    this.items = items.slice(0, Character.InventorySize);
    this.cells = this.items
      .concat(Array.from({ length: Character.InventorySize - this.items.length }))
      .map((item, index) => {
        const type = InventoryCellType[item] || InventoryCellType.Empty;
        const cell = this.scene.add.sprite(size * index, 0, 'hud', type);

        cell.setDisplaySize(size, size);
        cell.setOrigin(0, 0);
        cell.setScrollFactor(0);

        this.add(cell);

        return cell;
      });
  }
}

export default UiInventory;
