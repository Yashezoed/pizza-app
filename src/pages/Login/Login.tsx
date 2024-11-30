import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userAction } from '../../store/user.slice';

export type LoginForm = {
	email: {
		value: string;
	}
	password: {
		value: string;
	}
}

export function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate] );

	const sumbit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userAction.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		dispatch(login({ email, password}));
	};

	return (
		<form className={styles['login']} onSubmit={sumbit}>
			<Headling className={styles['heading']}>Вход</Headling>
			{loginErrorMessage && (
				<div className={styles['error']}>{loginErrorMessage}</div>
			)}
			<Input placeholderText='Ваш Email' name='email' />
			<Input
				placeholderText='Ваш Пароль'
				name='password'
				type='password'
			/>
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
			</p>
		</form>
	);
}
