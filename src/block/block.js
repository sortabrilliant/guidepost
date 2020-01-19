/**
 * BLOCK: sbb/guidepost
 *
 * Registering the Guidepost block with Gutenberg.
 */

import * as Utils from './utils';
import Guidepost from './components/Guidepost';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const el = wp.element.createElement;

const iconEl = el( 'svg', { width: 24, height: 24 },
	el( 'path', { d: 'M21.71,11.29l-9-9c-0.39-0.39-1.02-0.39-1.41,0l-9,9c-0.39,0.39-0.39,1.02,0,1.41l9,9c0.39,0.39,1.02,0.39,1.41,0l9-9C22.1,12.32,22.1,11.69,21.71,11.29z M14,14.5V12h-4v2c0,0.55-0.45,1-1,1h0c-0.55,0-1-0.45-1-1v-3c0-0.55,0.45-1,1-1h5V7.5l3.15,3.15c0.2,0.2,0.2,0.51,0,0.71L14,14.5z' } )
);

/**
 * Register our Gutenberg block.
 */
registerBlockType( 'sbb/guidepost', {
	title: __( 'Guidepost' ),
	description: __( 'Add a list of internal links allowing your readers to quickly navigate around.' ),
	icon: iconEl,
	category: 'common',
	keywords: [
		__( 'Guidepost' ),
		__( 'Table of Contents' ),
		__( 'Sorta Brilliant' ),
	],

	attributes: {
		headings: {
			source: 'query',
			selector: 'a',
			query: {
				content: { source: 'text' },
				anchor: { source: 'attribute', attribute: 'href' },
				level: { source: 'attribute', attribute: 'data-level' },
			},
		},
	},

	supports: {
		html: false,
		multiple: false,
	},

	edit: ( props ) => {
		let headings = props.attributes.headings || [];
		const newHeadings = Utils.convertHeadingBlocksToAttributes( Utils.getHeadingBlocks() );

		if ( Utils.haveHeadingsChanged( headings, newHeadings ) ) {
			headings = newHeadings;
			props.setAttributes( { headings } );

			Utils.updateHeadingBlockAnchors();
		}

		return (
			<div className={ props.className }>
				<Guidepost headings={ Utils.linearToNestedList( headings ) } blockObject={ props } />
			</div>
		);
	},

	save: ( props ) => {
		return props.attributes.headings.length === 0 ? null : (
			<div className={ props.className }>
				<Guidepost headings={ Utils.linearToNestedList( props.attributes.headings ) } />
			</div>
		);
	},
} );
