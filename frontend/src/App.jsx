import io from 'socket.io-client'
import { useState, useEffect } from 'react'

// eslint-disable-next-line no-unused-vars
const socket = io("/")

export default function App() {

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    myForm.reset()

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
    <div className='h-screen bg-zinc-800 text-neutral-100 flex items-center justify-center'>
      <form id='myForm' onSubmit={handleSubmit} className='bg-zinc-900 p-10 flex flex-col gap-2 rounded-xl'>
        <h1 className='text-2xl font-bold ml-1'>React Chat</h1>
        <input type='text' placeholder='Write your message ...'
          onChange={(e) => setMessage(e.target.value)}
          className='border-none rounded-md border-zinc-500 p-2 w-full bg-zinc-800 text-neutral-100 outline-none focus:shadow-teal-800 shadow-md transition-all ease-in-out duration-500'/>
        
        <ul>
          {messages.map((message, i) => (
            <li key={i} className={
              `my-2 p-2 table text-md font-medium rounded-md ${message.from === 'Me' ? 'bg-sky-950 ml-auto': 'bg-sky-700'}`
            }>
              <span className='text-xs font-medium text-teal-300 block'>{message.from}</span><span className='text-md'>{message.body}</span>
            </li>
          ))}
        </ul>

        <button className='py-2 px-4 w-1/3 bg-teal-800 hover:bg-teal-900 hover:shadow-teal-400 shadow-lg font-bold rounded-md transition-all ease-in-out duration-500' type='submit'>
          Send
        </button>
      </form>
    </div>
  )
}
