import { Preset, Theme } from "./types"

export const theme: Theme = {
  color: {
    fill: '#b5e48c',
    stroke: '#b5e48c',
    strokeWidth: 2,
    opacity: 0.5,
    control: {
      fill: '#99d98c',
      stroke: '#99d98c',
      strokeWidth: 2,
      radius: 5,
      opacity: 0.5,
    },
  },
}

export const preset = {
  type: 0
}

export const setPreset = (newPreset: Preset) => {
  Object.assign(preset, newPreset)
}

export const getPreset = () => {
  return preset
}

export const setTheme = (newTheme: Theme) => {
  Object.assign(theme, newTheme)
}

export const getTheme = () => {
  return JSON.parse(JSON.stringify(theme))
}
