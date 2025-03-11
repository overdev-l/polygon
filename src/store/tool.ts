import { create } from 'zustand'
import { LineTool } from '../render'
interface ToolStore {
  tool: LineTool | null
  setTool: (tool: LineTool) => void
}

export const useToolStore = create<ToolStore>((set) => ({
  tool: null,
  setTool: (tool: LineTool) => set({ tool }),
}))
