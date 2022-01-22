import Phaser from 'phaser';
import { Size, BarType, InventoryCellType, Character, SpellPoolCellType } from 'js/const';

class UiSpellPool extends Phaser.GameObjects.Container {
    constructor({
                    scene,
                    x,
                    y,
                    size = Size.TileSize,
                }) {
        super(scene, x, y);

        this.cells = [];
        for (let i = 0; i < 3; i++) {
            const cell = this.scene.add.sprite(size * i, 0, 'aux_tiles', SpellPoolCellType['empty']);
            cell.setDisplaySize(size, size);
            cell.setOrigin(0, 0);
            cell.setScrollFactor(0);
            this.cells.push(cell);
        }
        this.add(this.cells);
    }
}

export default UiSpellPool;
