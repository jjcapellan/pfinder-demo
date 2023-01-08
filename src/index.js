import Phaser from 'phaser';
import Fonts from "./scenes/fonts.js";
import Load from "./scenes/load.js";
import Main from "./scenes/main.js";

function runGame() {
    //let width = Math.floor((window.innerWidth - 20) - (window.innerWidth - 20) % 8);
    //let height = Math.floor((window.innerHeight - 20) - (window.innerHeight - 20) % 8);

    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game',
        backgroundColor: 0xe9efec,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        roundPixels: true,
        scene: [Fonts, Load, Main]
    };

    new Phaser.Game(config);
}

window.onload = function () {
    runGame();
};