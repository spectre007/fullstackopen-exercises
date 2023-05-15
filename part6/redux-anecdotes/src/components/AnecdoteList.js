import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter) {
      return anecdotes.filter((anecdote) => anecdote.content.includes(filter))
    }
    return anecdotes
  })

  const handleVote = (a) => {
    dispatch(voteAnecdote(a.id));
    dispatch(setNotification(`you voted for '${a.content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
  </>
  )
}

export default AnecdoteList
