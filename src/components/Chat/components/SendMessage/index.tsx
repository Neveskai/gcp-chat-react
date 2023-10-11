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
  const [attach, setAttach] = React.useState<File | null>(null)
  const [sending, setSending] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [sendAsClient, setSendAsClient] = React.useState<boolean>(false)

  const inputID = React.useMemo(() => uuid(40), [])

  const sendMessage = async () => {
    setSending(true)

    const ext = attach?.name.split('.').pop() || ''
    const folder = ext === 'pdf' ? 'doc' : 'photo'
    const type = ext === 'pdf' ? 'pdf' : 'image'

    const shortPath = attach ? await handleUpdateFile(attach, folder, ext) : ''

    sendAsClient
      ? await firestore.sendMessageAsClient(message, { shortPath, type })
      : await firestore.sendMessage(message, { shortPath, type })

    setAttach(null)
    setMessage('')

    setSending(false)
  }

  const onRecordComplete = async (file: Blob | File) => {
    setSending(true)

    const shortPath = await handleUpdateFile(file, 'audio', 'mp3')

    sendAsClient
      ? await firestore.sendAudioAsClient(shortPath)
      : await firestore.sendAudio(shortPath)

    setSending(false)
  }

  const handleUpdateFile = async (file: Blob | File, folder: string, ext: string) => {
    const fileName = (+moment()).toString()
    const shortPath = `${doc}/${folder}/${fileName}.${ext}`

    await storage.uploadFile(shortPath, file)

    setAttach(null)

    return shortPath
  }

  const handleKeys = (e: any) => {
    if (e.key === 'Enter') return sendMessage()
  }

  const handleSwitch = () => {
    setSendAsClient(!sendAsClient)
  }

  return (
    <Box sx={{ padding: '10px 14px' }}>
      <Box sx={{ paddingBottom: '5px', display: 'flex', gap: '5px' }}>
        <Button
          variant={!sendAsClient ? 'outlined' : 'contained'}
          onClick={handleSwitch}
          sx={{ fontSize: '13px', lineHeight: 1.5 }}
        >
          Enviar como resposta
        </Button>

        <Button variant={!attach ? 'outlined' : 'contained'}>
          <input
            type='file'
            id={inputID}
            style={{ display: 'none' }}
            onChange={(e: any) => setAttach(e.target.files[0])}
          />
          <ClipIcon
            sx={{ fontSize: '19.5px' }}
            onClick={() => document.getElementById(inputID)?.click()}
          />
        </Button>
      </Box>

      <Box sx={sendCSS}>
        <TextField
          fullWidth
          value={message}
          onChange={(e: any) => setMessage(e.target.value)}
          onKeyUp={handleKeys}
        />

        {(!!message || attach) && (
          <Button
            variant='outlined'
            disabled={!(message || attach) || sending}
            onClick={sendMessage}
          >
            <SendIcon />
          </Button>
        )}

        {!message && !attach && <AudioRecorder onRecordComplete={onRecordComplete} />}
      </Box>
    </Box>
  )
}

export default SendMessage
