import Phaser from 'phaser';
import * as pf from 'pfinder';
import { Walker } from '../prefabs/walker.js';
import { Npc } from '../prefabs/npc.js';


export default class Main extends Phaser.Scene {
    constructor() {
        super('main');
    }

    create() {
        this.existsWalker = false;
        let walker;
        this.npcs = [];


        this.add.image(0, 0, 'maptexture').setOrigin(0, 0);
        console.log(this.textures.exists('maptexture'));
        const grid = pf.makeGrid(window.rawmap, true);
        const tileSize = 8;
        const speed = 100; // milliseconds per cell
        window.rawmap = null;

        this.cameras.main.setBounds(0, 0, 500 * 8, 500 * 8);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.npcText = this.add.bitmapText(650, 550, 'font', 'NPCs = 0', 38)
            .setOrigin(0.5).setScrollFactor(0);


        this.input.mouse.disableContextMenu();
        this.input.on('pointerdown', (pointer) => {
            pointer.event.preventDefault();
            let x0 = Math.floor(pointer.worldX / tileSize);
            let y0 = Math.floor(pointer.worldY / tileSize);
            let x = (x0 + 0.5) * tileSize;
            let y = (y0 + 0.5) * tileSize;

            if (grid[y0][x0].isWall) {
                return;
            }

            const rb = pointer.rightButtonDown();

            if (!this.existsWalker && !rb) {
                walker = this.add.existing(new Walker(this, x, y, grid, tileSize, speed));
                this.existsWalker = true;
                return;
            }

            if (!rb) {
                walker.pathTo(x, y);
                return;
            }

            let npc = this.add.existing(new Npc(this, x, y, grid, tileSize, Phaser.Math.Between(50, 300)));
            npc.pathTo(x + 200, y + 200);
            this.npcs.push(npc);
            this.npcText.setText('NPCs = ' + this.npcs.length);

        });
    }

    update() {
        let cam = this.cameras.main;

        if (this.cursors.left.isDown) {
            cam.scrollX -= 10;
        }
        else if (this.cursors.right.isDown) {
            cam.scrollX += 10;
        }

        if (this.cursors.up.isDown) {
            cam.scrollY -= 10;
        }
        else if (this.cursors.down.isDown) {
            cam.scrollY += 10;
        }

        this.npcs.forEach(npc => npc.check());


    }
}