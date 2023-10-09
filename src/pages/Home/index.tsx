import React from 'react'
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
        <Chat doc={user?.user?.email as string} />
        <Chat doc={user?.user?.email as string} />
      </Box>
    </Container>
  )
}

export default HomePage
