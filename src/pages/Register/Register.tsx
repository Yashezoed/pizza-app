import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register, userAction } from '../../store/user.slice';

export type RegisterForm = {
	email: {
		value: string
	},
	password: {
		value: string
	},
	name: {
		value: string
	}
}

export function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const sendRegister = async (email: string, password: string, name: string) => {
		dispatch(register({ email, password, name}));
	};

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userAction.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const {email, password, name} = target;
		await sendRegister(email.value, password.value, name.value);
	};


	return (
		<form className={styles['register']} onSubmit={submit}>
			<Headling className={styles['heading']}>Регистрация</Headling>
			{registerErrorMessage && (
				<div className={styles['error']}>{registerErrorMessage}</div>
			)}
			<Input
				placeholderText='Ваш Email'
				name='email'
				autoComplete='nope'
			/>
			<Input
				placeholderText='Ваш Пароль'
				name='password'
				type='password'
				autoComplete='new-password'
			/>
			<Input placeholderText='Вашe Имя' name='name' />

			<div className={styles['btn']}>
				<Button
					appearence='big'
					className={styles['register-btn']}
					type='submit'
				>
					Зарегистрироваться
				</Button>
			</div>
			<p className={styles['text']}>
				Есть аккаунт?
				<Link to={'/auth/login'} className={styles['register-text']}>
					Войти
				</Link>
			</p>
		</form>
	);
}
