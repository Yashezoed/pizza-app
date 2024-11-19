import styles from './Search.module.css';
import cn from 'classnames';
import { SearchProps } from './Search.props';
import { forwardRef } from 'react';

const Search = forwardRef<HTMLInputElement, SearchProps> (function Input({ className, ...props }, ref) {
	return (
		<div className={styles['wrapper-input']}>
			<img src='search.svg' alt='лупа' className={styles['search-loop']} />
			<input
				type='text'
				className={cn(styles['input'], className)}
				placeholder='Введите блюдо или состав'
				{...props}
				ref={ref}
			/>
		</div>
	);
});
export default Search;