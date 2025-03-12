import { fabric } from 'fabric'
import { LineTool, setPreset, setTheme } from "./render"
import { themePreset } from "./theme"
import { useEffect, useRef, useState } from 'react'
import { Button } from './component/Button'

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center bg-gray-500">
        <div className="flex gap-4">
          
          <Button  onClick={() => setThemeHandler(0)}>theme 1</Button>
          <Button  onClick={() => setThemeHandler(1)}>theme 2</Button>
          <Button  onClick={() => {
            if (!toolRef.current) return
            const coverMode = toolRef.current.viewTool.cover
            toolRef.current.changeCoverMode(!coverMode)
            setCoverMode(!coverMode)
          }}>{coverMode ? '覆盖模式' : '非覆盖模式'}</Button>
          <Button  onClick={() => {}}>裁剪</Button>
        </div>
        <div className='flex gap-4'>
          <Button  onClick={() => { toolRef.current?.hidePolygon()  }}>隐藏全部Polygon</Button>
          <Button  onClick={() => { toolRef.current?.showPolygon() }}>展示全部Polygon</Button>
          <Button  onClick={() => { toolRef.current?.hideControl() }}>隐藏全部Control</Button>
          <Button  onClick={() => { toolRef.current?.showControl() }}>展示全部Control</Button>
          <Button  onClick={() => { toolRef.current?.lockControl() }}>锁定全部Control</Button>
          <Button  onClick={() => { toolRef.current?.unlockControl() }}>解锁全部Control</Button>
        </div>
        <div className="flex gap-4">
          <input type="text" id="polygonId" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50" />
          <Button onClick={() => {
            const id = document.getElementById('polygonId') as HTMLInputElement
            if (!id) return
            toolRef.current?.removePolygon(id.value)
          }}>删除</Button>
          <Button onClick={() => {
            const id = document.getElementById('polygonId') as HTMLInputElement
            if (!id) return
            toolRef.current?.highlightControl(id.value)
          }}>高亮</Button>
          <Button onClick={() => {
            const id = document.getElementById('polygonId') as HTMLInputElement
            if (!id) return
            toolRef.current?.unhighlightControl(id.value)
          }}>取消高亮</Button>
        </div>
        <div className="w-1/2 h-1/2 bg-white">
          <canvas id="canvas" />
        </div>
      </div>
    </>
  )
}

export default App
