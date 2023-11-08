import { useState, FormEvent } from 'react';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField, Link, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from '@/components/ui/Iconify';

interface LoginHandlerProps {
  onLogin: (username: string, password: string) => Promise<void>;
}


const LoginForm = ({ onLogin }: LoginHandlerProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ username: false, password: false });
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!username || !password) {
      setError({ username: !username, password: !password });
      return;
    }
    try {
      await onLogin(username, password);
      // If login is successful, you might want to clear the error
      setLoginError('');
    } catch (error) {
      if (error instanceof Error) {
        // Set the error message from the caught error
        setLoginError('Login failed. Please check your credentials and try again.');
      } else {
        // Set a generic error message
        setLoginError('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          error={error.username}
          name="username"
          label="Username"
          value={username}
          onChange={(e) => { setUsername(e.target.value); setError({ ...error, username: false }); }}
          helperText={error.username && "Please fill in your username or email address"}
        />
        <TextField
          error={error.password}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError({ ...error, password: false }); }}
          helperText={error.password && "Please fill in your password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>
      {loginError && (
        <Typography color="error" sx={{ mt: 2, mb: 1 }}>
          {loginError}
        </Typography>
      )}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
      >
        Login
      </LoadingButton>
    </form>
  );
};

export default LoginForm;
