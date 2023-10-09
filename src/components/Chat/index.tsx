import React from 'react'
import moment from 'moment'
import Button from '@/components/Button'
import Message from './components/Message'
import ChatAvatar from './components/Avatar'

import { Box, Container, List, Paper, TextField, Typography } from '@mui/material'
import { listCSS, mainCSS, sendCSS } from './css'

import SendIcon from '@mui/icons-material/Send'
import FirestoreDoc, { MessageType } from '@/modules/firebase/firestoreDoc'

type ChatProps = {
  doc: string
  owner: string
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
  if (date === today) return 'hoje'
  if (date === yesterday) return 'ontem'

  return date
}

function Chat({ doc, owner }: ChatProps) {
  const [message, setMessage] = React.useState('')
  const [messages, setMessages] = React.useState([])
  const firestore = React.useMemo(() => new FirestoreDoc('owner-client-chat', doc, owner), [])
  const parsedMessages = React.useMemo(() => getParsedMessages(messages), [messages])

  React.useEffect(() => {
    firestore.getDocSnapshot(setMessages)
  }, [])

  const sendMessage = async () => {
    await firestore.sendMessage(message)

    setMessage('')
  }

  const handleKeys = (e: any) => {
    if (e.key === 'Enter') return sendMessage()
  }

  return (
    <Container>
      <Box sx={mainCSS} component={Paper}>
        <ChatAvatar name={owner} image='https://www.svgrepo.com/show/5125/avatar.svg' />

        <List sx={listCSS}>
          {Object.keys(parsedMessages).map((key: string) => (
            <div key={key}>
              <Typography
                component='h6'
                sx={{ width: '100%', textAlign: 'center', textTransform: 'capitalize' }}
              >
                {getDayName(key)}
              </Typography>

              {parsedMessages[key as keyof typeof parsedMessages].map((msg: MessageType) => (
                <Message
                  message={msg.message}
                  right={msg.owner !== owner}
                  time={moment(msg.time).format('hh:mm')}
                  key={msg.time}
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
