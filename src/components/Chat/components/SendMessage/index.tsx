import React from 'react'
import moment from 'moment'
import Button from '@/components/Button'
import { Box, TextField } from '@mui/material'

import SendIcon from '@mui/icons-material/Send'
import ClipIcon from '@mui/icons-material/AttachFile'
import AudioRecorder from '@/components/AudioRecorder'

import type FirestoreDoc from '@/modules/firebase/firestoreDoc'
import type { Storage } from '@/modules/firebase/storage'
import { sendCSS } from '../../css'
import { uuid } from '@/utils/uuid'

type SendMessageProps = {
  firestore: FirestoreDoc
  storage: Storage
  doc: string
}

function SendMessage({ firestore, storage, doc }: SendMessageProps) {
  const [message, setMessage] = React.useState('')
  const [attach, setAttach] = React.useState<File | null>(null)
  const inputID = React.useMemo(() => uuid(40), [])

  const sendMessage = async () => {
    const ext = attach?.name.split('.').pop() || ''
    const folder = ext === 'pdf' ? 'doc' : 'photo'
    const type = ext === 'pdf' ? 'pdf' : 'image'

    const shortPath = attach ? await handleUpdateFile(attach, folder, ext) : ''
    await firestore.sendMessage(message, { shortPath, type })

    setMessage('')
    setAttach(null)
  }

  const handleUpdateFile = async (file: Blob | File, folder: string, ext: string) => {
    const fileName = (+moment()).toString()
    const shortPath = `${doc}/${folder}/${fileName}.${ext}`

    await storage.uploadFile(shortPath, file)

    return shortPath
  }

  const onRecordComplete = async (file: Blob | File) => {
    const shortPath = await handleUpdateFile(file, 'audio', 'mp3')
    await firestore.sendAudio(shortPath)
  }

  const handleKeys = (e: any) => {
    if (e.key === 'Enter') return sendMessage()
  }

  return (
    <Box sx={sendCSS}>
      <Button variant={!attach ? 'outlined' : 'contained'}>
        <input
          type='file'
          id={inputID}
          style={{ display: 'none' }}
          onChange={(e: any) => setAttach(e.target.files[0])}
        />
        <ClipIcon onClick={() => document.getElementById(inputID)?.click()} />
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
