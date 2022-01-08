import Phaser from 'phaser';
import { PreloaderScene, MainScene } from './scenes';

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    backgroundColor: 0x000000,
    scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1024,
        height: 768,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [PreloaderScene, MainScene],
};

export default new Phaser.Game(config);
