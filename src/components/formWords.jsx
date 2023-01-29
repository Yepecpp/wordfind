import { Box, Typography, TextField, Button } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import propTypes from 'prop-types';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
const validationSchema = yup.array(
  yup.object().shape({
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
  })
);
const generateMatch = ({ words, setWords }) => {
  const formikHook = useFormik({
    initialValues: words,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setWords(values);
    },
  });
  useEffect(() => {
    formikHook.setValues(words);
  }, [words]);
  return (
    <Formik onSubmit={formikHook.handleSubmit}>
      <Box>
        <Typography variant="h3">Palabras: </Typography>
        <Box>
          {formikHook.values.map((word, index) => (
            <Box key={index}>
              <Typography variant="h4">Pregunta</Typography>
              <TextField
                value={word.q}
                onChange={formikHook.handleChange}
                name={`[${index}].q`}
                onBlur={formikHook.handleBlur}
                error={
                  formikHook.touched[index]?.q && formikHook.errors[index]?.q
                    ? true
                    : false
                }
                helperText={
                  formikHook.touched[index]?.q && formikHook.errors[index]?.q
                }
              />
              <Typography variant="h4">Respuesta</Typography>
              <TextField
                value={word.a}
                onChange={formikHook.handleChange}
                name={`[${index}].a`}
                onBlur={formikHook.handleBlur}
                error={
                  formikHook.touched[index]?.a && formikHook.errors[index]?.a
                    ? true
                    : false
                }
                helperText={
                  formikHook.touched[index]?.a && formikHook.errors[index]?.a
                }
              />
              <Button
                variant="contained"
                onClick={() => {
                  const newWords = [...formikHook.values];
                  newWords.splice(index, 1);
                  formikHook.setValues(newWords);
                }}
              >
                <DeleteIcon />
              </Button>
            </Box>
          ))}
          <Button
            variant="contained"
            onClick={() => {
              const newWords = [...formikHook.values];
              newWords.push({ q: '', a: '' });
              formikHook.setValues(newWords);
            }}
          >
            <AddIcon />
          </Button>
        </Box>
        <Button
          type="submit"
          variant="contained"
          onClick={formikHook.handleSubmit}
          disabled={!formikHook.isValid || formikHook.values === words}
        >
          Guardar
        </Button>
      </Box>
    </Formik>
  );
};
generateMatch.propTypes = {
  words: propTypes.array.isRequired,
  setWords: propTypes.func.isRequired,
};
export default generateMatch;
