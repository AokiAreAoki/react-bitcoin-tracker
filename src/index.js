import './index.scss';
import './GlobalVars.scss';

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import tracker from './services/PriceTracker';
import { store } from './store/store';
import { saveState } from './store/localStorage';
import throttle from './utils/throttle';

store.subscribe( throttle( () => {
	saveState( store.getState() )
}, 200 ) )

store.subscribe( () => {
	const interval = store.getState().tracker.updateInterval

	if( tracker.interval !== interval )
		tracker.setInterval( interval )
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);