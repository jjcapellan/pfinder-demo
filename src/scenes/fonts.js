import Phaser from 'phaser';
import BMFFactory from 'phaser3-bitmapfont-factory';

export default class Fonts extends Phaser.Scene {
    constructor() {
        super('fonts');
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        window.centerX = centerX;
        window.centerY = centerY;

        this.loadedWF = false;

        this.progressTxt = this.add.text(centerX, centerY, 'Progress', { color: '#555568' }).setOrigin(0.5);

        this.generateBitmapFonts();

    }

    generateBitmapFonts() {

        const chars = ' NPCs=0123456789 ';

        const onComplete = () => {
            this.scene.start('load');
        };

        const options = {
            onProgress: (p) => { this.progressTxt.setText(Math.ceil(p * 100) + "%"); }
        };

        const bmff = new BMFFactory(this, onComplete, options);
        bmff.make('font', bmff.defaultFonts.sansSerif, chars, { fontSize: '48px', color: '#ff0000' }, true);

        bmff.exec();
    }
}