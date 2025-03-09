import { fabric } from "fabric"
import { useEffect, useRef } from "react"
import { LineTool } from "../render/lineTool"
import { Tool } from "../toll"
export const useRender = (id: string) => {
    // const lineToolrf = useRef<LineTool | null>(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const init = () => {
    const target = document.getElementById(id) as HTMLCanvasElement
    if (!target) return
    const canvas = new fabric.Canvas(target, {
      width: target.parentElement?.clientWidth,
      height: target.parentElement?.clientHeight,
      selection: false,
    })
    const tool = new Tool(canvas)
    tool.init()
  }

  useEffect(() => {
    init()
    return () => {
      // tool.destroy()
    }
  }, [init])
}