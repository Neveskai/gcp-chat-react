import React from 'react'
import moment from 'moment'
import Button from '@/components/Button'
import Message from './components/Message'
import ChatAvatar from './components/Avatar'

import { Box, Container, List, Paper, TextField, Typography } from '@mui/material'
import { listCSS, mainCSS, sendCSS } from './css'

import SendIcon from '@mui/icons-material/Send'

type MessageType = {
  message: string
  time: number
  right?: boolean
}

type ChatProps = {
  messages: MessageType[]
}

const today = moment().format('DD/MM/YYYY')
const yesterday = moment().add(-1, 'day').format('DD/MM/YYYY')

const getParsedMessages = (messages: MessageType[]) =>
  messages.reduce((res: any, message: MessageType) => {
    const pKey = moment(message.time).format('DD/MM/YYYY')

    if (!res[pKey]) res[pKey] = []

    res[pKey].push(message)

    return res
  }, {})

const getDayName = (date: string) => {
  if (date === today) return 'today'
  if (date === yesterday) return 'yesterday'

  return date
}

function Chat({ messages }: ChatProps) {
  const [message, setMessage] = React.useState('')

  const parsedMessages = React.useMemo(() => getParsedMessages(messages), [messages])

  const sendMessage = () => {
    console.log(message)

    setMessage('')
  }

  const handleKeys = (e: any) => {
    if (e.key === 'Enter') return sendMessage()
  }

  return (
    <Container>
      <Box sx={mainCSS} component={Paper}>
        <ChatAvatar name='John Wick' image='https://www.svgrepo.com/show/5125/avatar.svg' />

        <List sx={listCSS}>
          {Object.keys(parsedMessages).map((key: string) => (
            <div key={key}>
              <Typography
                component='h6'
                sx={{ width: '100%', textAlign: 'center', textTransform: 'capitalize' }}
              >
                {getDayName(key)}
              </Typography>

              {parsedMessages[key as keyof typeof parsedMessages].map((message: MessageType) => (
                <Message
                  {...message}
                  time={moment(message.time).format('hh:mm')}
                  key={message.time}
                />
              ))}
            </div>
          ))}
        </List>

        <Box sx={sendCSS}>
          <TextField
            fullWidth
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
            onKeyUp={handleKeys}
          />
          <Button variant='contained' disabled={!message} onClick={sendMessage}>
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Chat
