'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import { Box, Card, Typography, Link } from '@mui/material';
import LoginForm from '@/components/auth/LoginForm';
import LoadingIndicator from '@/components/ui/LoadingIndicator';
import { useAuth } from '@/hooks/useAuth';

const HomePage = () => {
    const router = useRouter();
    const { isAuthenticated, login } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/dashboard');
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, router]);

    const handleLogin = async (username: string, password: string) => {
        try {
            await login(username, password);
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <Box sx={{ height: 1 }}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
                    <Typography variant="h4">Login</Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                        Don’t have an account?
                        <Link variant="subtitle2" sx={{ ml: 0.5 }}>
                            Get started
                        </Link>
                    </Typography>

                    <LoginForm onLogin={handleLogin} />

                </Card>
            </Stack>
        </Box>
    );
};

export default HomePage;
