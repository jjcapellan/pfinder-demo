import Phaser from 'phaser';
import Fonts from "./scenes/fonts.js";
import Load from "./scenes/load.js";
import Main from "./scenes/main.js";
import Menu from "./scenes/menu.js";
import { TILESIZE } from './constants.js';

function runGame() {
    let width = Math.floor((window.innerWidth - 20) - (window.innerWidth - 20) % TILESIZE);
    let height = Math.floor((window.innerHeight - 20) - (window.innerHeight - 20) % TILESIZE);

    var config = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        parent: 'game',
        backgroundColor: 0xe9efec,
        scale: {
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        roundPixels: true,
        scene: [Fonts, Load, Menu, Main]
    };

    new Phaser.Game(config);
}

window.onload = function () {
    runGame();
};