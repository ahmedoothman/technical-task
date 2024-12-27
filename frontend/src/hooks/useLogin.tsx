import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '@/store/slices/notificationSlice';
import { login } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';

interface LoginResponse {
  token: string;
}

interface LoginError extends Error {
  message: string;
}

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data: LoginResponse = await response.json();
      console.log(data);

      dispatch(login({ id: Date.now(), email }));
      dispatch(setNotification({ message: 'Logged in', type: 'success' }));
      router.push('/dashboard');
    } catch (err) {
      const error = err as LoginError;
      setError(error.message);
      dispatch(setNotification({ message: error.message, type: 'error' }));
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};
