import io from 'socket.io-client'
import { useState, useEffect } from 'react'

// eslint-disable-next-line no-unused-vars
const socket = io("/")

export default function App() {

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([...messages, newMessage])
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', receiveMessage)

    return () => {
      socket.off('message', receiveMessage)
    }
  }, [])

  const receiveMessage = (message) => setMessages((state) => [...state, message])

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
          <li key={i}>
            {message.from}:{message.body}
          </li>
        ))}
      </ul>
    </div>
  )
}
