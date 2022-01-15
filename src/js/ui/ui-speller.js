import Phaser from 'phaser';
import { Size, BarType, InventoryCellType, Character } from 'js/const';

class UiSpeller extends Phaser.GameObjects.Container {
    constructor({
                    scene,
                    x,
                    y,
                    size = Size.TileSize,
                }) {
        super(scene, x, y);

        this.cells = [];
        for (let i = 0; i < 7; i++) {
            const cell = this.scene.add.sprite(size * i, 0, 'hud', 29);
            cell.setDisplaySize(size, 1.5 * size);
            cell.setOrigin(0, 0);
            cell.setScrollFactor(0);
            this.cells.push(cell);
        }
        this.add(this.cells);
    }
}

export default UiSpeller;
