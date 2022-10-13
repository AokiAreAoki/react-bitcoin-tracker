import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store/store';
import { methods } from '../store/slices/sorting';
import styles from './History.module.scss';

function useDisplayHistory(){
	const {
		history,
		sorting,
		pagination,
	} = useSelector( state => state )

	const sorted = useMemo( () => {
		let sorter

		switch( sorting.method ){
			default:
			case methods.byDate:
				sorter = ( a, b ) => a.timestamp - b.timestamp;
				break

			case methods.byPrice:
				sorter = ( a, b ) => a.price - b.price;
				break
		}

		const copy = Array.from( history )
		copy.sort( sorter )
		return copy
	}, [history, sorting.method] )

	const ascended = useMemo( () => {
		return sorting.ascending
			? sorted
			: Array.from( sorted ).reverse()
	}, [sorted, sorting.ascending] )

	const sliced = useMemo( () => {
		const start = pagination.page * pagination.pageSize
		const end = start + pagination.pageSize

		return ascended
			.slice( start, end )
	}, [ascended, pagination] )

	return sliced
}

const History = () => {
	const dispatch = useDispatch()
	const {
		history,
		sorting,
		pagination,
	} = useSelector( state => state )

	const displayHistory = useDisplayHistory()
	const arrow = sorting.ascending ? '▲' : '▼'
	const totalPages = Math.ceil( history.length / pagination.pageSize )

	function next(){
		dispatch( actions.nextPage( totalPages ) )
	}

	function prev(){
		dispatch( actions.prevPage( totalPages ) )
	}

	function setSort( method ){
		dispatch( actions.setSortMethodOrToggleAscending( method ) )
	}

	return (<div className={styles.root}>
		<table className={styles.table}>
			<thead>
				<tr>
					<th>
						<button
							className={styles.toggle}
							onClick={() => {
								setSort( methods.byDate )
							}}
						>
							Дата/Время {sorting.method === methods.byDate && arrow}
						</button>
					</th>
					<th>
						<button
							className={styles.toggle}
							onClick={() => {
								setSort( methods.byPrice )
							}}
						>
							Цена {sorting.method === methods.byPrice && arrow}
						</button>
					</th>
				</tr>
			</thead>
			<tbody>
				{displayHistory.map( entry =>
					<tr key={entry.timestamp}>
						<td>{new Date( entry.timestamp ).toUTCString()}</td>
						<td>{entry.price.toFixed(2)} USD</td>
					</tr>
				)}
			</tbody>
		</table>
		<div className={styles.pager}>
			<button
				className='button'
				onClick={prev}
			>Назад</button>
			Страница: {pagination.page + 1}/{totalPages}
			<button
				className='button'
				onClick={next}
			>Вперёд</button>
		</div>
	</div>)
}

export default History