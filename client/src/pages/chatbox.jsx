import React, { useState, useRef, useEffect } from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/assets'
import { ImageIcon, SendHorizonal } from 'lucide-react'

const Chatbox = () => {
  const [messages, setMessages] = useState(dummyMessagesData)
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user, setUser] = useState(dummyUserData)

  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  const sendMessage = async () => {
    if (!text.trim() && !image) return

    const newMessage = {
      text,
      message_type: image ? 'image' : 'text',
      media_url: image ? URL.createObjectURL(image) : null,
      to_user_id: user._id,
      createdAt: new Date().toISOString(),
    }

    setMessages(prev => [...prev, newMessage])
    setText('')
    setImage(null)
  }

  useEffect(() => {
    if (!messagesContainerRef.current) return
    const container = messagesContainerRef.current
    container.scrollTop = container.scrollHeight
  }, [messages])

  return user && (
    <div className='flex flex-col h-screen'>
      {/* Top bar */}
      <div className='flex items-center gap-2 p-2 md:px-10 xl:pl-42 bg-linear-to-r from-orange-50 to-orange-100 border-b border-gray-300'>
        <img src={user.profile_picture} alt="" className='size-8 rounded-full' />
        <div>
          <p className='font-medium'>{user.full_name}</p>
          <p className='text-sm text-gray-500 -mt-1.5'>@{user.username}</p>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={messagesContainerRef}
        className='p-5 md:px-10 h-full overflow-y-scroll no-scrollbar'
      >
        <div className='space-y-4 max-w-4xl mx-auto'>
          {
            messages
              .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${message.to_user_id !== user._id ? 'items-start' : 'items-end'}`}
                >
                  <div className={`p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow ${message.to_user_id !== user._id ? 'rounded-bl-none' : 'rounded-tr-none'}`}>
                    {
                      message.message_type === 'image' &&
                      <img src={message.media_url} className='w-full max-w-sm rounded-lg mb-1' alt="" />
                    }
                    <p>{message.text}</p>
                  </div>
                </div>
              ))
          }
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input box */}
      <div className='px-4'>
        <div className='flex items-center gap-3 pl-5 p-1.5 bg-white w-full max-w-xl mx-auto border border-gray-200 shadow rounded-full mb-5'>
          <input
            type="text"
            className='flex-1 outline-none text-slate-700'
            placeholder='Type a message...'
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            onChange={e => setText(e.target.value)}
            value={text}
          />

          <label htmlFor="image">
            {
              image
                ? <img src={URL.createObjectURL(image)} alt="" className='h-8 rounded' />
                : <ImageIcon className='size-7 text-gray-400 cursor-pointer' />
            }
            <input
              type="file"
              id='image'
              accept="image/*"
              hidden
              onChange={e => setImage(e.target.files[0])}
            />
          </label>

          <button
            onClick={sendMessage}
            className='bg-linear-to-br from-orange-500 to-orange-600 hover:from-orange-700 hover:to-orange-800 active:scale-95 cursor-pointer text-white p-2 rounded-full'
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chatbox
