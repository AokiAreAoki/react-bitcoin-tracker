import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import styles from './InputWithMask.module.scss'

let uid = 0
export const nodes = {
	text: value => ({
		uid: ++uid,
		type: 'text',
		value,
	}),
	value: ( length, placeholder = "" ) => ({
		uid: ++uid,
		type: 'value',
		length,
		placeholder,
	}),
}

function fill( value, mask ){
	return mask.placeholder.substring( 0, mask.placeholder.length - value.length ) + value
}

const InputWithMask = React.forwardRef( ( props, valueSetter ) => {
	const {
		mask,
		onSubmit,
	} = props

	const ref = useRef()
	const inputs = useRef([])
	const values = props.values
	const valueSubmasks = useMemo( () => mask.filter( submask => submask.type === 'value' ), [mask] )

	const setMaskValue = useCallback( newMaskValue => {
		values.current = newMaskValue
	}, [] )

	useEffect( () => {
		valueSetter.current = setMaskValue

		inputs.current = Array.from( ref.current.querySelectorAll('input') )
		inputs.current.forEach( ( target, i ) => {
			target.i = i
		})
	}, [ref.current] )

	useEffect( () => {
		if( !ref.current )
			return

		valueSubmasks.forEach( ( submask, i ) => {
			const target = inputs.current[i]

			if( target )
				target.value = values.current[i] || submask.placeholder
		})
	}, [ref.current, values.current] )

	function onInput({ target }){
		if( target.value.length >= valueSubmasks[target.i].length ){
			const nextInput = inputs.current[target.i + 1]

			if( nextInput )
				nextInput.focus()
		}
	}

	function onFocus({ target }){
		target.selectionStart = 0
		target.selectionEnd = 2
	}

	function onBlur({ target }){
		target.value = fill( target.value, valueSubmasks[target.i] )
		emitChange()
	}

	function emitChange(){
		values.current = inputs.current.map( i => i.value )
	}

	function emitSubmit(){
		onSubmit()
	}

	function onKeyDown({ target, key }){
		if( key === 'Enter' ){
			const nextInput = inputs.current[target.i + 1]

			if( nextInput ){
				nextInput.focus()
			} else {
				target.blur()
				emitSubmit()
			}
		} else if( key === 'Backspace' && target.value === '' ){
			const prevInput = inputs.current[target.i - 1]

			if( prevInput ){
				prevInput.focus()
			} else {
				target.blur()
			}
		}
	}

	return (
		<div
			className={styles.root}
			ref={ref}
		>
			{mask?.map( item => {
				if( item.type === 'text' )
					return <div key={item.uid}>
						{item.value}
					</div>

				return <input
					key={item.uid}
					className={styles.input}
					maxLength={item.length}
					onInput={onInput}
					onFocus={onFocus}
					onBlur={onBlur}
					onKeyDown={onKeyDown}
				/>
			})}
		</div>
	)
})

export default InputWithMask