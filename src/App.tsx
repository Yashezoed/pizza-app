import { MouseEvent /* ,useState */ } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {
	// const [counter, setCounter] = useState<number>(0);

	const addCounter = (e: MouseEvent) => {
		console.log(e);
	};

	return (
		<>
			<Button onClick={addCounter} appearence={'small'}>Применить</Button>
			<Button onClick={addCounter} appearence={'big'}>Вход</Button>
			<Input placeholderText='email'/>
			<Input placeholderText='пароль'/>
		</>
	);
}

export default App;
