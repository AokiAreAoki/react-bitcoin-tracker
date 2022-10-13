import React, { useMemo, useRef } from 'react'
import InputWithMask, { nodes } from './InputWithMask'
import styles from './DurationPicker.module.scss'

function parseTime( values ){
	const h = Number( values[0] || 0 ) * 3600e3
	const m = Number( values[1] || 0 ) * 60e3
	const s = Number( values[2] || 0 ) * 1e3
	return h + m + s
}

function toMaskValue( time ){
	time = Math.floor( time / 1e3 )
	const s = String( time % 60 )

	time = Math.floor( time / 60 )
	const m = String( time % 60 )

	time = Math.floor( time / 60 )
	const h = String( time )

	return [h, m, s].map( s => s.padStart( 2, '0' ) )
}

const DurationPicker = ({ value, min, onChange }) => {
	const inputValue = useRef( toMaskValue( value ) )
	const setValues = useRef( () => {} )

	const mask = useMemo( () => [
		nodes.value( 2, '00' ),
		nodes.text( ':' ),
		nodes.value( 2, '00' ),
		nodes.text( ':' ),
		nodes.value( 2, '00' ),
	], [] )

	function emitChange(){
		if( !inputValue.current )
			return

		let time = parseTime( inputValue.current )

		if( typeof min === 'number' && time < min )
			time = min

		inputValue.current = toMaskValue( time )

		if( typeof onChange === 'function' )
			onChange( time )
	}

	return (
		<div className={styles.root}>
			<InputWithMask
				ref={setValues}
				values={inputValue}
				mask={mask}
				onSubmit={emitChange}
			/>
			<button
				className='button'
				onClick={emitChange}
			>
				Изменить
			</button>
		</div>
	)
}

export default DurationPicker