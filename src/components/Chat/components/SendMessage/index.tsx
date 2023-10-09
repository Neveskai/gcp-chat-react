import React from 'react'
import Button from '@/components/Button'
import SendIcon from '@mui/icons-material/Send'
import type FirestoreDoc from '@/modules/firebase/firestoreDoc'

import { Box, TextField } from '@mui/material'
import { sendCSS } from '../../css'
import AudioRecorder from '@/components/AudioRecorder'

type SendMessageProps = {
  firestore: FirestoreDoc
}

function SendMessage({ firestore }: SendMessageProps) {
  const [message, setMessage] = React.useState('')

  const sendMessage = async () => {
    await firestore.sendMessage(message)

    setMessage('')
  }

  const handleKeys = (e: any) => {
    if (e.key === 'Enter') return sendMessage()
  }

  return (
    <Box sx={sendCSS}>
      <TextField
        fullWidth
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        onKeyUp={handleKeys}
      />
      {!!message && (
        <Button variant='outlined' disabled={!message} onClick={sendMessage}>
          <SendIcon />
        </Button>
      )}
      {!message && <AudioRecorder />}
    </Box>
  )
}

export default SendMessage
