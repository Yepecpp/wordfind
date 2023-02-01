import propTypes from 'prop-types';
import { useState } from 'react';
const Wordlist = ({ words, setWords, size }) => {
  const [grid, setGrid] = useState(
    Array.from({ length: size.rows }).map(() =>
      Array.from({ length: size.cols }).map(() => '5')
    )
  );
  console.log(grid);
  return (
    <div className="c-wordlist">
      <div className="wordlist-grid">
        {grid.map((row, i) => (
          <div className="wordlist-row" key={i}>
            {row.map((col, j) => (
              <div className="wordlist-cell" key={j}>
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
Wordlist.propTypes = {
  words: propTypes.arrayOf(propTypes.object).isRequired,
  setWords: propTypes.func.isRequired,
  size: propTypes.shape({
    rows: propTypes.number.isRequired,
    cols: propTypes.number.isRequired,
  }).isRequired,
};
export default Wordlist;
