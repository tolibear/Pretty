import { ReactNode } from 'react'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export default function TestLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
} 