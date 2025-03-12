import { nanoid } from 'nanoid'
import { fabric } from 'fabric'
import { Pointer, StashPointer, StashPointerWithGroup, Theme } from "./types"
import { getLightControlTheme, getPreset, getTheme } from './preset'
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
    const id = nanoid()
    console.log('commit', id)
    if (!cover) {
      polygonUnion.call(this, {
        polygon: line,
        theme: getTheme(),
        id,
        type: getPreset().type,
        cover,
        hidePolygon: false,
        hideControl: false,
        highlightControl: false,
        lockControl: false,
        lightControlTheme: getLightControlTheme()
      })
    } else {
      this.pointers.push({
        polygon: line,
        theme: getTheme(),
        id,
        type: getPreset().type,
        cover,
        hidePolygon: false,
        hideControl: false,
        highlightControl: false,
        lockControl: false,
        lightControlTheme: getLightControlTheme()
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
        visible: !pointer.hidePolygon,
        polygonType: pointer.type,
        objectCaching: false,
        selectable: false,
        evented: false
      })
      this.fabricPolygons.push(fabricPolygon)
      this.canvas.add(fabricPolygon)
      this.renderControl(pointer, pointer.theme, pointer.id)
    })
  }
  renderControl(pointer: StashPointer, theme: Theme, id: string) {
    pointer.polygon.forEach((p, index) => {
      const fabricPolygonControl = new fabric.Circle({
        left: p.x,
        top: p.y,
        radius: theme.color.control.radius,
        fill: theme.color.control.fill,
        stroke: theme.color.control.stroke,
        hasControls: false,
        hasBorders: false,
        visible: !pointer.hideControl,
        evented: !pointer.lockControl,
        originX: 'center',
        originY: 'center',
      })
      fabricPolygonControl.set('polygonId', id)
      fabricPolygonControl.set('index', index)
      this.canvas.add(fabricPolygonControl)
      this.fabricPolygonControls.push(fabricPolygonControl)
    })
  }

  removePolygon(ids: string[]) {
    this.fabricPolygons.forEach((polygon) => {
      if (ids.includes(polygon.get('id'))) {
        this.canvas.remove(polygon)
      }
    })
    this.fabricPolygonControls.forEach((control) => {
      if (ids.includes(control.get('polygonId'))) {
        this.canvas.remove(control)
      }
    })
    this.pointers = this.pointers.filter((pointer) => !ids.includes(pointer.id))
  }
  /**
   * 删除所有多边形
   */
  removeAllPolygon() {
    this.fabricPolygons.forEach((polygon) => {
      this.canvas.remove(polygon)
    })
    this.fabricPolygons = []
  }
  /**
   * 删除所有控制点
   */
  removeAllControl() {
    this.fabricPolygonControls.forEach((control) => {
      this.canvas.remove(control)
    })
    this.fabricPolygonControls = []
  }
  /**
   * 隐藏多边形
   * @param ids 多边形id
   */
  hidePolygon(ids: string[]) {
    if (ids.length === 0) {
      ids = this.pointers.map((pointer) => pointer.id)
    }
    console.log('hidePolygon', ids)
    this.fabricPolygons.forEach((polygon) => {
      if (ids.includes(polygon.get('id'))) {
        polygon.set('visible', false)
      }
    })
    this.fabricPolygonControls.forEach((control) => {
      if (ids.includes(control.get('polygonId'))) {
        control.set('visible', false)
      }
    })
    this.pointers.forEach((pointer) => {
      if (ids.includes(pointer.id)) {
        pointer.hidePolygon = true
      }
    })
    this.canvas.renderAll()
  }
  /**
   * 展示多边形
   * @param ids 多边形id
   */
  showPolygon(ids: string[]) {
    if (ids.length === 0) {
      ids = this.pointers.map((pointer) => pointer.id)
    }
    this.fabricPolygons.forEach((polygon) => {
      if (ids.includes(polygon.get('id'))) {
        polygon.set('visible', true)
      }
    })
    this.fabricPolygonControls.forEach((control) => {
      if (ids.includes(control.get('polygonId'))) {
        control.set('visible', true)  
      }
    })
    this.pointers.forEach((pointer) => {
      if (ids.includes(pointer.id)) {
        pointer.hidePolygon = false
      }
    })
    this.canvas.renderAll()
  }

  /**
   * 隐藏控制点
   * @param ids 控制点id
   */
  hideControl(ids: string[]) {
    if (ids.length === 0) {
      ids = this.pointers.map((pointer) => pointer.id)
    } 
    this.fabricPolygonControls.forEach((control) => {
      if (ids.includes(control.get('polygonId'))) {
        control.set('visible', false)
      }
    })  
    this.pointers.forEach((pointer) => {
      if (ids.includes(pointer.id)) {
        pointer.hideControl = true
      }
    })
    this.canvas.renderAll()
  }
  /**
   * 展示控制点
   * @param ids 控制点id
   */
  showControl(ids: string[]) {
    if (ids.length === 0) {
      ids = this.pointers.map((pointer) => pointer.id)
    }
    this.fabricPolygonControls.forEach((control) => {
      if (ids.includes(control.get('polygonId'))) {
        control.set('visible', true)
      }
    })
    this.pointers.forEach((pointer) => {
      if (ids.includes(pointer.id)) {
        pointer.hideControl = false
      }
    })
    this.canvas.renderAll()
  }

  lockControl(ids: string[]) {
    if (ids.length === 0) {
      ids = this.pointers.map((pointer) => pointer.id)
    }
    this.fabricPolygonControls.forEach((control) => {
      if (ids.includes(control.get('polygonId'))) {
        control.set('evented', false)
      }
    })
    this.pointers.forEach((pointer) => {
      if (ids.includes(pointer.id)) { 
        pointer.lockControl = true
      }
    })
    this.canvas.renderAll()
  }

  unlockControl(ids: string[]) {
    if (ids.length === 0) {
      ids = this.pointers.map((pointer) => pointer.id)
    }
    this.fabricPolygonControls.forEach((control) => {
      if (ids.includes(control.get('polygonId'))) {
        control.set('evented', true)
      }
    })  
    this.pointers.forEach((pointer) => {  
      if (ids.includes(pointer.id)) {
        pointer.lockControl = false
      }
    })
    this.canvas.renderAll()
  }

  highlightControl(ids: string[]) {
    console.log('highlightControl', ids)
    if (ids.length === 0) {
      ids = this.pointers.map((pointer) => pointer.id)
    }
    ids.forEach((id) => { 
      const pointer = this.pointers.find((pointer) => pointer.id === id)
      if (!pointer) return
      this.pointers.forEach((pointer) => {
        if (id === pointer.id) {
          pointer.highlightControl = true
        }
      })
      this.fabricPolygonControls.forEach((control) => {
        if (id === control.get('polygonId')) {
          control.set('fill', pointer.lightControlTheme.fill)
          control.set('stroke', pointer.lightControlTheme.stroke)
        }
      })
    })
    this.canvas.renderAll()
  }

  unhighlightControl(ids: string[]) {
    if (ids.length === 0) {
      ids = this.pointers.map((pointer) => pointer.id)
    }
    ids.forEach((id) => { 
      const pointer = this.pointers.find((pointer) => pointer.id === id)
      if (!pointer) return
      this.pointers.forEach((pointer) => {
        if (id === pointer.id) {
          pointer.highlightControl = true
        }
      })
      this.fabricPolygonControls.forEach((control) => {
        if (id === control.get('polygonId')) {
          control.set('fill', pointer.theme.color.control.fill)
          control.set('stroke', pointer.theme.color.control.stroke)
        }
      })
    })
    this.canvas.renderAll()
  }
}
