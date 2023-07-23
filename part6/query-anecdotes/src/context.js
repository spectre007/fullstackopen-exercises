import { createContext, useContext, useReducer } from 'react'

function messageReducer(state, action) {
  switch (action.type) {
    case 'VOTE':
      return `Anecdote '${action.payload?.content}' voted`

    case 'CREATE_ANECDOTE':
      return `New anecdote '${action.payload?.content}' created`

    case 'HIDE_MESSAGE':
      return ''

    case 'SHORT_ANECDOTE':
      return 'too short anecdote, must have length 5 or more'
  
    default:
      return state
  }
}

const MessageContext = createContext()

export const useMessage = () => {
  const messageAndDispatch = useContext(MessageContext)
  return messageAndDispatch[0]
}

export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(MessageContext)
  return messageAndDispatch[1]
}

function MessageContextProvider(props) {
  const [message, messageDispatch] = useReducer(messageReducer, '')

  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </MessageContext.Provider>
  )
}

export default MessageContextProvider