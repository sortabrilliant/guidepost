/**
 * External dependencies
 */
import { kebabCase } from 'lodash';
import uniqid from 'uniqid';

/**
 * Internal dependencies
 */
import { Guidepost } from './Guidepost';
import { linearToNestedList } from './linear-to-nested-list';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, dispatch } from '@wordpress/data';

class GuidepostEdit extends Component {
	constructor() {
		super( ...arguments );
		this.headingsHaveChanged = this.headingsHaveChanged.bind( this );
		this.convertHeadingBlocksToAttributes = this.convertHeadingBlocksToAttributes.bind( this );
	}

	componentDidUpdate( prevProps ) {
		// Add anchors to all headings without an anchor.
		this.props.headings
			.filter( ( heading ) => typeof heading.attributes.anchor === 'undefined' )
			.forEach( ( block ) => dispatch( 'core/block-editor' ).updateBlockAttributes(
				block.clientId,
				{ anchor: uniqid.time() + '-' + kebabCase( block.attributes.content ) }
			) );

		const newHeadings = this.convertHeadingBlocksToAttributes( prevProps.headings );
		if ( this.headingsHaveChanged( prevProps.attributes.headings, newHeadings ) ) {
			this.props.setAttributes( { headings: newHeadings } );
		}
	}

	headingsHaveChanged( oldHeadings = [], newHeadings ) {
		if ( oldHeadings.length !== newHeadings.length ) {
			return true;
		}

		const changedHeadings = oldHeadings.filter( ( heading, index ) => {
			const newHeading = newHeadings[ index ];

			return (
				heading.content !== newHeading.content ||
				heading.anchor !== newHeading.anchor ||
				heading.level !== newHeading.level
			);
		} );

		// Return boolean value from length.
		return ! ! +changedHeadings.length;
	}

	convertHeadingBlocksToAttributes( headingBlocks ) {
		return headingBlocks.map( function( heading ) {
			const level = heading.attributes.level.toString();

			const headingContent = heading.attributes.content || '';
			const anchorContent = heading.attributes.anchor || '';

			// strip html from heading and attribute content
			const contentDiv = document.createElement( 'div' );

			contentDiv.innerHTML = headingContent;
			const content = contentDiv.textContent || contentDiv.innerText || '';

			contentDiv.innerHTML = anchorContent;
			const anchor = contentDiv.textContent || contentDiv.innerText || '';

			return { content, anchor, level };
		} );
	}

	render() {
		const { headings = [] } = this.props.attributes;

		if ( headings < 1 ) {
			return ( <p>Start adding headings and your guidepost will be generated automatically.</p> );
		}

		const nestedHeadings = linearToNestedList( headings );

		return (
			<div className={ this.props.className }>
				<Guidepost headings={ nestedHeadings } />
			</div>
		);
	}
}

export const Edit = compose( [
	withSelect( ( select ) => {
		const { getBlocks } = select( 'core/block-editor' );

		return {
			headings: getBlocks().filter( ( block ) => block.name === 'core/heading' ),
		};
	} ),
] )( GuidepostEdit );
