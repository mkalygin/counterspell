import Phaser from 'phaser';
import { PreloaderScene, MainScene } from './scenes';

const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [PreloaderScene, MainScene],
};

export default new Phaser.Game(config);
