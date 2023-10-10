import React from 'react'

function AudioPlayer({ audio }: { audio: Blob }) {
  const url = React.useMemo(() => URL.createObjectURL(audio), [audio])

  return (
    <audio controls>
      <source src={url} type='audio/mpeg' />
      Your browser does not support the audio element.
    </audio>
  )
}

export default AudioPlayer
