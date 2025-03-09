import { fabric } from 'fabric'
import { IPolygonControlOptions } from './types'
import { createPolygon } from './util'
const PolygonControl = fabric.util.createClass(fabric.Group, {
    type: 'polygonControl',
    initialize: function(points: fabric.Point[], options: IPolygonControlOptions) {
        this.callSuper('initialize', {})
        const polygon = createPolygon(points, options)
        this.group = new fabric.Group()
        this.group.add(polygon)
    },
    
})

export default PolygonControl