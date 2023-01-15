import Phaser from 'phaser';
import { TILESIZE } from '../constants.js';

let count = 0;

export default class Load extends Phaser.Scene {
    constructor() {
        super('load');
    }

    preload() {

        const items = 3;
        const mapWidth = Math.floor(this.game.config.width / TILESIZE);
        const mapHeight = Math.floor(this.game.config.height / TILESIZE);

        this.textures.on('addtexture', () => {
            count++;
            if (count == items) this.scene.start('menu');
        });
        this.generateMap(mapWidth, mapHeight);
        this.generateRectTexture(TILESIZE / 2, TILESIZE / 2, 'walkertexture', 0xdd1111); // player
        this.generateRectTexture(TILESIZE / 2, TILESIZE / 2, 'npctexture', 0x11dd11); // npc
        this.generateRectTexture(4, 4, 'backtexture', 0xe9efec); // text background

    }

    generateMap(width, height) {
        const map = [];
        for (let y = 0; y < height; y++) {
            let row = new Array(width).fill(0);
            row.forEach((_, x) => {
                row[x] = Math.random() > 0.7 ? 1 : 0;
            });
            map.push(row);
        }

        let graphics = this.add.graphics();
        graphics.fillStyle(0x555568, 1);
        for (let y = 0; y < height; y++) {
            let row = map[y];
            row.forEach((_, x) => {
                if (row[x]) graphics.fillRect(TILESIZE * x, TILESIZE * y, TILESIZE, TILESIZE);
            });
        }
        graphics.generateTexture('maptexture', width * TILESIZE, height * TILESIZE);
        window.rawmap = map;

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