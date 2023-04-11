import { createContext, useContext } from 'react'
import useParameterControls from '../hooks/useParameterControls'
import { ChatCompletionOptionType } from '@/types/custom'

type ParameterControlsContextType = ReturnType<typeof useParameterControls>

const ParameterControlsContext = createContext<ParameterControlsContextType | undefined>(undefined)

export const useParameterControlsContext = () => {
  const context = useContext(ParameterControlsContext)
  if (!context) {
    throw new Error('useParameterControlsContext must be used within a ParameterControlsProvider')
  }
  return context
}

type ParameterControlsProviderProps = {
  initialOption: ChatCompletionOptionType
  children: React.ReactNode
}

export const ParameterControlsProvider: React.FC<ParameterControlsProviderProps> = ({ initialOption, children }) => {
  const parameterControls = useParameterControls(initialOption)
  return <ParameterControlsContext.Provider value={parameterControls}>{children}</ParameterControlsContext.Provider>
}
