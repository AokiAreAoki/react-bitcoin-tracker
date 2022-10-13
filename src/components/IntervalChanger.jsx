import React from 'react';
import DurationPicker from './DurationPicker';
import { minInterval } from '../services/PriceTracker';
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/store';
import styles from './IntervalChanger.module.scss';

const IntervalChanger = () => {
	const dispatch = useDispatch()
	const interval = useSelector( state => state.tracker.updateInterval )

	return (
		<div className={styles.root}>
			<span className={styles.text}>
				Интервал сканирования:
			</span>
			<DurationPicker
				value={interval}
				min={minInterval}
				onChange={time => {
					dispatch( actions.setInterval( time ) )
				}}
			/>
		</div>
	)
}

export default IntervalChanger