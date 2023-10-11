import React from 'react'

function AudioPlayer({ src }: { src: Blob | null }) {
  const url = React.useMemo(() => (src ? URL.createObjectURL(src) : ''), [src])

  if (!src) return <audio />

  return (
    <audio controls>
      <source src={url} type='audio/mpeg' />
      Your browser does not support the audio element.
    </audio>
  )
}

export default AudioPlayer
