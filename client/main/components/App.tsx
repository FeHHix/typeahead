import { Dispatch } from 'redux' //it calls action to update state of app
import { connect } from 'react-redux'
import * as React from 'react'

import {
  Header,
  Menu,
  model,
  fetchHints,
  requestHints,
  receiveHints,
  selectHint
} from '../../typeahead'

interface AppProps {
	isFetching: boolean;
	hint: model.ProfileCard;
	hints: model.ProfileCard[];
	dispatch: Dispatch<{}>;
	value: string;
	getHints(value: string):void;
	selectHint(value: string):void;
}

interface AppState {
	showResult: boolean;
	isFocused?: boolean;
	entryValue?: string;
}

class App extends React.Component<AppProps, AppState> {
	constructor(props, context) {
		super(props, context);

		this.state = {
			isFocused: false,
			showResult: false,
			entryValue: ''
		}
	}

	shouldCloseMenu(isFocused: boolean) {
		if (isFocused)
			this.setState({isFocused: isFocused, showResult: true});
	}

	selectHint(hint: model.ProfileCard) {
		this.props.selectHint(hint.realName);
	}

	componentWillReceiveProps(nextProps) {
	    this.setState({
	    	entryValue: nextProps.value,
	    	showResult: nextProps.hints.length > 0
	    });
	}

	render() {
		const { isFetching, getHints, hints, hint } = this.props;
		const { showResult, entryValue } = this.state;
		
		return(
			<div className="Typeahead Typeahead--twitterUsers">
				<Header value={entryValue} getHints={(text: string) => {getHints(text)}} getIsFocused={this.shouldCloseMenu.bind(this)} />
				{showResult ? <Menu hints={hints} onClickHint={this.selectHint.bind(this)} /> : ''}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isFetching: state.data.isFetching,
	hints: state.data.hints,
	value: state.data.value
});

const mapDispatchToProps = dispatch => ({
	getHints: (value: string) => {
		dispatch(requestHints(value));

		fetchHints(value).then((hints: model.ProfileCard[]) => {
			dispatch(receiveHints(hints));
		});
	},
	selectHint: (value: string) => {
		dispatch(selectHint(value));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(App); //it connects an application to store

