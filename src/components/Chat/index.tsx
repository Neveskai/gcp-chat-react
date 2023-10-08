import React from 'react'
import { Moment } from 'moment'
import Message from './components/Message'
import ChatAvatar from './components/Avatar'

import { Box, Container, List, Paper, TextField, Typography } from '@mui/material'
import { listCSS, mainCSS, sendCSS } from './css'

type ChatProps = {
  messages: {
    message: string
    time: Moment
    right?: boolean
  }[]
}

function Chat({ messages }: ChatProps) {
  const [message, setMessage] = React.useState('')

  const parsedMessages = { hoje: messages }

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
                {key as string}
              </Typography>
              {parsedMessages[key as keyof typeof parsedMessages].map((msg) => (
                <Message {...msg} time={msg.time.format('hh:mm')} key={msg.time.format()} />
              ))}
            </div>
          ))}
        </List>

        <Box sx={sendCSS}>
          <TextField fullWidth value={message} onChange={(e: any) => setMessage(e.target.value)} />
        </Box>
      </Box>
    </Container>
  )
}

export default Chat
