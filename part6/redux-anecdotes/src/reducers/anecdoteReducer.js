import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
    appendAnecdote(state, action) {
      state.push(action.payload)
      return state.sort(compareByVotes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdoteText) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(anecdoteText)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.voteAnecdote(id)
    dispatch(vote(id))
  }
}

export default anecdoteSlice.reducer
export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
