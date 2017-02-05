import request from 'superagent'

import { createAction, Action } from 'redux-actions'

import { RequestHint, ProfileCard } from './model'

import { Dispatch } from 'redux'

interface ApiAsync {
	value: any;
	dispatch: Dispatch<{}>;
}

import { 
	GET_HINTS,
	REQUEST_ITEMS,
	RECEIVE_ITEMS,
	FETCH_ITEMS
} from './constants/ActionTypes'

const getHints = createAction<RequestHint, string>(
	GET_HINTS,
	(text: string) => ({value: text})
)

const requestItems = createAction<string, string>(
	REQUEST_ITEMS,
	(text: string) => ("REQUEST ITEMS WITH " + text)
)

const receiveItems = createAction<ProfileCard[], string>(
	RECEIVE_ITEMS,
	(json: string) => ([])
)

const fetchItems = createAction<any, ApiAsync>(
	FETCH_ITEMS,
	(api: ApiAsync) => {
		api.dispatch(requestItems(api.value));

		return request
			.post('https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=' + api.value)
			.set('Accept', 'application/json')
			.end(function(err, res) {
				api.dispatch(receiveItems(JSON.stringify(res)));
			});
	}
)

export { getHints, fetchItems }