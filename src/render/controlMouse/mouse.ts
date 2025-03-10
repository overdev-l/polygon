import { fabric } from "fabric"
export function mouseMoving(this: fabric.Canvas, event: fabric.IEvent) {
  const target = event.target as fabric.Circle
  const polygonId = target.get('polygonId')
  const index = target.get('index')
  const polygon = this.getObjects().find((obj) => obj.get('id') === polygonId)
  const newPoints = target.getCenterPoint()
  console.log(newPoints)
  const polygonPoints = polygon?.get('points')
  if (polygonPoints) {
    polygonPoints[index] = newPoints
    polygon.set('points', polygonPoints)
    this.renderAll()
  }
}
