import Phaser from 'phaser';
import * as pf from 'pfinder';
import { TILESIZE, SPEED, MIN_SPEED, MAX_SPEED } from '../constants.js';
import { map137x76 } from '../prefabs/map.js';
import Walker from '../prefabs/walker.js';
import Npc from '../prefabs/npc.js';



export default class Main extends Phaser.Scene {
    constructor() {
        super('main');
    }

    create() {
        // makeGrid converts 2d array of 0s and 1s to one used by the pathfinding algorithm
        this.grid = pf.makeGrid(map137x76);
        const grid = this.grid;

        let targetFps = 0;

        // Player
        this.existsWalker = false;
        let walker;

        // Npcs
        this.npcs = [];
        const spawnPoints = [68, 32, 23, 40, 32, 54, 106, 50, 100, 27, 112, 5, 51, 8, 12, 12, 11, 46, 117, 57];
        let spwIdx = 0;

        // Map texture
        this.add.image(0, 0, 'maptexture').setOrigin(0, 0);

        // Info display
        this.npcText = this.add.bitmapText((68 + 0.5) * TILESIZE, (36 + 0.5) * TILESIZE, 'font', '0', 20)
            .setOrigin(0.5);


        this.blitter = this.add.blitter(0, 0, 'npctexture');


        if (!window.benchmark) {
            // Mouse input setup
            this.input.mouse.disableContextMenu();
            this.input.on('pointerdown', (pointer) => {
                pointer.event.preventDefault();

                // Grid cell coordinates
                let x0 = Math.floor(pointer.worldX / TILESIZE);
                let y0 = Math.floor(pointer.worldY / TILESIZE);

                // If grid cell is a wall ...
                if (!grid[y0][x0]) {
                    return;
                }
                console.log(x0, y0);

                const rb = pointer.rightButtonDown();

                if (!this.existsWalker && !rb) {
                    walker = this.add.existing(
                        // Custom Phaser.GameObjects.PathFollower
                        new Walker(this, x0, y0, grid, TILESIZE, SPEED));
                    this.existsWalker = true;
                    return;
                }

                if (!rb) {
                    walker.pathTo(x0, y0);
                    return;
                }

                this.spawnNPCs(x0, y0, 50);
                this.npcText.setText(this.npcs.length);

            });
        }

        if (window.benchmark) {
            // Timer events
            this.time.addEvent({ delay: 1000, callback: () => { targetFps = Math.floor(this.game.loop.actualFps); } });
            this.time.addEvent(
                {
                    startAt: 1100,
                    delay: 250,
                    loop: true,
                    callback: () => {

                        if (this.game.loop.actualFps < targetFps - 2) {
                            window.resultStr = `MAP${grid[0].length}x${grid.length}  |  ${this.npcs.length} NPCs`;
                            this.scene.start('result');
                        }

                        this.spawnNPCs(spawnPoints[spwIdx], spawnPoints[spwIdx + 1], 100);
                        spwIdx += 2;
                        if (spwIdx >= spawnPoints.length) spwIdx = 0;
                        this.npcText.setText(this.npcs.length);
                    }
                }
            );
        }
    }

    spawnNPCs(x0, y0, n) {
        for (let i = 0; i < n; i++) {
            let speed = Phaser.Math.FloatBetween(MAX_SPEED, MIN_SPEED);
            let npc = this.add.existing(
                // Custom Phaser.GameObjects.Bob
                new Npc(this.blitter, x0, y0, speed, this.grid, TILESIZE));
            this.npcs.push(npc);

            // blitter object manages rendering of Bob objects
            this.blitter.children.addAt(npc, this.blitter.children.length, false);
            this.blitter.dirty = true;
        }
    }

    update(_, dt) {
        this.npcs.forEach(npc => npc.update(dt));
    }
}