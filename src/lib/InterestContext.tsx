import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

/** What someone can put their name down for before the doors open. */
export const INTERESTS = ['Buying', 'Selling', 'Renting', 'Partnering'] as const
export type Interest = (typeof INTERESTS)[number]

type Ctx = {
  interest: Interest
  setInterest: (v: Interest) => void
}

const InterestContext = createContext<Ctx | null>(null)

export function useInterest() {
  const ctx = useContext(InterestContext)
  if (!ctx) throw new Error('useInterest must be used inside <InterestProvider>')
  return ctx
}

/**
 * One piece of shared state: which kind of interest the visitor is registering.
 *
 * It exists so the footer's shortcuts can arrive at the form with the right
 * option already chosen - the same "a link should always land somewhere
 * useful" rule the portfolio's filter shortcuts followed, applied to the only
 * destination a pre-launch site has.
 */
export function InterestProvider({ children }: PropsWithChildren) {
  const [interest, setInterestState] = useState<Interest>('Buying')
  const setInterest = useCallback((v: Interest) => setInterestState(v), [])
  const value = useMemo(() => ({ interest, setInterest }), [interest, setInterest])
  return <InterestContext.Provider value={value}>{children}</InterestContext.Provider>
}
