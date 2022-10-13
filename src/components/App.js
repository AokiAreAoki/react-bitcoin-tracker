import IntervalChanger from './IntervalChanger';
import History from './History';
import styles from './App.module.scss';

function App() {
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<h1>Bitcoin Price History</h1>
				<IntervalChanger />
				<History />
			</div>
		</div>
	);
}

export default App;