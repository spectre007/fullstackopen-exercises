import { createSlice } from "@reduxjs/toolkit"

const compareByVotes = (a, b) => a.votes - b.votes

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
      state.push(action.payload)
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
