import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent } from 'react';

export function Login() {
	const sumbit = (e: FormEvent) => {
		e.preventDefault();
		console.log(e);
	};

	return (
		<form className={styles['login']}  onSubmit={sumbit}>
			<Headling className={styles['heading']}>Вход</Headling>
			<Input placeholderText='Email' />
			<Input placeholderText='Пароль' />
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
