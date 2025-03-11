import { fabric } from 'fabric'
export class Receiver {
    points: fabric.Point[][] = [];
  
    beginPath() {
      this.points.push([])
    }
  
    moveTo(x: number, y: number) {
      this.points[this.points.length - 1].push(new fabric.Point(x, y))
    }
  
    lineTo(x: number, y: number) {
      this.points[this.points.length - 1].push(new fabric.Point(x, y))
    }
  
    bezierCurveTo(
      cp1x: number,
      cp1y: number,
      cp2x: number,
      cp2y: number,
      x: number,
      y: number,
    ) {
      this.points[this.points.length - 1].push(new fabric.Point(x, y))
    }
  
    closePath() {
      const currentPath = this.points[this.points.length - 1];
      if (currentPath.length > 0) {
        currentPath.push(currentPath[0]);
      }
    }
  
    done() {
      return this.points;
    }
  }