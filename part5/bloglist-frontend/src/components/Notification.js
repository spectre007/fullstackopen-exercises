import React from 'react'


export const Notification = ({ status }) => {
  const text = status && status.text
  if (!text) return null

  return (
    <div className={status.type}>
    {text}
    </div>
  )
}

