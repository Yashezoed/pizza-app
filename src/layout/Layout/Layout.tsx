import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

export function Layout() {
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
					<Link to='/' className={styles['link-menu']}>
						<img src='menu-icon.svg' alt='иконка меню' />
						<p className={styles['text-menu']}>Меню</p>
					</Link>
					<Link to='/cart' className={styles['link-menu']}>
						<img src='cart-icon.svg' alt='иконка корзины' />
						<p className={styles['text-menu']}>Корзина</p>
					</Link>
				</div>
				
				<Button
					appearence={'small'}
					className={styles['footer-btn']}
				>
					<img
						src='/Exit.png'
						alt='иконка выхода'
						className={styles['exit-icon']}
					/>
						Выйти
				</Button>
			</div>
			<Outlet />
		</div>
	);
}


