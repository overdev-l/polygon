import { fabric } from "fabric"
import { Stash } from "../stash"
export function mouseMoving(this: fabric.Canvas, stash: Stash, event: fabric.IEvent) {
  const target = event.target as fabric.Circle
  const polygonId = target.get('polygonId')
  const index = target.get('index')
  if (!polygonId || !index) return
  const polygon = this.getObjects().find((obj) => obj.get('id') === polygonId)
  const newPoints = target.getCenterPoint()
  const polygonPoints = polygon?.get('points')
  if (polygonPoints) {
    polygonPoints[index] = newPoints
    polygon.set('points', polygonPoints)
    this.renderAll()
  }
}

export function mouseMoved(this: Stash, event: fabric.IEvent) {
  const target = event.target as fabric.Circle
  const polygonId = target.get('polygonId')
  const index = target.get('index')
  if (polygonId && index) {
    const targetPolygon = this.fabricPolygons.find((polygon) => polygon.get('id') === polygonId)
    const newPolygonPointers = targetPolygon?.get('points')
    if (!newPolygonPointers) return
    const targetPointer = this.pointers.find((pointer) => pointer.id === polygonId)

    const newPointers = this.pointers.filter((pointer) => pointer.id !== polygonId)
    this.pointers = newPointers
    if (targetPointer) {
      this.triggerCommit({
        ...targetPointer,
        polygon: newPolygonPointers
      })
    }
  }
}
