import { fabric } from "fabric"
import { Pointer, PushedPointer, StashPointer } from "./types"

export class Pushed {
  pointers: PushedPointer = []
  fabricLines: fabric.Line[] = []
  fabricNodes: fabric.Circle[] = []
  fabricPolygons: fabric.Polygon[] = []
  constructor(private canvas: fabric.Canvas) {
    this.canvas = canvas
  }

  commit(line: StashPointer) {
    this.pointers.push(line)
    this.remove()
    // this.render()
    // this.renderNode()
    this.renderPolygon()
  }

  render() {
    this.pointers.forEach((lines) => {
      lines.forEach((line) => {
        const fabricLine = new fabric.Line([line[0].x, line[0].y, line[1].x, line[1].y], {
          stroke: 'green',
          strokeWidth: 2,
          selectable: false,
        })
        this.canvas.add(fabricLine)
        this.fabricLines.push(fabricLine)
      })
    })
  }

  renderPolygon() {
    this.pointers.forEach((lines) => {
      const fabricPolygon = new fabric.Polygon(lines.flat(), {
        stroke: 'green',
        strokeWidth: 2,
        selectable: false,
      })
      this.canvas.add(fabricPolygon)
      this.fabricPolygons.push(fabricPolygon)
    })
  }
  remove() {
    this.fabricLines.forEach((line) => {
      this.canvas.remove(line)
    })
    this.fabricLines = []
  }

  renderNode() {
    const isSameLine = (p1: Pointer, p2: Pointer) => p1.x === p2.x || p1.y === p2.y
    const fakePointers = this.pointers.flat().flat()
    console.log(fakePointers)
    const nodes: Pointer[] = []
    for (let i = 0; i < fakePointers.length; i++) {
        const current = fakePointers[i]
        const next = fakePointers[i + 1]
        if (next && isSameLine(current, next)) {
            nodes.push(current)
        }
    }
    console.log(nodes)
  }
  
  destroy() {
    this.pointers = []
  }
}
