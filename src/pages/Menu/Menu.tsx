import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/api';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getMenu = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			return;
		} finally {
			setIsLoading(false);

		}
		// через встроенный в js fetch
		/* try {
			const res = await fetch(`${PREFIX}/products`);
			if (!res.ok) {
				return;
			}
			const data = await res.json() as Product[];
			setProducts(data);
		} catch (e) {
			console.error(e);
			return;
		} */
	};

	useEffect(() => {
		getMenu();
	}, []);

	return (
		<>
			<div className={styles['header']}>
				<Headling>Меню</Headling>
				<Search />
			</div>
			<div>
				{!isLoading && <MenuList products={products}/>}
				{error && <>{error}</>}
				{isLoading && <>Загружаем продукт</>}
			</div>
		</>
	);
}
export default Menu;
