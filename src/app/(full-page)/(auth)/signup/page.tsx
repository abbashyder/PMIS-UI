'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';

const SignUpPage = () => {
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const router = useRouter();

    return (
        <div>
            <h1>Sign Up</h1>
        </div>
    );
};

export default SignUpPage;
