import io from 'socket.io-client'
import { useState, useEffect } from 'react'

// eslint-disable-next-line no-unused-vars
const socket = io("/")

export default function App() {

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessages([...messages, message])
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('arriveMessage', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Write your message ...'
          onChange={(e) => setMessage(e.target.value)} />
        <button type='submit'>
          Send
        </button>
      </form>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
    </div>
  )
}
