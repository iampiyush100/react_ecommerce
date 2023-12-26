import { useState }from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme();

export default function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({isError: false, message: ''});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('user>>>>', user);
    if (user.email !== "" && user.password !== "") {
      setError({isError: false, message: ''});
      setIsLoading(true);
      const apiCalling = async () => {
        let config = {
          method: "post",
          url: `https://dummyjson.com/auth/login`,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            username: user.email,
            password: user.password,
          }),
        };
        try {
          const response = await axios.request(config);
          localStorage.setItem(response?.data?.id, JSON.stringify(response?.data))
          console.log("response.>>>>", response?.data);
          setIsLoading(false);
          navigate('/products')
        } catch (error) {
          console.log('error>>>>', error);
          setIsLoading(false);
          setError({isError: true, message: error?.response?.data?.message || "something went wrong"});
        }
      };
      apiCalling();
    } else {
      setError({isError: true, message: 'Please fill the form before submit'});
    }
  };

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error.isError && (
            <p style={{color: "red"}}>{error.message}</p>
          )}
             {isLoading && (
            <p style={{color: "blue"}}>Loading.....</p>
          )}
            <Grid container>
              <Grid item xs>
                <RouterLink to="/reset-password" variant="body2">
                  Forgot password?
                </RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}