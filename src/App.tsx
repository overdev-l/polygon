import { useRender } from "./hooks/render"

function App() {
  useRender('canvas')
  return (
    <>
      <div className="w-full h-full flex justify-center items-center bg-gray-500">
        <div className="w-1/2 h-1/2 bg-white">
          <canvas id="canvas" />
        </div>
      </div>
    </>
  )
}

export default App
