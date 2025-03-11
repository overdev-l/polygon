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
    hotkeys('space', this.changeViewTool.bind(this));
    hotkeys('escape', this.commit.bind(this));
  }

  changeViewTool = () => {
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


  destroy() {
    this.viewTool.destroy()
    this.stashTool.destroy()
  }
}