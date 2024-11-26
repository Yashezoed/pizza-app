import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';

export function Layout() {

	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('jwt');
		navigate('/auth/login');
	};

	return (
		<div className={styles['wrapper-layout']}>
			<div className={styles['wrapper-menu']}>
				<div className={styles['header-menu']}>
					<img
						src='/Avatar.svg'
						alt='Аватарка профиля'
						className={styles['header-img']}
					/>
					<p className={styles['fullName-text']}>Антон Яшечкин</p>
					<p className={styles['mail-text']}>mr.efyx@mail.ru</p>
				</div>
				<div className={styles['main-menu']}>
					<NavLink
						to='/'
						className={({ isActive }) =>
							cn(styles['link-menu'], {
								[styles.active]: isActive
							})
						}
					>
						<img src='/menu-icon.svg' alt='иконка меню' />
						<p className={styles['text-menu']}>Меню</p>
					</NavLink>
					<NavLink
						to='/cart'
						className={({ isActive }) =>
							cn(styles['link-menu'], {
								[styles.active]: isActive
							})
						}
					>
						<img src='/cart-icon.svg' alt='иконка корзины' />
						<p className={styles['text-menu']}>Корзина</p>
					</NavLink>
				</div>

				<Button
					appearence={'small'}
					className={styles['footer-btn']}
					onClick={logout}
				>
					<img
						src='/Exit.png'
						alt='иконка выхода'
						className={styles['exit-icon']}
					/>
					Выйти
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>
	);
}


