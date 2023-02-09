import {
  Container,
  Box,
  Button,
  Typography,
  Alert,
  Select,
  MenuItem,
  Input,
} from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import {
  SaveAlt as SaveAltIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import FormWords from '../components/formWords';
import { Link } from 'react-router-dom';
import ExportWords from '../components/exportWords';
import { Replay as ReplayIcon } from '@mui/icons-material';
import { useMatch } from '../contexts/match';
import { useEffect, useState } from 'react';
import "../css/createMatch.css"
const CreateMatch = () => {
  const [match, setMatch] = useMatch();
  const [words, setWords] = useState(match.words);
  useEffect(() => {
    setMatch({ ...match, words });
  }, [words]);
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
    <div className="matchallcontainer">

      <div className='matchContainer'>´
        <div className='tiempoytamaño'>

          <Select className='uiSelect'
            value={match.finishTime / 60 / 1000}
            onChange={(e) => {
              setMatch({
                ...match,
                finishTime: e.target.value * 60 * 1000,
              });
            }}
            error={!match.finishTime}
          >
            <MenuItem value={1}>1 minuto</MenuItem>
            <MenuItem value={2}>2 minutos</MenuItem>
            <MenuItem value={3}>3 minutos</MenuItem>
            <MenuItem value={5}>5 minutos</MenuItem>
            <MenuItem value={10}>10 minutos</MenuItem>
            <MenuItem value={15}>15 minutos</MenuItem>
          </Select>
          <Input className='tamañoTableroInput'
            min={"8"}
            max={"50"}
            type="number"
            value={match.size.rows}
            placeholder="Tamaño del tablero"
            onChange={(e) => {
              setMatch({
                ...match,
                size: {
                  cols: Number(e.target.value),
                  rows: Number(e.target.value),
                },
              });
            }}
            error={!match.size.rows ||
              !match.size.cols ||
              match.size.rows < match.words.length ||
              match.size.rows < // cant be smaller than the longest word in the list
              Math.max(...match.words.map((word) => word.a.length))
             }
          />
        </div>
        <p id='tamañoTablero' style={{fontWeight: "800", textTransform: "capitalize"}}>
          El tamaño del tablero es {match.size.rows}x{match.size.cols}
        </p>

        <FormWords words={words} setWords={setWords} />
        <div className='matchBox'>

          {importState.status === 'done' ? (
            <div className="importarexportar">
              <ExportWords 
                words={words} />
              <Button
                onClick={ImportWords}
                style={{color: "black"}}
              >
                Importar Palabras{' '}
                <FileUploadOutlinedIcon
                  sx={{
                    ml: 1,
                  }}
                />
              </Button>
            </div>
          ) : importState.status === 'loading' ? (
            <button className='MatchButton' disabled>{importState.text}</button>
          ) : null}
          {importState.status === 'error' ? (
            <Alert severity="error">
              <p>
                {importState.text}{' '}
                <button className='MatchButton'
                  onClick={() =>
                    setImportState({ status: 'done', text: 'Ready' })
                  }
                >
                  <ReplayIcon />
                </button>
              </p>
            </Alert>
          ) : importState.status === 'completed' ? (
            <Alert severity="success">
              <p>
                {importState.text}{' '}
                <button className='MatchButton'
                  onClick={() =>
                    setImportState({ status: 'done', text: 'Ready' })
                  }
                >
                  <ReplayIcon />
                </button>
              </p>
            </Alert>
          ) : null}
          {!(words.length === 0 || words.length <= 1) &&
            match.finishTime &&
            !(
              !match.size.rows ||
              !match.size.cols ||
              match.size.rows < match.words.length ||
              match.size.rows < // cant be smaller than the longest word in the list
              Math.max(...match.words.map((word) => word.a.length))
            ) ? (
            <Link to="/match">
              <button className='createButton'>
                <p>Crear la partida</p>
              </button>
            </Link>
          ) : null}
        </div>
      </div>

    </div>
  );
};

export default CreateMatch;
