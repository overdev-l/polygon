import { nanoid } from 'nanoid'
import { fabric } from 'fabric'
import { Pointer, StashPointer, StashPointerWithGroup, Theme } from "./types"
import { getPreset, getTheme } from './preset'
import { mouseMoved, mouseMoving } from './controlMouse/mouse'
import { polygonUnion } from './utils/polygonUtils'

export class Stash {
  pointers: StashPointerWithGroup = []
  fabricPolygons: fabric.Polygon[] = []
  fabricPolygonControls: fabric.Circle[] = []

  constructor(private canvas: fabric.Canvas) {
    this.canvas = canvas
    this.canvas.on('object:moving', mouseMoving.bind(this.canvas, this))
    this.canvas.on('object:modified', mouseMoved.bind(this))
  }


  destroy() {
    this.pointers = []
  }

  triggerCommit(pointer: StashPointer) {
    if (!pointer.cover) {
      polygonUnion.call(this, pointer)
    } else {
      this.pointers.push(pointer)
    }
    this.removeAllPolygon()
    this.removeAllControl()
    this.render()
  }

  commit(line: Array<Pointer>, cover: boolean) {

    if (!cover) {
      console.log('非覆盖模式：计算多边形布尔交集')
      polygonUnion.call(this, {
        polygon: line,
        theme: getTheme(),
        id: nanoid(),
        type: getPreset().type,
        cover
      })
    } else {
      this.pointers.push({
        polygon: line,
        theme: getTheme(),
        id: nanoid(),
        type: getPreset().type,
        cover
      })
    }
    this.removeAllPolygon()
    this.removeAllControl()
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
        polygonType: pointer.type,
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
      const fabricPolygonControl = new fabric.Circle({
        left: p.x,
        top: p.y,
        radius: theme.color.control.radius,
        fill: theme.color.control.fill,
        stroke: theme.color.control.stroke,
        hasControls: false,
        hasBorders: false,
        originX: 'center',
        originY: 'center',
      })
      fabricPolygonControl.set('polygonId', id)
      fabricPolygonControl.set('index', index)
      this.canvas.add(fabricPolygonControl)
      this.fabricPolygonControls.push(fabricPolygonControl)
    })
  }

  removeAllPolygon() {
    this.fabricPolygons.forEach((polygon) => {
      this.canvas.remove(polygon)
    })
    this.fabricPolygons = []
  }

  removeAllControl() {
    this.fabricPolygonControls.forEach((control) => {
      this.canvas.remove(control)
    })
    this.fabricPolygonControls = []
  }
}
