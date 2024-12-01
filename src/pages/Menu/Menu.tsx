import { ChangeEvent, useEffect, useState } from 'react';
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
	const [searchError, setSearchError] = useState<boolean>(false);
	
	useEffect(() => {
		getMenu();
	}, []);
	
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

	const sortByName = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target) {
			setSearchError(false);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name: e.target.value
				}
			});
			setProducts(data);
			if (!data.length) {
				setSearchError(true);
			}
		}
	};

	return (
		<>
			<div className={styles['header']}>
				<Headling>Меню</Headling>
				<Search onChange={sortByName} />
			</div>
			<div>
				{!isLoading && <MenuList products={products} />}
				{error && <>{error}</>}
				{isLoading && <>Загружаем продукт</>}
				{searchError && <>По вашему запросу ничего не найдено</>}
			</div>
		</>
	);
}
export default Menu;
