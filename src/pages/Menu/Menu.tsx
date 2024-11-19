import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';


export function Menu() {
	return (
		<div className={styles['header']}>
			<Headling>Меню</Headling>
			<Search />
		</div>
	);
}
