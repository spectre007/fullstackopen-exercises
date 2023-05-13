import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const compareByVotes = (a, b) => a.votes - b.votes

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const anecdoteToChange = state.find((a) => a.id === action.payload)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.filter((a) => a.id !== action.payload).concat(changedAnecdote).sort(compareByVotes)
    },
    createAnecdote(state, action) {
      state.push(asObject(action.payload))
      return state.sort(compareByVotes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export default anecdoteSlice.reducer
export const { vote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
