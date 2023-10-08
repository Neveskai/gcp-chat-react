import React from 'react'
import { ListItem, ListItemText, Paper } from '@mui/material'

type MessageProps = {
  message: string
  time: string
  right?: boolean
}

function Message({ message, time, right }: MessageProps) {
  const align = { textAlign: right ? 'right' : 'left' }
  const spacing = {
    padding: '4px 12px',
    maxWidth: '70%',
    marginLeft: right ? 'auto' : undefined,
    backgroundColor: right ? '#f6f6f6' : '#fff',
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
