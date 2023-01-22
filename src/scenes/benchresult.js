import Phaser from 'phaser';

export default class Result extends Phaser.Scene {
    constructor() {
        super('result');
    }

    create() {
        const margin = 18;
        this.add.text(window.centerX, window.centerY - 5 * margin, '-- BENCHMARK RESULT --', { fontFamily: 'Arial', fontSize: 24, color: '#555568' })
            .setOrigin(0.5);
        this.add.text(window.centerX, window.centerY, window.resultStr, { fontFamily: 'Arial', fontSize: 32, color: '#dd1111' })
            .setOrigin(0.5);

        this.input.on('pointerup', () => {
            document.getElementById('box').style.display = 'flex';
            this.scene.start('menu');
        }
        );
    }
}