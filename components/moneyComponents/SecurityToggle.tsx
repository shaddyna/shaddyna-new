// components/MoneyPage/SecurityToggle.tsx
'use client'

interface SecurityToggleProps {
  enabled: boolean
  onToggle: () => void
}

export const SecurityToggle = ({ enabled, onToggle }: SecurityToggleProps) => (
  <button
    onClick={onToggle}
    className={`w-12 h-6 rounded-full p-1 ${enabled ? 'bg-[#bf2c7e]' : 'bg-gray-300'}`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full transform transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-0'
      }`}
    />
  </button>
)