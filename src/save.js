/**
 * Internal dependencies
 */
import { Guidepost } from './Guidepost';
import { linearToNestedList } from './linear-to-nested-list';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

export class Save extends Component {
	render() {
		const { headings = [] } = this.props.attributes;

		return ( headings < 1 ) ? null : (
			<div className={ this.props.className }>
				<Guidepost headings={ linearToNestedList( headings ) } />
			</div>
		);
	}
}
