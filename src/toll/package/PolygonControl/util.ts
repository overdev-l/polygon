import { fabric } from "fabric"
import { IPolygonControlOptions } from "./types"

export function createPolygon( points: fabric.Point[], options: IPolygonControlOptions) {
    const polygon = new fabric.Polygon(points, options)
    return polygon
}