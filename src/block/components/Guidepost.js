import { Component } from 'react';
import Node from './Node';

import * as Utils from '../utils';

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
			const headings = Utils.linearToNestedList( Utils.convertHeadingBlocksToAttributes( Utils.getHeadingBlocks() ) );
			Utils.updateHeadingBlockAnchors();
			this.setState( { headings } );
		} );

		this.setState( { wpDataUnsubscribe } );
	}

	componentWillUnmount() {
		this.state.wpDataUnsubscribe();
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( JSON.stringify( prevProps.headings ) !== JSON.stringify( prevState.headings ) ) {
			this.props.blockObject.setAttributes( { headings: Utils.convertHeadingBlocksToAttributes( Utils.getHeadingBlocks() ) } );
		}
	}

	render() {
		if ( this.state.headings.length === 0 ) {
			return ( <p>Start adding headings and your guidepost will be generated automatically.</p> );
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
