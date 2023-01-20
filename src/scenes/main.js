import Phaser from 'phaser';
import * as pf from 'pfinder';
import { TILESIZE, SPEED, MIN_SPEED, MAX_SPEED } from '../constants.js';
import Walker from '../prefabs/walker.js';
import Npc from '../prefabs/npc.js';


export default class Main extends Phaser.Scene {
    constructor() {
        super('main');
    }

    create() {
        // makeGrid converts 2d array of 0s and 1s to one used by the pathfinding algorithm
        const grid = pf.makeGrid(window.rawmap);
        window.rawmap = null;

        // Player
        this.existsWalker = false;
        let walker;

        // Npcs
        this.npcs = [];

        // Images and text
        this.add.image(0, 0, 'maptexture').setOrigin(0, 0);
        this.add.image(0, this.game.config.height, 'backtexture')
            .setDisplaySize(160, 60)
            .setOrigin(0, 1);
        this.add.bitmapText(0, this.game.config.height - 36, 'font', `MAP${grid[0].length}x${grid.length}`, 24)
            .setOrigin(0, 1);
        this.npcText = this.add.bitmapText(0, this.game.config.height, 'font', 'NPCs = 0', 24)
            .setOrigin(0, 1);

        
        let blitter = this.add.blitter(0, 0, 'npctexture');


        // Mouse input setup
        this.input.mouse.disableContextMenu();        
        this.input.on('pointerdown', (pointer) => {
            pointer.event.preventDefault();

            // Grid cell coordinates
            let x0 = Math.floor(pointer.worldX / TILESIZE);
            let y0 = Math.floor(pointer.worldY / TILESIZE);

            // Player coordinates (snaps raw (x,y) to cell grid center)
            let x = (x0 + 0.5) * TILESIZE;
            let y = (y0 + 0.5) * TILESIZE;

            // If grid cell is a wall ...
            if (!grid[y0][x0]) {
                return;
            }

            const rb = pointer.rightButtonDown();

            if (!this.existsWalker && !rb) {
                walker = this.add.existing(
                    // Custom Phaser.GameObjects.PathFollower
                    new Walker(this, x, y, grid, TILESIZE, SPEED));
                this.existsWalker = true;
                return;
            }

            if (!rb) {
                walker.pathTo(x, y);
                return;
            }

            for (let i = 0; i < 50; i++) {
                let speed = Phaser.Math.FloatBetween(MAX_SPEED, MIN_SPEED);
                let npc = this.add.existing(
                    // Custom Phaser.GameObjects.Bob
                    new Npc( blitter, x0, y0, speed, grid, TILESIZE));
                this.npcs.push(npc);

                // blitter object manages rendering of Bob objects
                blitter.children.addAt(npc, blitter.children.length, false);
                blitter.dirty = true;
            }
            this.npcText.setText('NPCs = ' + this.npcs.length);

        });
    }

    update(_, dt) {
        this.npcs.forEach(npc => npc.update(dt));
    }
}