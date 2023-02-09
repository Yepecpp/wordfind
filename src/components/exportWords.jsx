import propTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { DownloadBlob, ExportWords } from '../utils/exportwords';
import {
  Delete as DeleteIcon,
} from '@mui/icons-material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
const exportWords = ({ words }) => {
  const [exportState, setExportState] = useState('done');
  return (
    <Box>
      {exportState === 'done' ? (
        <Button className='export'
          onClick={() => ExportWords(words, setExportState)}
          disabled={words.length < 2}
          sx={{
            ":disabled": {color: "initial"},
          }}
          >
          Exportar Palabras{' '}
          <FileDownloadOutlinedIcon
            sx={{
              ml: 1,
            }}
          />
        </Button>
      ) : exportState === 'loading' ? (
        <Button disabled>Exportando...</Button>
      ) : null}
      {exportState.includes(',') ? (
        <>
          <Button onClick={() => DownloadBlob(exportState, setExportState)}>
            Descargar archivo
          </Button>
          <Button onClick={() => setExportState('done')}>
            <DeleteIcon />
          </Button>
        </>
      ) : null}
    </Box>
  );
};
exportWords.propTypes = {
  words: propTypes.arrayOf(propTypes.object).isRequired,
};
export default exportWords;
