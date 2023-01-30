import propTypes from 'prop-types';

const Wordlist = (words) => {
  return <div>wordlist</div>;
};
Wordlist.propTypes = {
  words: propTypes.arrayOf(propTypes.object).isRequired,
};
export default Wordlist;
