// components/MoneyPage/QuickActions.tsx
/*'use client'
interface QuickAction {
    icon: string
    label: string
  }
  
interface QuickActionsProps {
  actions: QuickAction[]
}

export const QuickActions = ({ actions }: QuickActionsProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <h3 className="text-lg font-bold text-[#0f1c47] mb-4">Quick Actions</h3>
    <div className="space-y-3">
      {actions.map((action) => (
        <button
          key={action.label}
          className="w-full flex items-center gap-3 p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
        >
          {action.icon} <span className="text-sm font-medium text-[#0f1c47]">{action.label}</span>
        </button>
      ))}
    </div>
  </div>
)*/

'use client'

import { useRouter } from 'next/navigation'

interface QuickAction {
  icon: string
  label: string
  path: string
}

interface QuickActionsProps {
  actions: QuickAction[]
}

export const QuickActions = ({ actions }: QuickActionsProps) => {
  const router = useRouter()

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-lg font-bold text-[#0f1c47] mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => router.push(action.path)}
            className="w-full flex items-center gap-3 p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
          >
            {action.icon} <span className="text-sm font-medium text-[#0f1c47]">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

