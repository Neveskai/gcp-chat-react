import React from 'react'

function AudioPlayer({ src }: { src: Blob }) {
  const url = React.useMemo(() => URL.createObjectURL(src), [src])

  return (
    <audio controls>
      <source src={url} type='audio/mpeg' />
      Your browser does not support the audio element.
    </audio>
  )
}

export default AudioPlayer
