import Phaser from 'phaser';
import { PreloaderScene, MenuScene, MainScene } from './scenes';
import { Size } from './const';

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    backgroundColor: 0x000000,
    scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: Size.ScreenWidth,
        height: Size.ScreenHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [PreloaderScene, MenuScene, MainScene],
};

export default new Phaser.Game(config);
