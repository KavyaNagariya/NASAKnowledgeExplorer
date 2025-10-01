'use client'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import React from 'react'

export function UIProviders({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
      {children}
    </TooltipProvider>
  )
}


