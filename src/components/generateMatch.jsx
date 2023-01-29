import { Box, Typography, TextField, Button } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import propTypes from 'prop-types';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
const validationSchema = yup.object().shape({
  q: yup
    .string()
    .min(1, 'Ingrese una pregunta')
    .required('Ingrese una pregunta'),
  // a cant be empty or have spaces or special characters
  a: yup
    .string()
    .min(1, 'Ingrese una respuesta')
    .matches(
      /^[a-zA-Z0-9]+$/,
      'La respuesta no puede tener espacios ni caracteres especiales'
    )
    .required('Ingrese una respuesta'),
});
const generateMatch = ({ words, setWords, handleForm }) => {
  const changeWord = (index, value) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };
  const formikHook = useFormik({
    initialValues: {
      q: '',
      a: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Formik onSubmit={handleForm}>
      <Box>
        <Typography variant="h3">Palabras: </Typography>
        <Box>
          {words.map((word, index) => (
            <Box key={index}>
              <Typography variant="h4">Pregunta</Typography>
              <TextField
                value={word.q}
                onChange={(e) =>
                  changeWord(index, {
                    q: e.target.value,
                    a: word.a,
                  })
                }
              />
              <Typography variant="h4">Respuesta</Typography>
              <TextField
                value={word.a}
                onChange={(e) =>
                  changeWord(index, {
                    question: word.q,
                    a: e.target.value,
                  })
                }
              />
              <Button
                onClick={() => setWords(words.filter((_, i) => i !== index))}
              >
                <DeleteIcon />
              </Button>
            </Box>
          ))}
          <Button
            onClick={() => setWords([...words, { question: '', answer: '' }])}
            variant="text"
          >
            <AddIcon />
          </Button>
        </Box>
        <Button type="submit" variant="contained">
          Crear partida
        </Button>
      </Box>
    </Formik>
  );
};
generateMatch.propTypes = {
  words: propTypes.array.isRequired,
  setWords: propTypes.func.isRequired,
  handleForm: propTypes.func,
};
export default generateMatch;
