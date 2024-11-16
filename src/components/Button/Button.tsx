import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';



function Button({ children, className, appearence, ...props }: ButtonProps) {
	return (
		<button className={cn(styles['button'], styles['accent'], styles[appearence], className)} {...props}>
			{children}
		</button>
	);
}

export default Button;