import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { Box, Container } from '@mui/material'

import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Button from '@/components/Button'
import Chat from '@/components/Chat'

import user from '@/modules/user'
import FirebaseAuth from '@/modules/firebase/auth'
import { boxCSS } from './css'

function HomePage() {
  const navigate = useNavigate()
  const auth = React.useMemo(() => new FirebaseAuth(), [])

  const logoutUser = async () => {
    await auth.logoutUser()

    navigate('/')
  }

  const messages = [
    {
      message: 'E ai cara, beleza?',
      time: moment(),
    },
    {
      message: 'E ai, estou bem e você?',
      time: moment().add('minute', 1),
      right: true,
    },
    {
      message: 'legal, tbm tô bem, e as novidades?',
      time: moment().add('minute', 31),
    },
    {
      message: 'comprei um carro novo',
      time: moment().add('day', 1),
      right: true,
    },
  ]

  return (
    <Container>
      <Box sx={boxCSS}>
        Bem vindo <b>{user.user?.displayName || user.user?.email}</b>
        <Box sx={{ mt: 2 }}>
          <Button variant='outlined' onClick={logoutUser} sx={{ background: '#fff' }}>
            <ExitToAppIcon />
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Chat messages={messages} />
      </Box>
    </Container>
  )
}

export default HomePage
