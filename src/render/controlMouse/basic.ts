export const mouseData = {
    isMouseDown: false,
    pointerIndex: null,
    polygonId: null,
    startPointer: null,
    reset: function() {
        this.isMouseDown = false
        this.pointerIndex = null
        this.polygonId = null
        this.startPointer = null
    }
}