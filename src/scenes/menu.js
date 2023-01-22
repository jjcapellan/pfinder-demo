import Phaser from 'phaser';


export default class Menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    create() {
        const container = document.getElementById('box');

        document.getElementById('left-box').addEventListener('click', () => {
            window.benchmark = true;
            container.style.display = 'none';
            this.scene.start('main');
        });
        document.getElementById('right-box').addEventListener('click', () => {
            window.benchmark = false;
            container.style.display = 'none';
            this.scene.start('main');
        });
    }
}