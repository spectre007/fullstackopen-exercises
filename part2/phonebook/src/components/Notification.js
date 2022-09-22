import React from "react"


const Notification = ({ payload }) => {
  if (Object.keys(payload).length === 0) { return null}

  return (
    <div className={payload.type}>
      {payload.message}
    </div>
  )
}

export default Notification
