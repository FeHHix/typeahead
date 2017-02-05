import { createAction, Action } from 'redux-actions'

import { Dispatch } from 'redux'

import { Promise } from 'es6-promise'

// import fetch from 'isomorphic-fetch'

// import request from 'superagent/lib/client'

import { ReceiveItems, RequestItem, ProfileCard } from './model'
import stub from './stub'

import { 
	REQUEST_ITEMS,
	RECEIVE_ITEMS,
	FETCH_ITEMS
} from './constants/ActionTypes'

interface ApiAsync {
	value: any;
	dispatch: Dispatch<{}>;
}

// const getHints = createAction<RequestHint, string>(
// 	GET_HINTS,
// 	(text: string) => ({value: text})
// )

const requestItems = createAction<RequestItem, string>(
	REQUEST_ITEMS,
	(text: string) => ({value: text})
)

const receiveItems = createAction<ReceiveItems, ProfileCard[]>(
	RECEIVE_ITEMS,
	(items: ProfileCard[]) => ({items: items})
)

const fetchItems = createAction<Promise<void>, ApiAsync>(
	FETCH_ITEMS,
	(api: ApiAsync) => {
		api.dispatch(requestItems(api.value));

		const p: Promise<String> = new Promise(
			(resolve: (str: string) => void, reject: (str: string) => void) => {
				resolve(JSON.stringify(stub));
			}
		);

		return p.then((json: string) => {
			console.log('load items complete');
			api.dispatch(receiveItems(JSON.parse(json)));
		});

		// return fetch('https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=' + api.value)
	 //    	.then(response => response.json())
	 //    	.then(json => api.dispatch(receiveItems(JSON.stringify(json)))
	 //    );

	 	// new Promise((resolve, reject) => {

	 	// });

		// return request
		// 	.get('https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=' + api.value)
		// 	.set('Accept', 'application/json')
		// 	.end(function(err, res) {
		// 		api.dispatch(receiveItems(JSON.stringify(res)));
		// 	});

		//return api.dispatch(receiveItems(JSON.stringify(stub)));
	}
)

export { fetchItems }