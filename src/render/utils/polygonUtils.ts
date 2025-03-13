import { Stash } from "../stash";
import { Pointer, StashPointer, StashPointerWithGroup } from "../types";
import polybool from '@velipso/polybool'
import { Receiver } from "./polygon/Receover";

/**
 * 创建多边形
 * @param pointers 
 * @returns 
 */
function createShape(pointers: Array<Pointer>) {
    const newShape = polybool.shape().beginPath()
    pointers.forEach((point, index) => {
        if (index === 0) {
            newShape.moveTo(point.x, point.y)
        } else {
            newShape.lineTo(point.x, point.y)
        }
    })
    newShape.closePath()
    return newShape
}

function createExistingShape(pointers: StashPointerWithGroup) {
    const existingShape = polybool.shape().beginPath()
    pointers.forEach(pointer => {
        const polygon = pointer.polygon
        polygon.forEach((point, index) => {
            if (index === 0) {
                existingShape.moveTo(point.x, point.y)
            } else {
                existingShape.lineTo(point.x, point.y)
            }
        })
        existingShape.closePath()
    })
    return existingShape
}

/**
 * 预先处理多边形
 * @param this 
 * @param newPointers 
 */
export function polygonUnion(this:Stash, newPointers: StashPointer) {
    const pointers = this.pointers
    const newPolygon = polygonUnionHandler(pointers, newPointers)
    this.pointers = [...pointers, {
        ...newPointers,
        polygon: newPolygon,
    }]
}


/**
 * 合并多边形
 * @param pointers 
 * @param newPointers 
 */
export function polygonUnionHandler(pointers: StashPointerWithGroup, newPointers: StashPointer) {
    // 创建新多边形的 shape
    const newShape = createShape(newPointers.polygon)

    // 如果没有已存在的多边形,直接返回新多边形
    if (pointers.length === 0) {
        const receiver = new Receiver()
        const resultPaths = newShape.output(receiver).done()
        return resultPaths[0]
    }

    // 创建已存在多边形的 shapes
    const existingShape = createExistingShape(pointers)

    // 计算新多边形与已存在多边形的相交部分
    const intersection = existingShape.combine(newShape).intersect()
    
    // 从新多边形中减去相交部分
    const result = newShape.combine(intersection).difference()

    // 输出结果
    const receiver = new Receiver()
    const resultPaths = result.output(receiver).done()
    return resultPaths[0]
}


export function clipAllPolygon(this: Stash, line: Array<Pointer>) {
    const pointers = this.pointers
    // 创建新多边形的 shape
    const newShape = createShape(line)
    const newPointers = pointers.map(pointer => {
        const existingShape = createShape(pointer.polygon)
        const intersection = existingShape.combine(newShape).intersect()
        const result = existingShape.combine(intersection).difference()
        const receiver = new Receiver()
        const resultPaths = result.output(receiver).done()
        return {
            ...pointer,
            polygon: resultPaths[0]
        }
    })
    this.pointers = newPointers
}