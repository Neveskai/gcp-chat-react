import React from 'react'

import FirebaseAuth from '@/modules/firebase/auth'
import user from '@/modules/user'
import Button from '@/components/Button'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'

import { Box, Container, CssBaseline, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import TextField from '@/components/TextField'
import { useForm } from '@/hooks/useForm'
import { formBox, mainBox, providersBox } from './css'
import { validateEmail } from '@/utils/email'

function LoginPage() {
  const navigate = useNavigate()
  const auth = React.useMemo(() => new FirebaseAuth(), [])

  const [loading, setLoading] = React.useState(false)

  const { register, values, canSubmit } = useForm({ email: '', password: '' })

  const authGoogleUser = async () => {
    setLoading(true)

    const success = await auth.authGoogleUser()
    if (success) navigate('/home')

    setLoading(false)
  }

  const authGithubUser = async () => {
    setLoading(true)

    const success = await auth.authGithubUser()
    if (success) navigate('/home')

    setLoading(false)
  }

  const authEmailUser = async () => {
    setLoading(true)

    const success = await auth.createUserWithEmail(values.email, values.password)
    if (success) navigate('/home')

    setLoading(false)
  }

  const emailValidate = (v: string) => {
    if (v.length < 10) return true
    if (!validateEmail(v)) return true

    return false
  }

  React.useEffect(() => {
    if (user.user) navigate('/home')
  }, [])

  return (
    <Container maxWidth='xs' sx={{ paddingTop: 16 }}>
      <CssBaseline />
      <Box sx={mainBox} component={Paper}>
        <Typography component='h1' variant='h5' sx={{ marginTop: 0 }}>
          Bem vindo ao GCP-Chat Demo
        </Typography>

        <Box sx={formBox}>
          <TextField
            label='Email'
            {...register('email', { required: true, validate: emailValidate })}
          />
          <TextField
            label='Senha'
            {...register('password', { required: true, validate: (v) => v.length < 6 })}
          />

          <Button variant='outlined' onClick={authEmailUser} disabled={!canSubmit || loading}>
            Autenticar
          </Button>
        </Box>

        <Box sx={providersBox}>
          <Button variant='outlined' onClick={authGoogleUser} disabled={loading}>
            <GoogleIcon />
          </Button>
          <Button variant='outlined' onClick={authGithubUser} disabled={loading}>
            <GitHubIcon />
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
