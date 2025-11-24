'use client';

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import styles from './LoginForm.module.scss';
import { useAuth } from "@/hooks/useAuth";

type LoginForm = (): ReactNode => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { setUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: 'admin@example.com',
            password: 'admin123',
        },
    });

    const onSubmit = async (values: LoginFormValues): Promise<void> => {
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        setUser(data.user);

        if (!response.ok) {
            throw new Error(data?.message ?? 'Ошибка авторизации');
        }

        window.localStorage.setItem('accessToken', data.token);
        setSuccess('Авторизация успешна! Токен сохранён в localStorage.');
        }
        catch (submitError) {
        setError(
            submitError instanceof Error ? submitError.message : 'Ошибка авторизации',
        );
        }
    };
    }
}