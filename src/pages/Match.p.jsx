import { Container, Box, Button, Typography, Paper } from '@mui/material';
import { useTimer } from 'react-timer-hook';
import { useMatch } from '../contexts/match';
import ExportWords from '../components/exportWords';
import Wordlist from '../components/wordlist';
const Match = () => {
  const [Match, setMatch] = useMatch();

  const EndMatch = () => {
    if (Match.status !== 'started') {
      return;
    }
    let points = Match.words.filter((word) => word.isGuessed).length * 10;
    const remaningTime = Match.finishTime - (new Date() - Match.startTime);
    const remaningMinutes = remaningTime / 1000 / 60;
    const percetage = (remaningMinutes / (Match.finishTime / 1000 / 60)) * 100;
    points *=
      percetage <= 25
        ? 100
        : percetage <= 50
        ? 150
        : percetage <= 75
        ? 200
        : 250;
    setMatch({
      status: 'ended',
      startTime: Match.startTime,
      finishTime: Match.finishTime,
      remaningTime: remaningTime,
      points: points,
      words: Match.words,
      size: Match.size,
    });
  };
  const reuseTimer = () => {
    let date = new Date();
    date.setSeconds(date.getSeconds() + Match.finishTime / 1000);
    return date;
  };

  const timerHook = useTimer({
    expiryTimestamp: reuseTimer(),
    onExpire: EndMatch,
    autoStart: false,
  });
  const setMatchWords = (newwords) => {
    setMatch({
      ...Match,
      words: newwords,
    });
    if (
      newwords.filter((word) => word.isGuessed).length === Match.words.length
    ) {
      EndMatch();
      timerHook.pause();
    }
  };
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
    if (timerHook.isRunning) timerHook.pause();
    timerHook.restart(reuseTimer());
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
            ended={Match.status === 'ended'}
          />
          {Match.status !== 'ended' ? (
            <>
              <Button
                onClick={() => {
                  timerHook.pause();
                  EndMatch();
                }}
              >
                Terminar
              </Button>
            </>
          ) : null}
        </>
      )}
      {Match.status === 'ended' ? (
        <>
          <Typography variant="h5">Puntos: {Match.points}</Typography>
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
      <Typography variant="h6">
        {Match.status === 'started'
          ? timerHook.minutes > 0
            ? timerHook.minutes +
              ' minutos con ' +
              timerHook.seconds +
              ' segundos'
            : timerHook.seconds + ' segundos'
          : ' Game Over'}
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        bgcolor={'red'}
      >
        <Typography variant="h5">Palabras</Typography>
        {Match.words?.map((word, i) => (
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
