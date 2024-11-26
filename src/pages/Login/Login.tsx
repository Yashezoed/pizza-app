import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/api';
import { LoginResponse } from '../../interfaces/auth.interface';

export type LoginForm = {
	email: {
		value: string;
	}
	password: {
		value: string;
	}
}

export function Login() {

	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();

	const sumbit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			console.log(data.access_token);
			localStorage.setItem('jwt', data.access_token);
			navigate('/');
		}
		catch(e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
		}
	
	};

	return (
		<form className={styles['login']} onSubmit={sumbit}>
			<Headling className={styles['heading']}>Вход</Headling>
			{error && <div className={styles['error']}>{ error }</div>}
			<Input placeholderText='Email' name='email' />
			<Input placeholderText='Пароль' name='password' type='password' />
			<div className={styles['btn']}>
				<Button
					appearence='big'
					className={styles['login-btn']}
					type='submit'
				>
					Вход
				</Button>
			</div>
			<p className={styles['text']}>
				Нет Аккаунта?{' '}
				<Link to={'/auth/register'} className={styles['register-text']}>
					Зарегистрироваться
				</Link>
				{/* <Link to={`/product/${props.id}`}> */}
			</p>
		</form>
	);
}
