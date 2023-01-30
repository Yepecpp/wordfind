import { useWords } from '../../contexts/words';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const gameRoutes = () => {
  const [words] = useWords();
  const Navigate = useNavigate();
  const hasWords = words.length > 0 && words[0].q !== '' && words[0].a !== '';
  useEffect(() => {
    if (!hasWords) {
      Navigate('/create');
    }
  }, [hasWords, Navigate]);
  return <Outlet />;
};

export default gameRoutes;
