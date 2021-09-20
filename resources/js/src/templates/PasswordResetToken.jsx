import React, { useState } from 'react';
import { useLocation } from 'react-router';
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
    backgroundColor: '#ffea00',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0,),
  },
}));

export default function PasswordResetToken(props) {
  const dispatch = useDispatch();
  const classes = useStyles(theme);
  const [csrf_token, setCsrf_token] = useState(document.head.querySelector('meta[name="csrf-token"]').content);
  const [email, setEmail] = useState(unescape(props.location.search.split('email=')[1]));
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [c_password, setC_password] = useState("");


  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  }

  const onC_passwordChanged = (e) => {
    setC_password(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/password/reset', {
      '_token': csrf_token,
      "token": props.match.params.token,
      'email': email,
      'password': password,
      'password_confirmation': c_password
    })
      .then((res) => {
        const urlSplit = res.request.responseURL.split('/');

        dispatch(push("/" + urlSplit[urlSplit.length - 1]));
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
              error.email ? (
                <TextField
                  error
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  autoComplete="email"
                  value={email}
                  id="outlined-error-helper-text"
                  label="Error Email"
                  onChange={onEmailChanged}
                  helperText={error.email}
                />
              ) : (
                <TextField
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  id="email"
                  value={email}
                  label="Email Address"
                  autoComplete="email"
                  onChange={onEmailChanged}
                />
              )
            }
            {
              error.password ? (
                <>
                  {
                    error.password[0] ? (
                      <TextField
                        error
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Changed Password"
                        type="password"
                        id="Error password"
                        autoComplete="current-password"
                        onChange={onPasswordChanged}
                        helperText={error.password[0]}
                      />
                    ) : (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Changed Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onPasswordChanged}
                      />
                    )
                  }
                  {
                    error.password[1] ? (
                      <TextField
                        error
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password Confirm"
                        type="password"
                        id="Error password"
                        autoComplete="current-password"
                        onChange={onC_passwordChanged}
                        helperText={error.password[1]}
                      />
                    ) : (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password Confirm"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onC_passwordChanged}
                      />
                    )
                  }
                </>
              ) : (
                <>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Changed Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onPasswordChanged}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password Confirm"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onC_passwordChanged}
                  />
                </>
              )
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              reset
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

