import Phaser from 'phaser';
import { Walker } from './walker.js';

class Npc extends Walker {
    constructor(scene, x, y, grid, tileSize, speed) {
        super(scene, x, y, grid, tileSize, speed);
        this.setTexture('npctexture');
        // End point of previus path
        this.prev = {};
    }

    check() {
        if (!this.isFollowing()) {
            let x1 = Phaser.Math.Between(1, this.grid[0].length - 2);
            let y1 = Phaser.Math.Between(1, this.grid.length - 2);
            this.pathTo(x1, y1);
        }
    }

    pathTo(x1, y1) {
        this.x = this.prev.x || this.x;
        this.y = this.prev.y || this.y;
        let x0 = this.getCell(this.x);
        let y0 = this.getCell(this.y);
        let p = this.generatePath(x0, y0, x1, y1);
        if(!p)return;
        this.setPath(p);
        if (this.path) {
            this.prev = this.path.getEndPoint();
            this.startFollow(this.speed * this.pathLength);
        }
    } 
}

export { Npc };