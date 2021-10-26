import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme, createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { InputText } from '../../components/Form';
import { useString } from '../../Function';

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
      main: '#3590dc',
    },
  },
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
    margin: theme.spacing(2, 0),
  },
}));

export default function PasswordReset() {
  const dispatch = useDispatch();
  const classes = useStyles(theme);
  const [csrf_token, setCsrf_token] = useState(document.head.querySelector('meta[name="csrf-token"]').content);
  const [email, handleEmail] = useString();
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post('/password/email', {
        _token: csrf_token,
        email: email,
      })
      .then((res) => {
        setSuccess(true);
        setError([]);
      })
      .catch((err) => {
        console.log('err', err);
        setError(err.response.data.errors);
      });
  };

  const pushSignIn = (e) => {
    e.preventDefault();
    dispatch(push('/login'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            camin
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            {success && (
              <Typography component="h2" variant="h6" color="primary" align="center">
                メールを送信しました
              </Typography>
            )}
            <InputText
              value={email}
              label={'Email Address'}
              error={error.email}
              required={true}
              fullWidth={true}
              autoFocus={true}
              onChange={handleEmail}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              send email
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={pushSignIn} variant="body2">
                  既にアカウントを持っている
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
