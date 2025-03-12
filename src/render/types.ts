import { theme } from "./preset"

export type Pointer = {
  x: number
  y: number
}
export type StashPointer = {
  polygon: Array<Pointer> 
  theme: typeof theme
  id: string
  type: number
  cover: boolean
  hidePolygon: boolean
  hideControl: boolean
  highlightControl: boolean
  lockControl: boolean
  lightControlTheme: ControlTheme
}
export type StashPointerWithGroup = Array<StashPointer>

export type ControlTheme = {
  fill: string
  stroke: string
  strokeWidth: number
  radius: number
  opacity: number
}

export type Theme = {
  color: {
    fill: string
    stroke: string
    strokeWidth: number
    opacity: number
    control: ControlTheme
  }
}

export type Preset = {
  type: number
}
