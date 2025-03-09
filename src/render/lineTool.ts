import { fabric } from "fabric"
import { View } from "./view"
import { Pushed } from "./pushed"
import { Stash } from "./stash"
import { Pointer, StashPointer } from "./types"

export class LineTool {
  viewTool: View
  stashTool: Stash
  pushedTool: Pushed
  
  constructor(canvas: fabric.Canvas) {
    this.viewTool = new View(canvas, this.viewCommitToStash)
    this.stashTool = new Stash(canvas, this.stashCommitPushed)
    this.pushedTool = new Pushed(canvas)
    this.bindEvent()
  }

  bindEvent() {
    window.addEventListener('keydown', this.keyDown.bind(this))
  }

  keyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.viewTool.isEnabled = false
      this.viewTool.remove()
      this.viewTool.commitLine()
      this.stashTool.commitLine()
      this.viewTool.reset()
    }
    if (e.key === ' ') {
      this.viewTool.isEnabled = true
    }
  }

  viewCommitToStash = (line: Array<Pointer>) => {
    this.stashTool.commit(line)
  }

  stashCommitPushed = (line: StashPointer) => {
    this.pushedTool.commit(line)
  }

  destroy() {
    this.viewTool.destroy()
    this.stashTool.destroy()
    this.pushedTool.destroy()
  }
}