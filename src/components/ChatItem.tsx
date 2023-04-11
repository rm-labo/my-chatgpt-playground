import { Avatar, Tooltip } from '@mantine/core'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ASSISTANT_NAME, ASSISTANT_AVATAR_URL, USER_NAME, USER_AVATAR_URL } from '@/constants'
import { Message, MessageWithDebug } from '@/types/custom'

export const ChatItem = ({ content, role, debug }: MessageWithDebug) => {
  const [chatMessage, setChatMessage] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeoutId = setTimeout(() => {
        setChatMessage((prevText) => prevText + content[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, 80)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [content, currentIndex])

  return (
    <motion.div
      style={{
        alignSelf: role === 'assistant' ? 'flex-start' : 'flex-end',
        width: 'auto',
      }}
      initial={{
        opacity: 0,
        translateY: '100%',
      }}
      animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, translateY: 0 }}
    >
      <div className={`flex items-start gap-4 w-full mt-6 ${role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}>
        <Tooltip label={role === 'user' ? 'Me' : 'Loris'} withArrow>
          <Avatar size={40} radius={20} src={role === 'assistant' ? ASSISTANT_AVATAR_URL : USER_AVATAR_URL} />
        </Tooltip>
        <div
          className={`flex flex-col grow gap-2 p-4 w-auto text-sm bg-white ${
            role === 'assistant'
              ? 'rounded-tr-2xl rounded-bl-2xl rounded-br-2xl'
              : 'rounded-tl-2xl rounded-bl-2xl rounded-br-2xl'
          }`}
        >
          {role === 'assistant' && <div className="text-xs opacity-50">{ASSISTANT_NAME}</div>}
          {role === 'user' && <div className="text-xs opacity-50">{USER_NAME}</div>}
          {debug && (
            <div className="text-xs opacity-50">
              <div>usage: {JSON.stringify(debug, null, 2)}</div>
            </div>
          )}
          {role === 'assistant' ? chatMessage || '' : content || ''}
        </div>
      </div>
    </motion.div>
  )
}
