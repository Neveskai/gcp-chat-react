import React from 'react'
import { Avatar, Box, Typography } from '@mui/material'

type ChatAvatarProps = {
  name: string
  image: string
}

function ChatAvatar({ name, image }: ChatAvatarProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px' }}>
      <Avatar alt={name} src={image} />
      <Typography variant='body1'>{name}</Typography>
    </Box>
  )
}

export default ChatAvatar
