import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';

function ProductCard(props: ProductCardProps) {
	return (
		<Link to={`/product/${props.id}`}>
			<div className={styles['card']}>
				<div className={styles['main']}>
					<img
						src={props.image}
						alt='Пицца'
						className={styles['main-img']}
					/>
					<p className={styles['price']}>
						{props.price}
						<span className={styles['price-currency']}>₽</span>
					</p>
					<p className={styles['rating']}>
						{props.rating} <img src='/star.svg' alt='звзеда' />
					</p>
					<button className={styles['add-cart']}>
						<img src='/cart-btn.svg' alt='корзина' />
					</button>
				</div>
				<div className={styles['footer']}>
					<p className={styles['title']}>{props.title}</p>
					<p className={styles['description']}>{props.description}</p>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
