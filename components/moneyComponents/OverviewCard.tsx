// components/MoneyPage/OverviewCards.tsx
'use client'
import { ReactNode } from 'react'
import Button from '../ui/Button'

interface OverviewCardProps {
  title: string
  value: string
  description: string
  buttonText: string
  onButtonClick: () => void
  children?: ReactNode
}

export const OverviewCard = ({
  title,
  value,
  description,
  buttonText,
  onButtonClick,
  children
}: OverviewCardProps) => (
  <div className="bg-gradient-to-r from-[#bf2c7e] to-[#0f1c47] text-white p-8 rounded-2xl shadow-lg lg:col-span-2">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="flex flex-wrap gap-8">
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm opacity-90">{description}</p>
      </div>
      {children}
    </div>
    <Button
      onClick={onButtonClick}
      className="mt-6 bg-[#0f1c47] text-[#bf2c7e] px-6 py-2 rounded-full hover:bg-opacity-90 transition-opacity"
    >
      {buttonText}
    </Button>
  </div>
)
