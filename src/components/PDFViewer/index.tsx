import { Box } from '@mui/material'
import { saveAs } from 'file-saver'
import DescriptionIcon from '@mui/icons-material/Description'
import './index.css'

function PDFViewer({ src, msg }: { src: Blob; msg: string }) {
  const handleSave = () => saveAs(src, 'doc.pdf')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <DescriptionIcon onClick={handleSave} fontSize='large' />
      {msg}
    </Box>
  )
}

export default PDFViewer
