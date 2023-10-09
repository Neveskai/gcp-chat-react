import React from 'react'
import router from '@/router'
import firestoreAdapter from '@/modules/firebase'
import { CircularProgress } from '@mui/material'
import { RouterProvider } from 'react-router-dom'

const waitAuth = firestoreAdapter.init()

export default function App() {
  const [fbInitialized, setFbInitialized] = React.useState(false)

  const waitFirebase = async () => {
    await waitAuth

    setFbInitialized(true)
  }

  React.useEffect(() => {
    waitFirebase()
  }, [])

  if (!fbInitialized) return <CircularProgress />

  return <RouterProvider router={router} />
}
