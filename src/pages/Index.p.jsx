import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Box, Typography } from '@mui/material';
const Index = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '10vh',
        }}
      >
        <Button variant="contained" component={Link} to="/create">
          Crea una partida
        </Button>
      </Box>
      <Box>
        <Typography variant="h1">Index</Typography>
        <Typography variant="h2">Bienvenido al juego</Typography>
        <Typography>
          <Link to="/create">Crear una partida</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Index;
