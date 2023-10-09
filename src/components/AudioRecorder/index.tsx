import { Box, Typography } from '@mui/material'
import { AudioRecorder as AudioRecord, useAudioRecorder } from 'react-audio-voice-recorder'

import VoiceIcon from '@mui/icons-material/KeyboardVoice'
import PauseIcon from '@mui/icons-material/Pause'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Button from '@/components/Button'

import './index.css'
import React from 'react'

const formatTime = (time: number) => {
  let seconds = Math.floor(time)
  let minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  seconds -= minutes * 60
  minutes -= hours * 60

  return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`
}

function AudioRecorder() {
  const recorderControls = useAudioRecorder()
  const [canceled, setCanceled] = React.useState(false)

  const onRecordComplete = (blob: Blob) => {
    if (canceled) return setCanceled(false)

    console.log(blob)
    return blob
  }

  const onRecordCancel = () => {
    setCanceled(true)

    recorderControls.stopRecording()
  }

  const isRecording = recorderControls.isRecording
  const isPaused = recorderControls.isPaused

  return (
    <Box sx={{ display: 'flex' }}>
      <AudioRecord
        onRecordingComplete={onRecordComplete}
        recorderControls={recorderControls}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        showVisualizer={true}
        downloadFileExtension='mp3'
      />

      {!isRecording && (
        <Button variant='outlined' onClick={recorderControls.startRecording}>
          <VoiceIcon />
        </Button>
      )}

      {isRecording && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            border: '1px solid #c6c6c6',
            borderRadius: '4px',
          }}
        >
          <Button onClick={onRecordCancel}>
            <DeleteIcon />
          </Button>

          <Typography sx={{ marginTop: '2px', width: '64px', textAlign: 'center' }}>
            {formatTime(recorderControls.recordingTime)}
          </Typography>

          <Button onClick={recorderControls.togglePauseResume} color='error'>
            {!isPaused ? <PauseIcon /> : <VoiceIcon />}
          </Button>

          <Button onClick={recorderControls.stopRecording}>
            <SendIcon />
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default AudioRecorder
