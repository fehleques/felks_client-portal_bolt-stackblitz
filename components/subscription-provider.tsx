'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { SubscriptionData } from '@/lib/subscription'
import { loadSubscription, saveSubscription } from '@/lib/subscription'

interface SubscriptionContextValue {
  subscription: SubscriptionData | null
  setSubscription: (data: SubscriptionData) => void
}

const SubscriptionContext = createContext<SubscriptionContextValue>({
  subscription: null,
  setSubscription: () => {}
})

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscriptionState] = useState<SubscriptionData | null>(null)

  useEffect(() => {
    const data = loadSubscription()
    if (data) {
      setSubscriptionState(data)
    } else {
      const defaultSub: SubscriptionData = {
        tier: 'basic',
        renewsAt: new Date().toISOString()
      }
      saveSubscription(defaultSub)
      setSubscriptionState(defaultSub)
    }
  }, [])

  const setSubscription = (data: SubscriptionData) => {
    saveSubscription(data)
    setSubscriptionState(data)
  }

  return (
    <SubscriptionContext.Provider value={{ subscription, setSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export const useSubscription = () => useContext(SubscriptionContext)
