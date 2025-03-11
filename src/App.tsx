import { useState } from "react"
import { useRender } from "./hooks/render"
import { setPreset, setTheme } from "./render"
import { themePreset } from "./theme"

function App() {
  const { tool } = useRender('canvas')
  const setThemeHandler = (type: number) => {
    setTheme(themePreset[type])
    setPreset({ type })
  }
  const [cover, setCover] = useState(false)
  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center bg-gray-500">
        <div className="flex gap-4">
          <div className="flex items-center">
            <input checked={cover} onChange={(e) => {
              setCover(e.target.checked)
              tool?.changeCoverMode(e.target.checked)
            }} id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-300 dark:text-gray-300">{cover ? '' : '非'}覆盖模式</label>
          </div>
          <button  onClick={() => setThemeHandler(0)} className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">theme 1</button>
          <button  onClick={() => setThemeHandler(1)} className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">theme 2</button>
        </div>
        <div className="w-1/2 h-1/2 bg-white">
          <canvas id="canvas" />
        </div>
      </div>
    </>
  )
}

export default App
