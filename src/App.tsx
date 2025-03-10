import { useRender } from "./hooks/render"
import { setPreset, setTheme } from "./render"
import { themePreset } from "./theme"

function App() {
  useRender('canvas')
  const setThemeHandler = (type: number) => {
    setTheme(themePreset[type])
    setPreset({ type })
  }
  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center bg-gray-500">
        <div className="flex gap-4">
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
