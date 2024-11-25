import {  Outlet } from 'react-router-dom';
import styles from './AuthLayuout.module.css';

export function AuthLayuout() {
	return (
		<div className={styles['layout']}>
			<div className={styles['logo']}>
				<img src="/logo.svg" alt="Логотип компании" />
			</div>
			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>
	);
}
