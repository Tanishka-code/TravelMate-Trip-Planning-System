import { useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { AuthContext } from '../Context/AuthContext'
import { SOCKET_URL } from '../api'

function Chat({ onNavigate }) {
  const socketRef = useRef(null)
  const { currentUser } = useContext(AuthContext)

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ['websocket', 'polling'] })
    socketRef.current = socket

    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))
    socket.on('connect_error', () => setConnected(false))
    socket.on('chatMessage', (data) => {
      setMessages((previous) => [...previous, data])
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  const username = currentUser?.name || 'Traveler'

  const sendMessage = (event) => {
    event.preventDefault()

    if (!message.trim() || !connected || !socketRef.current) {
      return
    }

    const socketMessage = {
      username: username.trim(),
      message: message.trim()
    }

    socketRef.current.emit('chatMessage', socketMessage)
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <nav className="mx-auto mb-6 max-w-2xl rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-between px-5 py-4">
          <button type="button" onClick={() => onNavigate?.('/dashboard')} className="text-xl font-bold text-blue-600">TravelMate</button>
          <div className="flex gap-3 text-sm">
            <button type="button" onClick={() => onNavigate?.('/dashboard')} className="text-gray-600 hover:text-blue-600">Home</button>
            <button type="button" onClick={() => onNavigate?.('/destinations')} className="text-gray-600 hover:text-blue-600">Destinations</button>
            <button type="button" onClick={() => onNavigate?.('/my-trips')} className="text-gray-600 hover:text-blue-600">Trips</button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Community Chat</h1>
        <p className="mt-2 text-sm text-gray-600">Signed in as <span className="font-medium text-blue-600">{username}</span></p>

        <p className={`mt-2 text-sm font-medium ${connected ? 'text-green-600' : 'text-red-600'}`}>
          {connected ? 'Connected to live chat' : 'Connecting to server...'}
        </p>

        <div className="mt-5 h-80 overflow-y-auto rounded-md border border-gray-200 bg-gray-50 p-4">
          {messages.length === 0 ? (
            <p className="text-sm text-gray-500">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((item, index) => (
              <div key={`${index}-${item.username}-${item.message}`} className="mb-3 rounded-md bg-white p-3 shadow-sm">
                <p className="break-words text-sm text-gray-800">
                  <strong>{item.username}:</strong> {item.message}
                </p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={sendMessage} className="mt-4 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type a message..."
            maxLength={1000}
            className="min-w-0 flex-1 rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={!connected || !message.trim()}
            className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat