import { Box } from '@mui/material'
import { saveAs } from 'file-saver'
import DescriptionIcon from '@mui/icons-material/Description'
import './index.css'

function PDFViewer({ src, msg }: { src: Blob | null; msg: string }) {
  const handleSave = () => (src ? saveAs(src, 'doc.pdf') : false)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <DescriptionIcon onClick={handleSave} fontSize='large' />
      {msg}
    </Box>
  )
}

export default PDFViewer
