import { useState, useCallback } from 'react'

export const useDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen)
  }, [])

  return {
    isDrawerOpen,
    toggleDrawer,
  }
}
