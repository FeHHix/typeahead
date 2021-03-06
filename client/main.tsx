import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Store, createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './main/components/App'
import rootReducer from './main/reducer'

let store: Store<any> = createStore(rootReducer) //configuration store with empty initial state

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);