import Phaser from 'phaser';
import { TILESIZE, COLOR_BACKGROUND, COLOR_FOREGROUND, COLOR_NPC, COLOR_PLAYER } from '../constants.js';
import { map137x76 } from '../prefabs/map.js';

let count = 0;

export default class Load extends Phaser.Scene {
    constructor() {
        super('load');
    }

    preload() {

        const items = 3;

        this.textures.on('addtexture', () => {
            count++;
            if (count == items) this.scene.start('menu');
        });

        this.generateMap();
        this.generateRectTexture(TILESIZE / 2, TILESIZE / 2, 'walkertexture', COLOR_PLAYER); // player
        this.generateRectTexture(TILESIZE / 2, TILESIZE / 2, 'npctexture', COLOR_NPC); // npc
        this.generateRectTexture(4, 4, 'backtexture', COLOR_BACKGROUND); // text background

    }

    generateMap() {
        const map = map137x76;

        for (let i = 35; i <= 37; i++) {
            let row = map[i];
            for (let j = 63; j <= 73; j++) {
                row[j] = 1;
            }
        }

        let graphics = this.add.graphics();
        graphics.fillStyle(COLOR_FOREGROUND, 1);
        for (let y = 0; y < map.length; y++) {
            let row = map[y];
            row.forEach((_, x) => {
                if (row[x]) graphics.fillRect(TILESIZE * x, TILESIZE * y, TILESIZE, TILESIZE);
            });
        }
        graphics.generateTexture('maptexture', map[0].length * TILESIZE, map.length * TILESIZE);

    }

    generateRectTexture(width, height, key, color) {
        let graphics = this.add.graphics();
        graphics.fillStyle(color, 1);
        graphics.fillRect(0, 0, width, height);
        graphics.generateTexture(key, width, height);
    }

    updateText(progress) {
        this.text_loading.text = `Loading ... ${Math.round(progress * 100)}%`;
    }
}