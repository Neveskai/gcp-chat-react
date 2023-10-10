import { Box } from '@mui/material'

function AudioPlayer({ src }: { src: string }) {
  return (
    <Box>
      <audio controls>
        <source src={src} type='audio' />
        Your browser does not support the audio element.
      </audio>
    </Box>
  )
}

export default AudioPlayer
