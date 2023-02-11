import propTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { Typography } from '@mui/material';
import '../css/match.css';
const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
const Wordlist = ({ words, setWords, size, ended = false }) => {
  const fillGrid = useMemo(() => {
    const retry = 50;
    const newGrid = Array.from({ length: size.rows }).map(() =>
      Array.from({ length: size.cols }).map(() => {
        return {
          letter: letters[Math.floor(Math.random() * letters.length)],
          isSelected: false,
          isWord: false,
          wasFound: false,
        };
      })
    );
    const newWords = words.map((word) => {
      return {
        ...word,
        done: false,
        try: 0,
      };
    });
    // eslint-disable-next-line no-constant-condition
    while (true) {
      newWords.forEach((word) => {
        if (word.done) return;
        if (word.try >= retry) {
          return;
        }
        // if all words are done, and other words are not done, but have 5 tries, then break
        word.try++;
        const wordLength = word.a.length;
        const wordDirection = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        const wordStart = {
          row: Math.floor(Math.random() * size.rows),
          col: Math.floor(Math.random() * size.cols),
        };
        // if word is out of grid, then try again
        // if word is overlapping with other words, then try again, to do this we need to check if word[][].isWord is true
        if (wordDirection === 'horizontal') {
          if (wordStart.col + wordLength > size.cols) return;
          for (let i = 0; i < wordLength; i++) {
            if (newGrid[wordStart.row][wordStart.col + i].isWord) {
              return;
            }
          }
        }
        if (wordDirection === 'vertical') {
          if (wordStart.row + wordLength > size.rows) return;
          for (let i = 0; i < wordLength; i++) {
            if (newGrid[wordStart.row + i][wordStart.col].isWord) {
              return;
            }
          }
        }
        for (let i = 0; i < wordLength; i++) {
          const row =
            wordDirection === 'horizontal' ? wordStart.row : wordStart.row + i;
          const col =
            wordDirection === 'horizontal' ? wordStart.col + i : wordStart.col;
          newGrid[row][col].letter = word.a[i];
          newGrid[row][col].isWord = true;
        }
        word.done = true;
      });
      if (
        newWords.every((word) => word.done) ||
        newWords.some((word) => !word.done && word.try >= retry)
      ) {
        break;
      }
    }

    return newGrid;
  }, [size, words]);
  const [grid, setGrid] = useState(fillGrid);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selected, SetSelected] = useState([
    {
      row: 0,
      col: 0,
      letter: '',
      wasFound: false,
    },
  ]);
  const setSelected = (newSelected) => {
    if (ended) return;
    SetSelected(newSelected);
    // check if newSelected[].wasFound is true, if true, then return
    if (newSelected.some((s) => s.wasFound)) return;
    const word = newSelected.map((s) => s.letter).join('');
    const foundWord = words.find(
      (w) => w.a.toLowerCase() === word.toLowerCase()
    );
    if (!foundWord) return;
    const newWords = words;
    const index = newWords.findIndex(
      (w) => !w.isGuessed && w.a.toLowerCase() === word.toLowerCase()
    );
    if (index === -1) return;
    newWords[index].isGuessed = true;
    setWords(newWords);
    setGrid(() => {
      const newGrid = [...grid];
      newSelected.forEach((s) => {
        newGrid[s.row][s.col].wasFound = true;
      });
      return newGrid;
    });
  };

  return (
    <div className="c-wordlist">
      <div className="wordlist-grid">
        {grid.map((row, i) => (
          <div className="wordlist-row" key={i}>
            {row.map((col, j) => (
              <div
                className={`wordlist-cell ${col.isSelected ? 'selected' : ''} ${
                  col.wasFound || (col.isWord && ended) ? 'found' : ''
                }`}
                key={j}
                onMouseDown={(e) => {
                  setIsSelecting(true);
                  setGrid(() => {
                    const newGrid = [...grid];
                    selected.forEach(
                      (s) => (newGrid[s.row][s.col].isSelected = false)
                    );
                    return newGrid;
                  });
                  setSelected([
                    {
                      row: i,
                      col: j,
                      letter: e.target.innerHTML,
                      wasFound: grid[i][j].wasFound,
                    },
                  ]);
                  setGrid(() => {
                    const newGrid = [...grid];
                    newGrid[i][j].isSelected = true;
                    return newGrid;
                  });
                }}
                onMouseUp={() => setIsSelecting(false)}
                onMouseEnter={(e) => {
                  if (!isSelecting) return;
                  setSelected([
                    ...selected,
                    {
                      row: i,
                      col: j,
                      letter: e.target.innerHTML,
                      wasFound: grid[i][j].wasFound,
                    },
                  ]);
                  setGrid(() => {
                    const newGrid = [...grid];
                    newGrid[i][j].isSelected = true;
                    return newGrid;
                  });
                }}
              >
                {col.letter.toUpperCase()}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Typography>
        {ended
          ? 'Game Ended'
          : selected.length > 1
          ? selected.map((s) => s.letter).join('')
          : 'Selecciona una letra y combinala para encontrar la respuesta'}
      </Typography>
    </div>
  );
};
Wordlist.propTypes = {
  words: propTypes.arrayOf(propTypes.object).isRequired,
  setWords: propTypes.func.isRequired,
  ended: propTypes.bool,
  size: propTypes.shape({
    rows: propTypes.number.isRequired,
    cols: propTypes.number.isRequired,
  }).isRequired,
};
export default Wordlist;
