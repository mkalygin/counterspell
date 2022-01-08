import Phaser from 'phaser';
import { PreloaderScene, MenuScene, MainScene } from './scenes';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './const';

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    backgroundColor: 0x000000,
    scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
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
