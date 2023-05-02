import { useDispatch, useSelector } from "react-redux"
import { doVote } from "../reducers/anecdoteReducer"


export const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter) {
      return anecdotes.filter((anecdote) => anecdote.content.includes(filter))
    }
    return anecdotes
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(doVote(id))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
  </>
  )
}