import Phaser from 'phaser';
import { Walker } from './walker.js';

class Npc extends Walker {
    constructor(scene, x, y, grid, tileSize, speed) {
        super(scene, x, y, grid, tileSize, speed);
        this.setTexture('npctexture');
    }

    check() {
        if (!this.isFollowing()) {
            let x1 = Phaser.Math.Between(0, this.grid[0].length - 1);
            let y1 = Phaser.Math.Between(0, this.grid.length - 1);
            this.pathTo(x1 * this.tileSize, y1 * this.tileSize);
        }
    }
}

export { Npc };