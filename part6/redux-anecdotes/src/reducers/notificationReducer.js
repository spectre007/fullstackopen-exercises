import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    _setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }
  },
})

/**
 * Action: Set notification on a timer.
 * @param {string} message - Notification message.
 * @param {number} sleep - Time notification should be shown in seconds.
 */
export const setNotification = (message, sleep) => {
  return (dispatch) => {
    dispatch(_setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, sleep * 1000)
  }
}

export const { _setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
