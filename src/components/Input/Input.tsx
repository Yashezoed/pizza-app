import styles from './Input.module.css';
import cn from 'classnames';
import { InputProps } from './Input.props';
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputProps> (function Input({ isValid = true, className, placeholderText, ...props }, ref) {
	const placeholder = placeholderText.charAt(0).toUpperCase() + placeholderText.slice(1);
	return (
		<div className={styles['wrapper']}>
			<span className={cn(styles['text'], { [styles['invalid-span']]: !isValid }, className )}> {placeholderText } </span>
			<input type='text' ref={ref} placeholder={placeholder} className={cn(styles['input'], { [styles['invalid']]: !isValid })} {...props} />
		</div>
	);
});
export default Input;