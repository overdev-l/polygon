import { fabric } from 'fabric'
import { Pointer, StashPointer } from "./types"

export class Stash {
  pointers: StashPointer = []
  fabricLines: fabric.Line[] = []
  commitPushed: (line: StashPointer) => void

  constructor(private canvas: fabric.Canvas, commitPushed: (line: StashPointer) => void) {
    this.canvas = canvas
    this.commitPushed = commitPushed
  }

  
  destroy() {
    this.pointers = []
  }

  commitLine = () => {
    this.commitPushed(this.pointers)
    this.pointers = []
    this.removeAllLines()
    this.render()
  }

  commit = (line: Array<Pointer>) => {
    this.pointers.push(line)
    this.removeAllLines()
    this.render()
  }

  render() {
    this.pointers.forEach((line) => {
      const fabricLine = new fabric.Line([line[0].x, line[0].y, line[1].x, line[1].y], {
        stroke: 'black',
        selectable: false,
      })
      this.fabricLines.push(fabricLine)
      this.canvas.add(fabricLine)
    })
  }

  removeAllLines() {
    this.fabricLines.forEach((line) => {
      this.canvas.remove(line)
    })
    this.fabricLines = []
  }
}
