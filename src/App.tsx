import { fabric } from 'fabric'
import { LineTool, setPreset, setTheme } from "./render"
import { themePreset } from "./theme"
import { useEffect, useRef, useState } from 'react'

function App() {
  const toolRef = useRef<LineTool | null>(null)
  const canvasRef = useRef<fabric.Canvas | null>(null)
  const [coverMode, setCoverMode] = useState<boolean>(false)
  const setThemeHandler = (type: number) => {
    setTheme(themePreset[type])
    setPreset({ type })
  }
  const init = () => {
    const target = document.getElementById('canvas') as HTMLCanvasElement
    if (!target || toolRef.current) return
    const canvas = new fabric.Canvas(target, {
      width: target.parentElement?.clientWidth,
      height: target.parentElement?.clientHeight,
      selection: false,
    })
    canvasRef.current = canvas
    const currentTool = new LineTool(canvas)
    toolRef.current = currentTool
    currentTool.changeCoverMode(coverMode)
  }

  useEffect(() => {
    init()
    return () => {
    toolRef.current?.destroy()
    }
  }, [])
  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center bg-gray-500">
        <div className="flex gap-4">
          
          <button  onClick={() => setThemeHandler(0)} className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">theme 1</button>
          <button  onClick={() => setThemeHandler(1)} className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">theme 2</button>
          <button  onClick={() => {
            if (!toolRef.current) return
            const coverMode = toolRef.current.viewTool.cover
            toolRef.current.changeCoverMode(!coverMode)
            setCoverMode(!coverMode)
          }} className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">{coverMode ? '覆盖模式' : '非覆盖模式'}</button>
        </div>
        <div className="w-1/2 h-1/2 bg-white">
          <canvas id="canvas" />
        </div>
      </div>
    </>
  )
}

export default App
