import { Box } from '@mui/material'
import { AudioRecorder as AudioRecord, useAudioRecorder } from 'react-audio-voice-recorder'
import VoiceIcon from '@mui/icons-material/KeyboardVoice'
import StopIcon from '@mui/icons-material/Stop'
import Button from '@/components/Button'

import './index.css'

function AudioRecorder() {
  const recorderControls = useAudioRecorder()

  const onRecordComplete = (blob: Blob) => {
    return blob
  }

  const isRecording = recorderControls.isRecording

  return (
    <Box sx={{ display: 'flex' }}>
      <AudioRecord
        onRecordingComplete={onRecordComplete}
        recorderControls={recorderControls}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadFileExtension='mp3'
      />

      {!isRecording && (
        <Button variant='outlined' onClick={recorderControls.startRecording}>
          <VoiceIcon />
        </Button>
      )}

      {isRecording && (
        <Button variant='outlined' onClick={recorderControls.stopRecording}>
          <StopIcon />
        </Button>
      )}
    </Box>
  )
}

export default AudioRecorder
