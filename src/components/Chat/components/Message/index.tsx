import AudioPlayer from '@/components/AudioPlayer'
import { MessageType } from '@/modules/firebase/firestoreDoc'
import type Storage from '@/modules/firebase/storage'
import { ListItem, ListItemText, Paper } from '@mui/material'
import moment from 'moment'
import React from 'react'

type MessageProps = {
  msg: MessageType
  right: boolean
  storage: Storage
}

function Message({ msg, right, storage }: MessageProps) {
  const message = msg.message
  const time = moment(msg.time).format('hh:mm')
  const type = msg?.type || 'text'
  const shortPath = msg?.shortPath || null

  const align = { textAlign: right ? 'right' : 'left' }
  const spacing = {
    padding: '4px 12px',
    maxWidth: '70%',
    marginLeft: right ? 'auto' : undefined,
    backgroundColor: right ? '#f6f6f6' : '#fff',
  }

  const [url, setUrl] = React.useState('')

  React.useEffect(() => {
    if (shortPath) storage.getDownloadURL(shortPath).then(setUrl)
  }, [shortPath])

  if (type === 'audio' && shortPath) {
    return <AudioPlayer src={url} />
  }

  return (
    <ListItem key={time}>
      <Paper sx={spacing}>
        <ListItemText primary={message} sx={align} />
        <ListItemText secondary={time} sx={align} />
      </Paper>
    </ListItem>
  )
}

export default Message
