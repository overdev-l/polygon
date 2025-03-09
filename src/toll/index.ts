import { fabric } from "fabric"
export class Tool {
  constructor(private canvas: fabric.Canvas) {
    this.canvas = canvas
  }


  init = () => {
    const Polygon = new fabric.Polygon([
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ], {
      stroke: 'red',
      strokeWidth: 2,
      selectable: false,
      fill: '',
    })
    this.canvas.add(Polygon)
  }
  
}
