import Phaser from 'phaser';
import * as pf from 'pfinder';
import { Walker } from '../prefabs/walker.js';
import { Npc } from '../prefabs/npc.js';
import { TILESIZE, SPEED, MIN_SPEED, MAX_SPEED } from '../constants.js';


export default class Main extends Phaser.Scene {
    constructor() {
        super('main');
    }

    create() {
        const grid = pf.makeGrid(window.rawmap);
        window.rawmap = null;

        this.existsWalker = false;
        let walker;
        this.npcs = [];


        // Textures
        this.add.image(0, 0, 'maptexture').setOrigin(0, 0);
        this.add.image(0, this.game.config.height, 'backtexture')
            .setDisplaySize(160, 60)
            .setOrigin(0, 1);
        this.add.bitmapText(0, this.game.config.height - 36, 'font', `MAP${grid[0].length}x${grid.length}`, 24)
            .setOrigin(0, 1);
        this.npcText = this.add.bitmapText(0, this.game.config.height, 'font', 'NPCs = 0', 24)
            .setOrigin(0, 1);


        // Mouse setup
        this.input.mouse.disableContextMenu();
        this.input.on('pointerdown', (pointer) => {
            pointer.event.preventDefault();
            let x0 = Math.floor(pointer.worldX / TILESIZE);
            let y0 = Math.floor(pointer.worldY / TILESIZE);
            let x = (x0 + 0.5) * TILESIZE;
            let y = (y0 + 0.5) * TILESIZE;

            if (!grid[y0][x0]) {
                return;
            }

            const rb = pointer.rightButtonDown();

            if (!this.existsWalker && !rb) {
                walker = this.add.existing(new Walker(this, x, y, grid, TILESIZE, SPEED));
                this.existsWalker = true;
                return;
            }

            if (!rb) {
                walker.pathTo(x, y);
                return;
            }

            for (let i = 0; i < 4; i++) {
                let npc = this.add.existing(new Npc(this, x, y, grid, TILESIZE, Phaser.Math.Between(MIN_SPEED, MAX_SPEED)));
                this.npcs.push(npc);
            }
            this.npcText.setText('NPCs = ' + this.npcs.length);

        });
    }

    update() {
        this.npcs.forEach(npc => npc.check());
    }
}