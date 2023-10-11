import React from 'react'
import { saveAs } from 'file-saver'
import { Box } from '@mui/material'
import './index.css'

function ImageViewer({ src, msg }: { src: Blob | null; msg: string }) {
  const url = React.useMemo(() => (src ? URL.createObjectURL(src) : ''), [src])

  const handleSave = () => (src ? saveAs(src, 'doc.pdf') : false)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <img src={url} alt='image-view' className='image-viewer' onClick={handleSave} />
      {msg}
    </Box>
  )
}

export default ImageViewer
