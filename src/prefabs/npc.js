import Phaser from 'phaser';
import * as pf from 'pfinder';

export default class Npc extends Phaser.GameObjects.Bob {
    constructor(blitter, x, y, speed, grid, tileSize) {

        super(blitter, (x + 0.25) * tileSize, (y + 0.25) * tileSize, blitter.frame, true);

        this.targetX;
        this.targetY;
        this.speed = speed;
        this.grid = grid;
        this.path = [];
        this.currentNode = 0;
        this.dirX;
        this.dirY;
        this.distX;
        this.distY;
        this.following = false;
        this.tileWidth = tileSize;
    }

    pathTo(x1, y1) {
        if (!this.grid[y1][x1]) return;
        let x0 = this.pointToCell(this.x);
        let y0 = this.pointToCell(this.y);
        let p = pf.getPath(this.grid, x0, y0, x1, y1);
        if (!p || p.length == 1) return;
        this.path = p;

        this.newSection();

        this.following = true;
    }

    cellToPoint(cell) {
        return (cell + 0.25) * this.tileWidth;
    }

    pointToCell(point) {
        return Math.floor(point / this.tileWidth);
    }

    newSection() {
        if (this.path.length <= this.currentNode + 1) {
            this.currentNode = 0;
            this.following = false;
            return;
        }

        this.targetX = this.cellToPoint(this.path[this.currentNode + 1].x);
        this.targetY = this.cellToPoint(this.path[this.currentNode + 1].y);
        this.distX = Math.abs(this.targetX - this.x);
        this.distY = Math.abs(this.targetY - this.y);
        this.dirX = Math.sign(this.targetX - this.x);
        this.dirY = Math.sign(this.targetY - this.y);
    }

    update(dt) {
        if (this.following) {
            let dx = this.dirX * this.speed * dt;
            let dy = this.dirY * this.speed * dt;
            this.distX -= Math.abs(dx);
            this.distY -= Math.abs(dy);
            if (this.distX < 0 || this.distY < 0) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.currentNode++;
                this.newSection();
                return;
            }
            this.x += dx;
            this.y += dy;
            return;
        }

        let x1 = Phaser.Math.RND.between(0, this.grid[0].length - 1);
        let y1 = Phaser.Math.RND.between(0, this.grid.length - 1);
        this.pathTo(x1, y1);
    }
}