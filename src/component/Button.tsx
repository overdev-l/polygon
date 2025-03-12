export function Button({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return <button onClick={onClick} className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">{children}</button>
}