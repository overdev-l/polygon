import { fabric } from "fabric"
import { mouseData } from "./basic"
export function mouseControlDown(this: fabric.Canvas, event: fabric.IEvent) {
  const control = event.target as fabric.Circle
  const index = control.get('index')
  const polygonId = control.get('polygonId')
  if (index && polygonId) {
    mouseData.pointerIndex = index
    mouseData.polygonId = polygonId
    mouseData.isMouseDown = true
    mouseData.startPointer = this.getPointer(event.e)
  }else {
    mouseData.reset()
  }
}

export function mouseControlUp(this: fabric.Canvas, event: fabric.IEvent) {
  mouseData.isMouseDown = false
  mouseData.reset()
}

export function mouseControlMove(this: fabric.Canvas, event: fabric.IEvent) {
  if (!mouseData.isMouseDown) return
  const currentPointer = this.getPointer(event.e)
  const deltaX = currentPointer.x - mouseData.startPointer.x
  const deltaY = currentPointer.y - mouseData.startPointer.y
  const polygon = this.getObjects().find((obj) => obj.get('id') === mouseData.polygonId)
  console.log(polygon)
  const polygonPoints = polygon?.get('points')
  if (polygonPoints) {
    polygonPoints[mouseData.pointerIndex] = {
      x: polygonPoints[mouseData.pointerIndex].x + deltaX,
      y: polygonPoints[mouseData.pointerIndex].y + deltaY
    }
    polygon.set('points', polygonPoints)
    this.renderAll()
  }
}
