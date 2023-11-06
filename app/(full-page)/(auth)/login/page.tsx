/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState, useEffect } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useAuth } from '@/hooks/useAuth';
import { redirectIfAuthenticated } from '@/utils/auth/redirectIfAuthenticated';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/dashboard');
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Function to handle login using the useAuth hook
    const handleLogin = async () => {
        try {
            // Use the login function from the useAuth hook
            await login(username, password);

            // Redirect to the dashboard on successful login
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            // Handle errors, e.g., show an error message
        }
    };

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/images/landing/aarvee-logo-full.png`} alt="aarvee logo" className="mb-5 w-20rem" />
                <div style={{borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'}}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div>
                            <label htmlFor="username1" className="block text-900 text-xl font-medium mb-2">Username</label>
                            <InputText id="username1" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username or Email" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} placeholder="Password" className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>Forgot password?</a>
                            </div>
                            <Button label="Login" className="w-full p-3 text-xl" onClick={handleLogin}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
