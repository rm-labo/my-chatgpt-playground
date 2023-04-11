import React, { createContext, useContext, ReactNode } from 'react'
import { useDrawer } from '@/hooks/useDrawer'

const DrawerContext = createContext({} as ReturnType<typeof useDrawer>)

type Props = {
  children?: ReactNode
}

export const DrawerProvider: React.FC<Props> = ({ children }) => {
  const drawer = useDrawer()

  return <DrawerContext.Provider value={drawer}>{children}</DrawerContext.Provider>
}

export const useDrawerState = () => {
  return useContext(DrawerContext)
}
