import { ControlTheme, Preset, Theme } from "./types"

export const theme: Theme = {
  color: {
    fill: 'rgba(181,228,140,0.2)',
    stroke: 'rgba(181,228,140,0.5)',
    strokeWidth: 2,
    opacity: 1,
    control: {
      fill: 'rgba(153,217,140,1)',
      stroke: 'rgba(153,217,140,1)',
      strokeWidth: 2,
      radius: 5,
      opacity: 1,
    },
  },
}

export const lightControlTheme: ControlTheme = {
  fill: '#DB4520',
  stroke: '#DB4520',
  strokeWidth: 2,
  radius: 5,
  opacity: 0.5,
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

export const setLightControlTheme = (newLightControlTheme: ControlTheme) => {
  Object.assign(lightControlTheme, newLightControlTheme)
}

export const getLightControlTheme = () => {
  return JSON.parse(JSON.stringify(lightControlTheme))
}
