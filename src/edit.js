/**
 * External dependencies
 */
import { kebabCase, isEqual } from 'lodash';

/**
 * Internal dependencies
 */
import { Guidepost } from './Guidepost';
import { Icon as icon } from './icon';
import { linearToNestedList } from './linear-to-nested-list';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Placeholder, Disabled } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';

class GuidepostEdit extends Component {
	componentDidUpdate( prevProps ) {
		const {
			headingBlocks,
			headings,
			setAttributes,
			updateBlockAttributes,
		} = this.props;

		if ( ! isEqual( prevProps.attributes.headings, headings ) ) {
			// Generate new anchors for duplicated headings.
			headingBlocks.forEach( ( heading, index ) => {
				const duplicateHeadings = headingBlocks.filter( ( block ) => block.attributes.anchor === heading.attributes.anchor );

				if ( ( duplicateHeadings && duplicateHeadings.length > 1 ) || typeof heading.attributes.anchor === 'undefined' || heading.attributes.anchor === '' ) {
					updateBlockAttributes(
						heading.clientId,
						{ anchor: index + '-' + kebabCase( heading.attributes.content ) }
					);
				}
			} );

			setAttributes( { headings } );
		}
	}

	render() {
		const { headings = [] } = this.props;

		if ( headings < 1 ) {
			return (
				<Placeholder
					icon={ icon }
					label={ __( 'Guidepost', 'guidepost' ) }
					instructions={ __( 'Start adding headings and your guidepost will be generated automatically.', 'guidepost' ) }
				/>
			);
		}

		const nestedHeadings = linearToNestedList( headings );

		return (
			<div className={ this.props.className }>
				<Disabled>
					<Guidepost headings={ nestedHeadings } />
				</Disabled>
			</div>
		);
	}
}

export const Edit = compose( [
	withSelect( ( select ) => {
		const { getBlocks } = select( 'core/block-editor' );

		const headingBlocks = getBlocks().filter( ( block ) => block.name === 'core/heading' && !! block.attributes.content );

		return {
			headingBlocks,
			headings: headingBlocks.map( ( block ) => ( {
				content: block.attributes.content,
				anchor: '#' + block.attributes.anchor,
				level: block.attributes.level.toString(),
			} ) ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { updateBlockAttributes } = dispatch( 'core/block-editor' );

		return {
			updateBlockAttributes,
		};
	} ),
] )( GuidepostEdit );
