
export default ( callback, ms = 100 ) => {
	let timeout = null
	let toCallNextTime = false

	const throttler = () => {
		if( timeout )
			toCallNextTime = true
		else {
			callback()

			timeout = setTimeout( () => {
				timeout = null

				if( toCallNextTime )
					throttler()
			}, ms )
		}
	}

	return throttler
}