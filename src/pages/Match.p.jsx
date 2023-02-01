import { Container, Box, Button, Typography, Paper } from '@mui/material';
import { useTimer } from 'react-timer-hook';
import { useMatch } from '../contexts/match';
import ExportWords from '../components/exportWords';
import Wordlist from '../components/wordlist';
const Match = () => {
  const [Match, setMatch] = useMatch();
  const setMatchWords = (words) => {
    setMatch({
      ...Match,
      words: words,
    });
  };
  const EndMatch = () => {
    if (Match.status !== 'started') {
      return;
    }
    setMatch({
      status: 'ended',
      startTime: Match.startTime,
      finishTime: Match.finishTime,
      remaningTime: Match.finishTime - (new Date() - Match.startTime),
      points: Match.words.filter((word) => word.isGuessed).length,
      words: Match.words,
      size: Match.size,
    });
  };
  const timerHook = useTimer({
    expiryTimestamp: new Date().setMilliseconds(Match.remaningTime),
    onExpire: EndMatch,
    autoStart: false,
  });

  const StartMatch = () => {
    if (!Match.finishTime) return;
    const newMatch = {
      finishTime: Match.finishTime,
      status: 'started',
      startTime: new Date(),
      remaningTime: null,
      points: 0,
      words: Match.words,
      size: Match.size,
    };
    timerHook.start(newMatch.finishTime - (new Date() - newMatch.startTime));
    setMatch(newMatch);
  };

  const ResetMatch = () => {
    setMatch({
      status: 'ready',
      points: 0,
      finishTime: Match.finishTime,
      remaningTime: 0,
      startTime: null,
      words: Match.words.map((word) => ({
        q: word.q,
        a: word.a,
        isGuessed: false,
      })),
      size: Match.size,
    });
    timerHook.pause();
  };

  return (
    <Container>
      <Box>
        <Typography variant="h4">Match</Typography>
      </Box>
      {Match.status === 'ready' ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={StartMatch}
            sx={{
              margin: '1rem',
            }}
            disabled={Match.finishTime === null}
          >
            Empezar
          </Button>
        </>
      ) : (
        <>
          <Wordlist
            words={Match.words}
            setWords={setMatchWords}
            size={Match.size}
          />
          {Match.status !== 'ended' ? (
            <>
              <Button onClick={() => EndMatch()}>Terminar</Button>
              <Typography variant="h5">
                Tiempo restante: {timerHook.minutes} {'minutos y '}
                {timerHook.seconds} segundos
              </Typography>
            </>
          ) : null}
        </>
      )}
      {Match.status === 'ended' ? (
        <>
          <Typography variant="h5">Puntos: {Match.points}</Typography>
          <Typography variant="h5">
            Tiempo restante: {Math.floor(Match.remaningTime / 1000 / 60)}{' '}
            minutos con {Math.floor((Match.remaningTime / 1000) % 60)} segundos
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={ResetMatch}
            sx={{
              margin: '1rem',
            }}
          >
            Reiniciar
          </Button>
        </>
      ) : null}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        bgcolor={'red'}
      >
        <Typography variant="h5">Palabras</Typography>
        {Match.words.map((word, i) => (
          <Paper
            key={i}
            elevation={22}
            sx={{
              margin: '1rem',
            }}
          >
            <Typography variant="h5">Q: {word.q}</Typography>
            {word.isGuessed ? (
              <Typography variant="h5">A: {word.a}</Typography>
            ) : null}
          </Paper>
        ))}
      </Box>
      <ExportWords words={Match.words} />
    </Container>
  );
};

export default Match;
