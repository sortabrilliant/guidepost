import { Component } from 'react';
import Node from './Node';

import { linearToNestedList, getHeadingBlocks, convertHeadingBlocksToAttributes } from '../utils';

const { subscribe } = wp.data;

export default class Guidepost extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			headings: props.headings,
			wpDataUnsubscribe: null,
		};
	}

	componentDidMount() {
		const wpDataUnsubscribe = subscribe( () => {
			const headings = linearToNestedList( convertHeadingBlocksToAttributes( getHeadingBlocks() ) );
			this.setState( { headings } );
		} );

		this.setState( { wpDataUnsubscribe } );
	}

	componentWillUnmount() {
		this.state.wpDataUnsubscribe();
	}

	componentWillUpdate( nextProps, nextState ) {
		if ( JSON.stringify( nextProps.headings ) !== JSON.stringify( nextState.headings ) ) {
			this.props.blockObject.setAttributes( { headings: convertHeadingBlocksToAttributes( getHeadingBlocks() ) } );
		}
	}

	render() {
		if ( this.state.headings.length === 0 ) {
			return ( <p>Add some Headings to generate the Guidepost.</p> );
		}

		const nodes = this.state.headings.map( function( heading ) {
			return (
				<Node key={ heading.block.anchor } node={ heading.block } children={ heading.children } />
			);
		} );

		return (
			<ul>
				{ nodes }
			</ul>
		);
	}
}
