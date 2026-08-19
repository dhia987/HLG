import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { emptyCriteria, matches, properties, type Criteria } from '../data/properties'

type Ctx = {
  /** The portfolio's own filter state. */
  criteria: Criteria
  setCriterion: <K extends keyof Criteria>(key: K, value: Criteria[K]) => void
  resetCriteria: () => void
  results: typeof properties
  /** Pre-selects the enquiry type when the contact form is reached. */
  contactIntent: string
  setContactIntent: (v: string) => void
}

const SearchContext = createContext<Ctx | null>(null)

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used inside <SearchProvider>')
  return ctx
}

/**
 * The portfolio's filter state, plus the contact form's enquiry type so the
 * Sell section can pre-select it before handing the visitor over.
 */
export function SearchProvider({ children }: PropsWithChildren) {
  const [criteria, setCriteria] = useState<Criteria>(emptyCriteria)
  const [contactIntent, setContactIntent] = useState('Buy')

  const setCriterion = useCallback<Ctx['setCriterion']>((key, value) => {
    setCriteria((c) => {
      const next = { ...c, [key]: value }
      // Sale and rental budgets are different scales, so the band cannot carry.
      if (key === 'listing') next.band = 'any'
      return next
    })
  }, [])

  const resetCriteria = useCallback(
    () => setCriteria((c) => ({ ...emptyCriteria, listing: c.listing })),
    [],
  )

  const results = useMemo(() => properties.filter((p) => matches(p, criteria)), [criteria])

  const value = useMemo(
    () => ({
      criteria,
      setCriterion,
      resetCriteria,
      results,
      contactIntent,
      setContactIntent,
    }),
    [criteria, setCriterion, resetCriteria, results, contactIntent],
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}
