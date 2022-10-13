import axios from 'axios'
import { store, actions } from '../store/store'

const token = `7c116ddd-9b21-411b-846a-c013d3017216`
export const minInterval = 5e3

class PriceTracker {
	static url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`

	interval = 60e3
	timeout = null
	lastRequest = Date.now()

	constructor(){
		this.fetchPrice()
		this.runTimeout()
	}

	setInterval( newInterval ){
		if( typeof newInterval === 'number' ){
			this.interval = newInterval < minInterval
				? minInterval
				: newInterval
			this.runTimeout()
		}
	}

	runTimeout(){
		clearTimeout( this.timeout )

		this.timeout = setTimeout( () => {
			this.fetchPrice()
			this.runTimeout()
		}, this.lastRequest + this.interval - Date.now() )
	}

	fetchPrice(){
		this.lastRequest = Date.now()

		// axios.get( PriceTracker.url, {
		// 	headers: {
		// 		'X-CMC_PRO_API_KEY': token,
		// 	},
		// 	params: {
		// 		symbol: 'BTC'
		// 	},
		// })
		new Promise( resolve => {
			setTimeout( () => {
				resolve({
					data: {
						data: {
							BTC: {
								quote: {
									USD: {
										price: Math.random() * 10e3,
									}
								}
							}
						}
					}
				})
			}, 1337 )
		})
			.then( response => {
				const entry = {
					price: response.data.data.BTC.quote.USD.price,
					timestamp: Date.now(),
				}

				store.dispatch( actions.addCurrency( entry ) )
			})
			.catch( err => {
				console.error( err.message )
			})
	}
}

export default new PriceTracker()