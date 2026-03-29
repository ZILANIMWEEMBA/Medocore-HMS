import React from 'react'

export default function Avatar({ initials, color, size = 34, fontSize = 12 }) {
  return (
    <div className="avatar" style={{
      width: size, height: size, fontSize, background: color + '22',
      color, border: `1.5px solid ${color}44`, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}
