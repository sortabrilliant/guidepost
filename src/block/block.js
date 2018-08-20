/**
 * BLOCK: sbb-guidepost
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'sbb/guidepost', {
	title: __( 'Guidepost' ),
	icon: 'info',
	category: 'common',
	keywords: [
		__( 'Guidepost' ),
		__( 'Table of Contents' ),
		__( 'Sorta Brilliant' ),
	],

	edit: function( props ) {
		return (
			<div className={ props.className }>
			</div>
		);
	},

	save: function( props ) {
		return (
			</div>
		);
	},
} );
