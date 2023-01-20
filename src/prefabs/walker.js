import Phaser from 'phaser';
import * as pf from 'pfinder';

export default class Walker extends Phaser.GameObjects.PathFollower {
    constructor(scene, x, y, grid, tileSize, speed) {
        let p = new Phaser.Curves.Path(x, y).lineTo(x, y);
        super(scene, p, x, y, 'walkertexture');

        this.tileSize = tileSize;
        this.grid = grid;
        this.pathLength = 0;
        this.speed = speed;
    }

    pathTo(x, y) {
        let x0 = this.getCell(this.x);
        let y0 = this.getCell(this.y);
        let x1 = this.getCell(x);
        let y1 = this.getCell(y);
        this.x = this.getPoint(x0);
        this.y = this.getPoint(y0);
        let p = this.generatePath(x0, y0, x1, y1);
        if(!p)return;
        this.setPath(p);
        if (this.path) {
            this.startFollow(this.speed * this.pathLength);
        }
    }    

    generatePath(x0, y0, x1, y1) {

        // points = [{x: x0, y: y0}, ... , {x: x1, y:y 1}]
        let points = pf.getPath(this.grid, x0, y0, x1, y1);
        if(!points){
            return null;
        }

        let path = new Phaser.Curves.Path(this.tileSize * (points[0].x + 0.5), this.tileSize * (points[0].y + 0.5));

        for (let i = 1; i < points.length; i++) {
            let point = points[i];
            path.lineTo(this.tileSize * (point.x + 0.5), this.tileSize * (point.y + 0.5));
        }

        this.pathLength = points.length;

        return path;
    }

    getCell(pointIndex) {
        return Math.floor(pointIndex / this.tileSize);
    }

    getPoint(cellIndex) {
        return (cellIndex + 0.5) * this.tileSize;
    }
}

export { Walker };