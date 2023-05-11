import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter) {
      return anecdotes.filter((anecdote) => anecdote.content.includes(filter))
    }
    return anecdotes
  })


  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
  </>
  )
}

export default AnecdoteList
