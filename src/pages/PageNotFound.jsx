import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Link } from "react-router-dom";


const primary = grey[500]; // #f44336

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </Typography> <br/>
      <Button variant="contained" ><Link to="/login">Back Home</Link></Button>
    </Box>
  );
}