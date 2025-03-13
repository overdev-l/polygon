import hotkeys from 'hotkeys-js';
import { fabric } from "fabric"
import { View } from "./view"
import { Stash } from "./stash"
import { Pointer } from "./types"

export class LineTool {
  viewTool: View
  stashTool: Stash
  
  constructor(canvas: fabric.Canvas) {
    this.viewTool = new View(canvas, this.viewCommitToStash)
    this.stashTool = new Stash(canvas)
    this.bindEvent()
  }

  bindEvent() {
    hotkeys('space', this.commit.bind(this));
  }

  changeViewTool = () => {
    this.viewTool.isEnabled = true
  }

  openMask = () => {
    this.viewTool.isEnabled = true
  }

  commit = () => {
    if (this.viewTool.linePointer.length > 0) {
      this.viewTool.isEnabled = false
      this.stashTool.commit(this.viewTool.linePointer, this.viewTool.cover)
      this.viewTool.remove()
      this.viewTool.reset()
    }
  }

  viewCommitToStash = (line: Array<Pointer>) => {
    if (line.length > 0) {
      this.stashTool.commit(line, this.viewTool.cover)
    }
  }
  /**
   * 切换覆盖模式
   * @param isCover 是否为覆盖模式
   * 如果不为覆盖模式，在完成绘制后，需要计算多边形交集进行布尔运算
   */
  changeCoverMode = (isCover: boolean) => {
    this.viewTool.cover = isCover
  }
  /**
   * 删除多边形
   * @param ids 多边形id
   */
  removePolygon = (...ids: string[]) => {
    this.stashTool.removePolygon(ids)
  }
  /**
   * 隐藏多边形
   * @param ids 多边形id
   */
  hidePolygon = (...ids: string[]) => {
    this.stashTool.hidePolygon(ids)
  }
  /**
   * 展示多边形
   * @param ids 多边形id
   */
  showPolygon = (...ids: string[]) => {
    this.stashTool.showPolygon(ids)
  }
  /**
   * 隐藏控制点
   * @param ids 控制点id
   */
  hideControl = (...ids: string[]) => {
    this.stashTool.hideControl(ids)
  }
  /**
   * 展示控制点
   * @param ids 控制点id
   */
  showControl = (...ids: string[]) => {
    this.stashTool.showControl(ids)
  }

  lockControl = (...ids: string[]) => {
    this.stashTool.lockControl(ids)
  }

  unlockControl = (...ids: string[]) => {
    this.stashTool.unlockControl(ids)
  }

  highlightControl = (...ids: string[]) => {
    this.stashTool.highlightControl(ids)
  }

  unhighlightControl = (...ids: string[]) => {
    this.stashTool.unhighlightControl(ids)
  }


  destroy() {
    this.viewTool.destroy()
    this.stashTool.destroy()
  }
}