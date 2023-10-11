import React from 'react'
import moment from 'moment'
import Message from './components/Message'
import ChatAvatar from './components/Avatar'

import { Box, List, Paper, Typography } from '@mui/material'
import { listCSS, mainCSS } from './css'

import Storage from '@/modules/firebase/storage'
import FirestoreDoc, { MessageType } from '@/modules/firebase/firestoreDoc'
import SendMessage from './components/SendMessage'
import { uuid } from '@/utils/uuid'

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

const scrollMessages = (id: string) => {
  const chatArea = document.querySelector(`#${id}`) as HTMLElement

  if (chatArea) return chatArea.scrollTo({ behavior: 'smooth', top: chatArea.scrollHeight })
}

function Chat({ doc, owner }: ChatProps) {
  const [messages, setMessages] = React.useState([])

  const parsedMessages = React.useMemo(() => getParsedMessages(messages), [messages])
  const firestore = React.useMemo(() => new FirestoreDoc('owner-client-chat', doc, owner), [])
  const storage = React.useMemo(() => new Storage(), [])
  const listID = React.useMemo(() => uuid(40), [])

  React.useEffect(() => {
    firestore.getDocSnapshot(setMessages)
  }, [])

  React.useEffect(() => {
    scrollMessages(listID)
  }, [messages])

  return (
    <Box sx={mainCSS} component={Paper}>
      <ChatAvatar name={owner} image='https://www.svgrepo.com/show/5125/avatar.svg' />

      <List id={listID} sx={listCSS}>
        {Object.keys(parsedMessages).map((key: string) => (
          <div key={key}>
            <Typography
              component='h6'
              sx={{ width: '100%', textAlign: 'center', textTransform: 'capitalize' }}
            >
              {getDayName(key)}
            </Typography>

            {parsedMessages[key as keyof typeof parsedMessages].map((msg: MessageType) => (
              <Message msg={msg} storage={storage} right={msg.owner !== owner} key={msg.time} />
            ))}
          </div>
        ))}
      </List>

      <SendMessage firestore={firestore} storage={storage} doc={doc} />
    </Box>
  )
}

export default Chat
