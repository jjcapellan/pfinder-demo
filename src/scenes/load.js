import Phaser from 'phaser';

let count = 0;

export default class Load extends Phaser.Scene {
    constructor() {
        super('load');
    }

    preload() {

        const items = 3;
        const tileSize = 8;
        /*const mapWidth = Math.floor(this.game.config.width / tileSize);
        const mapHeight = Math.floor(this.game.config.height / tileSize);
        console.log(mapWidth, mapHeight);*/

        this.textures.on('addtexture', () => {
            count++;
            console.log(count);
            if (count == items) this.scene.start('main');            
        });
        this.generateMap(50, 50);
        //count++;
        this.generateRectTexture(tileSize / 2, tileSize / 2, 'walkertexture', 0xdd1111); // player
        //count++;
        this.generateRectTexture(tileSize / 2, tileSize / 2, 'npctexture', 0x11dd11); // npc
        //count++;
        

    }

    generateMap(width, height) {
        const map = [];
        const tileSize = 8;
        for (let y = 0; y < height; y++) {
            let row = new Array(width).fill(0);
            row.forEach((_, x) => {
                row[x] = Math.random() > 0.7 ? 1 : 0;
            });
            map.push(row);
        }
        //console.log(map[0].length, map.length);

        let graphics = this.add.graphics();
        graphics.fillStyle(0x555568, 1);
        for (let y = 0; y < height; y++) {
            let row = map[y];
            row.forEach((_, x) => {
                if (row[x]) graphics.fillRect(tileSize * x, tileSize * y, tileSize, tileSize);
            });
        }
        graphics.generateTexture('maptexture', width * tileSize, height * tileSize);
        window.rawmap = map;
        //console.log(map);

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