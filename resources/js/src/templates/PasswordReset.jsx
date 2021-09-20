import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme, createTheme } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        camin
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme({
  palette: {
    secondary: {
      main: "#3590dc"
    }
  }
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#9c27b0',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0,),
  },
}));

export default function PasswordReset() {
  const dispatch = useDispatch();
  const classes = useStyles(theme);
  const [csrf_token, setCsrf_token] = useState(document.head.querySelector('meta[name="csrf-token"]').content);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('/password/email', {
      '_token': csrf_token,
      'email': email,
    })
      .then((res) => {
        setSuccess(true);
        setError([]);
      })
      .catch((err) => {
        console.log("err", err);
        setError(err.response.data.errors);
      });
  }

  const pushSignIn = (e) => {
    e.preventDefault();
    dispatch(push("/login"));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            camin
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            {
              success &&
              <Typography component="h2" variant="h6" color="primary" align="center">
                メールを送信しました
              </Typography>
            }
            {
              error.email ? (
                <TextField
                  error
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  id="outlined-error-helper-text"
                  label="Error Email"
                  onChange={onEmailChanged}
                  helperText={error.email}
                />
              ) : (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  onChange={onEmailChanged}
                />
              )
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              send email
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={pushSignIn} variant="body2">
                  {"Do you have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container >
    </ThemeProvider>
  );
}

