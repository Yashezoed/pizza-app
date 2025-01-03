import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

export function MenuList({ products }: MenuListProps) {
	return <div className={styles['wrapper']}>{products.map((p) => (
		<ProductCard
			key={p.id}
			id={p.id}
			description={p.ingredients.join(', ')}
			name={p.name}
			price={p.price}
			rating={p.rating}
			image={p.image}
		/>
	))}
	</div>;
}

