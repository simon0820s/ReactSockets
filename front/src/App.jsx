import io from 'socket.io-client'

const socket = io("http://localhost:3000")

export default function App() {
  return (
    <div>Hello World</div>
  )
}
