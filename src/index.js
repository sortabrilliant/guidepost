/**
 * Internal dependencies
 */
import metadata from './block.json';
import { Edit as edit } from './edit';
import { Icon as icon } from './icon';
import { Save as save } from './save';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'sortabrilliant/guidepost', {
	title: __( 'Guidepost', 'guidepost' ),
	description: __( 'Add a list of internal links allowing your readers to quickly navigate around.', 'guidepost' ),
	icon,
	category: metadata.category,
	keywords: [
		__( 'toc', 'guidepost' ),
		__( 'sortabrilliant', 'guidepost' ),
	],

	attributes: metadata.attributes,

	supports: {
		html: false,
		multiple: false,
	},

	edit,
	save,
} );
