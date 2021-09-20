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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [csrf_token, setCsrf_token] = useState(document.head.querySelector('meta[name="csrf-token"]').content);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [error, setError] = useState([]);


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


    const response = await axios.post('/register', {
      '_token': csrf_token,
      'email': email,
      'password': password,
      'password_confirmation': c_password
    })
      .then((res) => {
        console.log(res);
        const urlSplit = res.request.responseURL.split('/');

        dispatch(push("/" + urlSplit[urlSplit.length - 1]));
      })
      .catch((err) => {
        setError(err.response.data.errors);
        console.log(err.response.data.errors)
      });


  }

  const pushSignIn = (e) => {
    e.preventDefault();
    dispatch(push("/login"));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
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
                      label="Password"
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
                      label="Password"
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
                  label="Password"
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
          <Grid container>
            <Grid item xs={12}>
              <Link href="/auth/redirect" variant="body2">
                Do you have a Google account?
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            sign up
          </Button>
          <Grid container>
            <Grid item>
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
  );
}

