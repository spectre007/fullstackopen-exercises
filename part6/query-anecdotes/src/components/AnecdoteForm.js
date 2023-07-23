import { useMutation, useQueryClient } from "react-query"
import { useMessageDispatch } from "../context"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
  })
  const messageDispatch = useMessageDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const anecdote = { content, votes: 0 }
    newAnecdoteMutation.mutate(anecdote)
    event.target.anecdote.value = ''
    messageDispatch({ type: 'CREATE_ANECDOTE', payload: anecdote})
    setTimeout(() => messageDispatch({ type: 'HIDE_MESSAGE' }), 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
