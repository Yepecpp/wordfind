import { Container, Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const NoPage = () => {
  const navigate = useNavigate()
  useEffect(()=>{

    navigate("/")
  })

};

export default NoPage;
