import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
import { useString } from '../../Function';
import { InputText } from '../../components/Form';
import { signInAction } from '../../reducks/users/actions';

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
  const [email, handleEmail] = useString();
  const [password, handlePassword] = useString();
  const [confirmPassword, handleConfirmPassword] = useString();
  const [error, setError] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await axios
      .post('/register', {
        _token: csrf_token,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      })
      .then((res) => {
        const urlSplit = res.request.responseURL.split('/');
        const userId = urlSplit[urlSplit.length - 1];

        dispatch(push('/' + userId));
        dispatch(
          signInAction({
            isSignedIn: true,
            user_id: userId,
          })
        );
      })
      .catch((err) => {
        setError(err.response.data.errors);
      });
  };

  const pushSignIn = (e) => {
    e.preventDefault();
    dispatch(push('/login'));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          camin
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <InputText
            value={email}
            label={'Email Address'}
            error={error.email}
            required={true}
            fullWidth={true}
            autoFocus={true}
            onChange={handleEmail}
          />
          <InputText
            value={password}
            label={'Password'}
            error={error.password ? error.password[0] : null}
            required={true}
            fullWidth={true}
            type={'password'}
            onChange={handlePassword}
          />
          <InputText
            value={confirmPassword}
            label={'Confirm Password'}
            error={error.password ? error.password[1] : null}
            required={true}
            fullWidth={true}
            type={'password'}
            onChange={handleConfirmPassword}
          />
          <Grid container>
            <Grid item xs={12}>
              <Link href="/auth/redirect" variant="body2">
                Googleアカウントをお持ちですか？
              </Link>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            sign up
          </Button>
          <Grid container>
            <Grid item>
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
  );
}
