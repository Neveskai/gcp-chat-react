import React from 'react'
import Button from '@/components/Button'
import SendIcon from '@mui/icons-material/Send'
import ClipIcon from '@mui/icons-material/AttachFile'
import type FirestoreDoc from '@/modules/firebase/firestoreDoc'

import { Box, TextField } from '@mui/material'
import { sendCSS } from '../../css'
import AudioRecorder from '@/components/AudioRecorder'
import moment from 'moment'
import type { Storage } from '@/modules/firebase/storage'

type SendMessageProps = {
  firestore: FirestoreDoc
  storage: Storage
  doc: string
}

function SendMessage({ firestore, storage, doc }: SendMessageProps) {
  const [message, setMessage] = React.useState('')

  const sendMessage = async () => {
    await firestore.sendMessage(message)

    setMessage('')
  }

  const onRecordComplete = async (file: Blob | File) => {
    const shortPath = `${doc}/audio/${+moment().toString()}.mp3`

    await storage.uploadFile(shortPath, file)
    await firestore.sendAudio(shortPath)
  }

  const handleKeys = (e: any) => {
    if (e.key === 'Enter') return sendMessage()
  }

  return (
    <Box sx={sendCSS}>
      <Button variant='outlined'>
        <ClipIcon />
      </Button>

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

      {!message && <AudioRecorder onRecordComplete={onRecordComplete} />}
    </Box>
  )
}

export default SendMessage
