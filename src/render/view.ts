import { fabric } from 'fabric'
import { Pointer } from './types'

export class View {

   isEnabled = false
   isMouseDown = false
   viewLine: fabric.Line | null = null

   startPointer: Pointer | null = null
   lastPointer: Pointer | null = null
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
    this.lastPointer = null
    this.startPointer = null
    this.endPointer = null
  }
  

  mouseDown(e: fabric.IEvent) {
    if (!this.isEnabled) return
    this.isMouseDown = true
    if (!this.startPointer) {
        this.startPointer = this.canvas.getPointer(e.e)
    }
    this.linePointer.push(this.canvas.getPointer(e.e))
    this.commitLine()
    
  }

  mouseMove(e: fabric.IEvent) {
    if (this.isEnabled) {
        this.render()
    }
    this.endPointer = this.canvas.getPointer(e.e)
    if (!this.isMouseDown) return
    this.linePointer.push(this.canvas.getPointer(e.e))
    this.commitLine()
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
    if (!this.startPointer || !this.endPointer) return
    if (this.viewLine) {
      this.canvas.remove(this.viewLine)
    }
    this.viewLine = new fabric.Line([this.startPointer.x, this.startPointer.y, this.endPointer.x, this.endPointer.y], {
      stroke: 'red',
      selectable: false,
    })
    this.canvas.add(this.viewLine)
  }


  commitLine() {
    if (this.linePointer.length === 2) {
        this.commit(this.linePointer)
        const lastPointer = this.linePointer[this.linePointer.length - 1]
        this.lastPointer = lastPointer
        this.linePointer = [lastPointer,]
    } else {
        if (this.lastPointer && this.startPointer) {
            this.commit([this.lastPointer, this.startPointer])
        }
    }
  }

  unbindEvent() {
    this.canvas.off('mouse:down', this.mouseDown.bind(this))
    this.canvas.off('mouse:move', this.mouseMove.bind(this))
    this.canvas.off('mouse:up', this.mouseUp.bind(this))
  }

  destroy() {
    this.unbindEvent()
    this.viewLine = null
    this.startPointer = null
    this.endPointer = null
  }
}

