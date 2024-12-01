import { useNavigate } from 'react-router-dom';
import styles from './Success.module.css';
import Button from '../../components/Button/Button';

export function Success() {
	const navigate =useNavigate();
	return (
		<div className={styles['success']}>
			<img src="/pizza.png" alt="изображение пиццы" />
			<div className={styles['text']}>Ваш заказ успешно оформлен!</div>
			<Button appearence="big" onClick={() => navigate('/')}>Сделать новый</Button>
		</div>
	);
}