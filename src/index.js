import Phaser from 'phaser';
import Fonts from './scenes/fonts.js';
import Load from './scenes/load.js';
import Main from './scenes/main.js';
import Menu from './scenes/menu.js';
import Result from './scenes/benchresult.js';
import { map137x76 } from './prefabs/map.js';
import { TILESIZE } from './constants.js';

function runGame() {

    const width = map137x76[0].length * TILESIZE;
    const height = map137x76.length * TILESIZE;

    var config = {
        type: Phaser.AUTO,
        width: width,
        height: height,
        parent: 'game',
        backgroundColor: 0xe9efec,
        roundPixels: true,
        seed: [12345678],
        scene: [Fonts, Load, Menu, Main, Result]
    };

    new Phaser.Game(config);
}

window.onload = function () {
    runGame();
};