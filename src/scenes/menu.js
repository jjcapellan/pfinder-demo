import Phaser from 'phaser';


export default class Menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    create() {
        const cx = this.game.config.width / 2;
        const h = this.game.config.height;
        const margin = 18;
        let github = false;

        this.add.bitmapText(cx, margin, 'font', 'Demo Pfinder v0.7.0', 20)
            .setOrigin(0.5, 0);

        this.add.bitmapText(cx, h / 5, 'font', '-- INSTRUCTIONS --', 28)
            .setOrigin(0.5, 0);
        this.add.bitmapText(cx, h / 5 + margin + 28, 'font', 'Press left mouse button to spawn and control player (red square)', 24)
            .setOrigin(0.5, 0);
        this.add.bitmapText(cx, h / 5 + 2 * (margin + 28), 'font', 'Press right mouse button to spawn NPCs (green squares)', 24)
            .setOrigin(0.5, 0);
        this.add.bitmapText(cx, h / 5 + 4 * (margin + 28), 'font', 'CLICK TO START', 24)
            .setOrigin(0.5, 0);

        this.add.bitmapText(cx, h - (margin + 28), 'link', 'github', 24)
            .setOrigin(0.5, 0)
            .setInteractive()
            .on('pointerdown', () => {
                github = true;
                window.location = 'https://github.com/jjcapellan/pfinder#readme';
            });

        this.input.on('pointerup', () => {
            if(github) return;
            this.scene.start('main');
        });
    }
}