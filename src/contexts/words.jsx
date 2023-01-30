import { createContext, useContext, useState } from 'react';
import propTypes from 'prop-types';
const AuthContext = createContext();
export const useWords = () => {
  return useContext(AuthContext);
};
export const WordsProvider = ({ children }) => {
  const [words, setWords] = useState([
    {
      q: '',
      a: '',
    },
  ]);
  return (
    <AuthContext.Provider value={[words, setWords]}>
      {children}
    </AuthContext.Provider>
  );
};

WordsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
