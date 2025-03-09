import { Theme } from "./types"

export const theme: Theme = {
  color: {
    fill: '#000000',
    stroke: '#000000',
    strokeWidth: 2,
    opacity: 0.5,
    control: {
      fill: '#000000',
      stroke: '#000000',
      strokeWidth: 2,
      radius: 5,
      opacity: 0.5,
    },
  },
}

export const setTheme = (newTheme: Theme) => {
  Object.assign(theme, newTheme)
}

export const getTheme = () => {
  return theme
}
