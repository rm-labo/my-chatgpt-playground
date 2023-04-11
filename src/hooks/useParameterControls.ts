import { useReducer } from 'react'
import { ChatCompletionOptionType } from '@/types/custom'

type Action =
  | { type: 'setModel'; model: string }
  | { type: 'setMessages'; messages: Array<string> }
  | { type: 'setTemperature'; temperature: number }
  | { type: 'setTopP'; top_p: number }
  | { type: 'setN'; n: number }
  | { type: 'setStream'; stream: boolean }
  | { type: 'setStop'; stop: string | Array<string> | null }
  | { type: 'setMaxTokens'; max_tokens: number }
  | { type: 'setPresencePenalty'; presence_penalty: number }
  | { type: 'setFrequencyPenalty'; frequency_penalty: number }
  | { type: 'setLogitBias'; logit_bias: { [key: number]: number } }
  | { type: 'setUser'; user: string }

const reducer = (state: ChatCompletionOptionType, action: Action): ChatCompletionOptionType => {
  switch (action.type) {
    case 'setModel':
      return { ...state, model: action.model }
    case 'setMessages':
      return { ...state, messages: action.messages }
    case 'setTemperature':
      return { ...state, temperature: action.temperature }
    case 'setTopP':
      return { ...state, top_p: action.top_p }
    case 'setN':
      return { ...state, n: action.n }
    case 'setStream':
      return { ...state, stream: action.stream }
    case 'setStop':
      return { ...state, stop: action.stop }
    case 'setMaxTokens':
      return { ...state, max_tokens: action.max_tokens }
    case 'setPresencePenalty':
      return { ...state, presence_penalty: action.presence_penalty }
    case 'setFrequencyPenalty':
      return { ...state, frequency_penalty: action.frequency_penalty }
    case 'setLogitBias':
      return { ...state, logit_bias: action.logit_bias }
    case 'setUser':
      return { ...state, user: action.user }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const useParameterControls = (initialOption: ChatCompletionOptionType) => {
  const [chatCompletionOption, dispatch] = useReducer(reducer, initialOption)

  const setModel = (model: string) => dispatch({ type: 'setModel', model })
  const setMessages = (messages: Array<string>) => dispatch({ type: 'setMessages', messages })
  const setTemperature = (temperature: number) => dispatch({ type: 'setTemperature', temperature })
  const setTopP = (top_p: number) => dispatch({ type: 'setTopP', top_p })
  const setN = (n: number) => dispatch({ type: 'setN', n })
  const setStream = (stream: boolean) => dispatch({ type: 'setStream', stream })
  const setStop = (stop: string | Array<string> | null) => dispatch({ type: 'setStop', stop })
  const setMaxTokens = (max_tokens: number) => dispatch({ type: 'setMaxTokens', max_tokens })
  const setPresencePenalty = (presence_penalty: number) => dispatch({ type: 'setPresencePenalty', presence_penalty })
  const setFrequencyPenalty = (frequency_penalty: number) =>
    dispatch({ type: 'setFrequencyPenalty', frequency_penalty })
  const setLogitBias = (logit_bias: { [key: number]: number }) => dispatch({ type: 'setLogitBias', logit_bias })
  const setUser = (user: string) => dispatch({ type: 'setUser', user })

  return {
    chatCompletionOption,
    setModel,
    setMessages,
    setTemperature,
    setTopP,
    setN,
    setStream,
    setStop,
    setMaxTokens,
    setPresencePenalty,
    setFrequencyPenalty,
    setLogitBias,
    setUser,
  }
}

export default useParameterControls
