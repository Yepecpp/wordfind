import { Container, Box, Button, Typography, Alert } from '@mui/material';
import FormWords from '../components/formWords';
import Moment from 'moment';
import {
  Delete as DeleteIcon,
  Replay as ReplayIcon,
} from '@mui/icons-material';
import { useState } from 'react';
const CreateMatch = () => {
  const [words, setWords] = useState([
    {
      q: '',
      a: '',
    },
  ]);
  const [exportState, setExportState] = useState('done');
  const [importState, setImportState] = useState({
    status: 'done',
    text: 'Ready',
  });
  const ExportWords = () => {
    // export the words to a json file and download it
    setExportState('loading');
    const wordsJSON = JSON.stringify(words);
    const blob = new Blob([wordsJSON], { type: 'application/json' });
    // await 5 seconds
    const url = URL.createObjectURL(blob);
    setExportState(['download', url].join(','));
  };
  const DownloadBlob = () => {
    const link = document.createElement('a');
    link.href = exportState.split(',')[1];
    link.download = `Palabras-${Moment().format('L')}.json`;
    link.click();
    setExportState('done');
  };
  const ImportWords = () => {
    // import the words from a json file and then set the words
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const wordsFrom = JSON.parse(e.target.result);
          if (!Array.isArray(wordsFrom)) {
            setImportState({
              status: 'error',
              text: 'Error al importar el archivo, comprueba que sea un arreglo',
            });
            return;
          }
          const validWords = wordsFrom.every(
            (word) => typeof word.q === 'string' && typeof word.a === 'string'
          );
          if (!validWords) {
            setImportState({
              status: 'error',
              text: 'Error al importar el archivo, comprueba que cada palabra tenga una pregunta y una respuesta',
            });
            return;
          }
          setWords(wordsFrom.map((word) => ({ q: word.q, a: word.a })));
          setImportState({
            status: 'completed',
            text: 'Archivo importado correctamente',
          });
        } catch (e) {
          setImportState({
            status: 'error',
            text: 'Error al importar el archivo, comprueba que sea válido',
          });
          return;
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <Container>
      <FormWords words={words} setWords={setWords} />
      <Box>
        {exportState === 'done' ? (
          <Button
            onClick={ExportWords}
            disabled={words.length === 0 || words.length <= 1}
          >
            Exportar Palabras
          </Button>
        ) : exportState === 'loading' ? (
          <Button disabled>Exportando...</Button>
        ) : null}
        {exportState.includes(',') ? (
          <>
            <Button onClick={DownloadBlob}>Descargar archivo</Button>
            <Button onClick={() => setExportState('done')}>
              <DeleteIcon />
            </Button>
          </>
        ) : null}
      </Box>
      <Box>
        {importState.status === 'done' ? (
          <Button onClick={ImportWords}>Importar palabras</Button>
        ) : importState.status === 'loading' ? (
          <Button disabled>{importState.text}</Button>
        ) : null}
        {importState.status === 'error' ? (
          <Alert severity="error">
            <Typography>
              {importState.text}{' '}
              <Button
                onClick={() =>
                  setImportState({ status: 'done', text: 'Ready' })
                }
              >
                <ReplayIcon />
              </Button>
            </Typography>
          </Alert>
        ) : importState.status === 'completed' ? (
          <Alert severity="success">
            <Typography>
              {importState.text}{' '}
              <Button
                onClick={() =>
                  setImportState({ status: 'done', text: 'Ready' })
                }
              >
                <ReplayIcon />
              </Button>
            </Typography>
          </Alert>
        ) : null}
      </Box>
    </Container>
  );
};

export default CreateMatch;
