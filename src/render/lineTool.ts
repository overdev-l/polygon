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
    console.log('bindEvent')
    hotkeys('space', this.changeViewTool.bind(this));
    hotkeys('escape', this.commit.bind(this));
  }

  changeViewTool = () => {
    console.log('changeViewTool')
    this.viewTool.isEnabled = true
  }

  commit = () => {
    console.log('commit', this.viewTool.linePointer)
    if (this.viewTool.linePointer.length > 0) {
      this.viewTool.isEnabled = false
      this.stashTool.commit(this.viewTool.linePointer)
      this.viewTool.remove()
      this.viewTool.reset()
    }
  }

  pushToStash = () => {
    if (this.viewTool.linePointer.length > 0) {
      this.stashTool.commit(this.viewTool.linePointer)
    }
  }

  viewCommitToStash = (line: Array<Pointer>) => {
    if (line.length > 0) {
      this.stashTool.commit(line)
    }
  }

  destroy() {
    this.viewTool.destroy()
    this.stashTool.destroy()
  }
}