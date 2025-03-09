import { fabric } from 'fabric'
import { Pointer } from './types'

export class View {

   isEnabled = false
   isMouseDown = false
   viewLine: fabric.Polygon | null = null

   endPointer: Pointer | null = null
   linePointer: Array<Pointer> = []

   commit: (linePointer: Array<Pointer>) => void
  constructor(private canvas: fabric.Canvas, commit: (linePointer: Array<Pointer>) => void) {
    this.canvas = canvas
    this.commit = commit
    this.bindEvent()
  }

  bindEvent() {
    this.canvas.on('mouse:down', this.mouseDown.bind(this))
    this.canvas.on('mouse:move', this.mouseMove.bind(this))
    this.canvas.on('mouse:up', this.mouseUp.bind(this))
  }

  reset = () => {
    this.linePointer = []
    this.endPointer = null
  }
  

  mouseDown(e: fabric.IEvent) {
    console.log('mouseDown', this.isEnabled)
    if (!this.isEnabled) return
    this.isMouseDown = true
    this.linePointer.push(this.canvas.getPointer(e.e))
    this.render()
  }

  mouseMove(e: fabric.IEvent) {
    this.endPointer = this.canvas.getPointer(e.e)
    if (this.isEnabled) {
      this.render()
    }
    if (!this.isMouseDown) return
    // 只有当鼠标移动一定距离后才添加新的点
    const currentPoint = this.canvas.getPointer(e.e);
    const lastPoint = this.linePointer[this.linePointer.length - 1];
    const distance = Math.sqrt(
      Math.pow(currentPoint.x - lastPoint.x, 2) + 
      Math.pow(currentPoint.y - lastPoint.y, 2)
    );
    
    // 设置最小距离阈值，只有超过这个距离才添加新点
    if (distance > 5) {
      this.linePointer.push(currentPoint);
    }
  }

  mouseUp() {
    this.isMouseDown = false
  }

  remove() {
    if (this.viewLine) {
      this.canvas.remove(this.viewLine)
    }
  }

  render() {
    if (!this.endPointer) return
    if (this.viewLine) {
      this.canvas.remove(this.viewLine)
    }
    this.viewLine = new fabric.Polygon([...this.linePointer, this.endPointer], {
      stroke: 'red',
      strokeWidth: 2,
      selectable: false,
      fill: 'transparent',
    })
    this.canvas.add(this.viewLine)
  }


  commitLine() {
    this.commit(this.linePointer)
  }

  unbindEvent() {
    this.canvas.off('mouse:down', this.mouseDown.bind(this))
    this.canvas.off('mouse:move', this.mouseMove.bind(this))
    this.canvas.off('mouse:up', this.mouseUp.bind(this))
  }

  destroy() {
    this.unbindEvent()
    this.viewLine = null
    this.endPointer = null
  }
}

