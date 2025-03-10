import { theme } from "./preset"

export type Pointer = {
  x: number
  y: number
}
export type StashPointerWithGroup = Array<{
  polygon: Array<Pointer>
  theme: typeof theme,
  id: string
  type: number
}>

export type Theme = {
  color: {
    fill: string
    stroke: string
    strokeWidth: number
    opacity: number
    control: {
      fill: string
      stroke: string
      strokeWidth: number
      radius: number
      opacity: number
    }
  }
}

export type Preset = {
  type: number
}
