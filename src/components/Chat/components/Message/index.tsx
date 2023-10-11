import AudioPlayer from '@/components/AudioPlayer'
import { MessageType } from '@/modules/firebase/firestoreDoc'
import type Storage from '@/modules/firebase/storage'

import { ListItem, ListItemText, Paper } from '@mui/material'
import moment from 'moment'
import React from 'react'
import './index.css'
import ImageViewer from '@/components/ImageViewer'
import PDFViewer from '@/components/PDFViewer'

type MessageProps = {
  msg: MessageType
  right: boolean
  storage: Storage
}

function Message({ msg, right, storage }: MessageProps) {
  const [file, setFile] = React.useState<Blob | null>(null)

  const message = msg.message
  const time = moment(msg.time).format('hh:mm')
  const type = msg?.type || 'text'
  const shortPath = msg?.shortPath || null
  const audioType = type === 'audio' && shortPath
  const imageType = type === 'image' && shortPath
  const pdfType = type === 'pdf' && shortPath

  const align = { textAlign: right ? 'right' : 'left', fontSize: '20px' }
  const spacing = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: '6px',
    padding: audioType ? '0px 4px' : '4px 12px',
    maxWidth: '70%',
    marginLeft: right ? 'auto' : undefined,
    backgroundColor: right ? '#f6f6f6' : '#fff',
  }

  React.useEffect(() => {
    if (shortPath) storage.getFile(shortPath).then((blob) => setFile(blob))
  }, [shortPath])

  return (
    <ListItem key={time}>
      <Paper sx={spacing}>
        {!audioType && !imageType && !pdfType && <ListItemText primary={message} sx={align} />}

        {audioType && <ListItemText primary={<AudioPlayer src={file} />} sx={align} />}

        {imageType && (
          <ListItemText primary={<ImageViewer src={file} msg={message} />} sx={align} />
        )}

        {pdfType && <ListItemText primary={<PDFViewer src={file} msg={message} />} sx={align} />}

        <ListItemText secondary={time} sx={align} />
      </Paper>
    </ListItem>
  )
}

export default Message
