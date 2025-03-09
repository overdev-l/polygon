import { nanoid } from 'nanoid'
import { fabric } from 'fabric'
import { Pointer, StashPointerWithGroup, Theme } from "./types"
import { getTheme } from './theme'
import { mouseControlDown, mouseControlMove, mouseControlUp } from './controlMouse/mouse'

export class Stash {
  pointers: StashPointerWithGroup = []
  fabricPolygons: fabric.Polygon[] = []

  constructor(private canvas: fabric.Canvas) {
    this.canvas = canvas
    this.canvas.on('mouse:down', mouseControlDown.bind(this.canvas))
    this.canvas.on('mouse:up', mouseControlUp.bind(this.canvas))
    this.canvas.on('mouse:move', mouseControlMove.bind(this.canvas))
  }

  
  destroy() {
    this.pointers = []
  }

  commit(line: Array<Pointer>) {
    this.pointers.push({
      polygon: line,
      theme: getTheme(),
      id: nanoid()
    })
    this.removeAllPolygon()
    this.render()
  }

  render() {
    this.pointers.forEach((pointer) => {
      const fabricPolygon = new fabric.Polygon(pointer.polygon, {
        stroke: pointer.theme.color.stroke,
        strokeWidth: pointer.theme.color.strokeWidth,
        fill: pointer.theme.color.fill,
        opacity: pointer.theme.color.opacity,
        id: pointer.id,
        objectCaching: false,
        selectable: false,
        evented: false
      })
      this.fabricPolygons.push(fabricPolygon)
      this.canvas.add(fabricPolygon)
      this.renderControl(pointer.polygon, pointer.theme, pointer.id)
    })
  }
  renderControl(pointer: Pointer[], theme: Theme, id: string) {
    pointer.forEach((p, index) => {
      const fabricPlogonControl = new fabric.Circle({
        left: p.x,
        top: p.y,
        radius: theme.color.control.radius,
        fill: theme.color.control.fill,
        stroke: theme.color.control.stroke,
        selectable: false,
        originX: 'center',
        originY: 'center',
      })
      fabricPlogonControl.set('polygonId', id)
      fabricPlogonControl.set('index', index)
      this.canvas.add(fabricPlogonControl)
      
    })
  }

  removeAllPolygon() {
    this.fabricPolygons.forEach((polygon) => {
      this.canvas.remove(polygon)
    })
    this.fabricPolygons = []
  }
}
