import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from '@/components/ui/Iconify';

interface LoginHandlerProps {
    onLogin: (username: string, password: string) => void;
}


const LoginForm = ({ onLogin }: LoginHandlerProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Email address"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={() => onLogin(username, password)}
      >
        Login
      </LoadingButton>
    </>
  );
};

export default LoginForm;
