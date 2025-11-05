import { useState, useCallback } from 'react'

export const usePersistentSelection = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const toggleSelect = useCallback((id: number, select: boolean) => {
    setSelectedIds(prev => {
      const copy = new Set(prev)
      select ? copy.add(id) : copy.delete(id)
      return copy
    })
  }, [])

  const selectAll = useCallback((ids: number[]) => {
    setSelectedIds(prev => new Set([...prev, ...ids]))
  }, [])

  const deselectAll = useCallback((ids: number[]) => {
    setSelectedIds(prev => {
      const copy = new Set(prev)
      ids.forEach(id => copy.delete(id))
      return copy
    })
  }, [])

  const customSelect = useCallback((pageIds: number[], count: number) => {
    setSelectedIds(prev => {
      const copy = new Set(prev)
      pageIds.slice(0, count).forEach(id => copy.add(id))
      return copy
    })
  }, [])

  return { selectedIds, toggleSelect, selectAll, deselectAll, customSelect }
}
