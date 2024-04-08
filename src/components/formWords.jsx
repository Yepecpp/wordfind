import { Box, TextField, Button } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import propTypes from 'prop-types';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import '../css/formWords.css';
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
const formWords = ({ words, setWords }) => {
  const formikHook = useFormik({
    initialValues: words,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setWords(values);
    },
  });
  useEffect(() => {
    formikHook.setValues(words);
  }, [words]);
  return (
    <Formik onSubmit={formikHook.handleSubmit}>
      <div className="entradaDePalabras">
        <h3 className="plb">Palabras </h3>
        <Box>
          <span className="PREncabezado">
            <h2>Pregunta</h2>
            <h2>Respuesta</h2>
          </span>
          {formikHook.values.map((word, index) => (
            <div className="preguntaYRespuesta" key={index}>
              <Button
                className="deleteButton"
                variant="contained"
                onClick={() => {
                  const newWords = [...formikHook.values];
                  newWords.splice(index, 1);
                  formikHook.setValues(newWords);
                }}
              >
                <DeleteIcon />
              </Button>
              <TextField
                className="campoMultilinea"
                value={word.q}
                id="standard-multiline-flexible"
                multiline
                maxRows={4}
                onChange={formikHook.handleChange}
                name={`[${index}].q`}
                onBlur={formikHook.handleBlur}
                placeholder={
                  '¿Como se apellidaba el dictador que goberno del 1930 al 1961?'
                }
                error={
                  formikHook.touched[index]?.q && formikHook.errors[index]?.q
                    ? true
                    : false
                }
                helperText={
                  formikHook.touched[index]?.q && formikHook.errors[index]?.q
                }
              />
              <TextField
                className="campoMultilinea"
                value={word.a}
                id="standard-multiline-flexible"
                multiline
                maxRows={4}
                onChange={formikHook.handleChange}
                placeholder={'Trujillo'}
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
            </div>
          ))}
          <div className="masYGuardar">
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
            <Button
              type="submit"
              variant="contained"
              onClick={formikHook.handleSubmit}
              disabled={!formikHook.isValid || formikHook.values === words}
            >
              Guardar
            </Button>
          </div>
        </Box>
      </div>
    </Formik>
  );
};
formWords.propTypes = {
  words: propTypes.array.isRequired,
  setWords: propTypes.func.isRequired,
};
export default formWords;
