import * as React from 'react';

import TypeaheadTextInput from './TypeaheadTextInput';

interface HeaderProps {
	getItems: (text: string) => any;
};

class Header extends React.Component<HeaderProps, void> {
	handleSearch(text: string) {
		this.props.getItems(text);
	}

	render() {
		return(
			<div className="header">
				<h1>typeahead</h1>
				<TypeaheadTextInput 
					onTypeahead={this.handleSearch.bind(this)}
					placeholder="Search Twitter users..." />
			</div>
		)
	}
}

export default Header;