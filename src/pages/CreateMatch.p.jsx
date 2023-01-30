import { Container, Box, Button, Typography, Alert } from '@mui/material';
import FormWords from '../components/formWords';
import { Link } from 'react-router-dom';
import ExportWords from '../components/exportWords';
import { Replay as ReplayIcon } from '@mui/icons-material';
import { useWords } from '../contexts/words';
import { useState } from 'react';
const CreateMatch = () => {
  const [words, setWords] = useWords();
  const [importState, setImportState] = useState({
    status: 'done',
    text: 'Ready',
  });
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
      <ExportWords words={words} />
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
        {!(words.length === 0 || words.length <= 1) ? (
          <Button component={Link} to="/match">
            <Typography>crear la partida</Typography>
          </Button>
        ) : null}
      </Box>
    </Container>
  );
};

export default CreateMatch;
