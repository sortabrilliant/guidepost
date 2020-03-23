/**
 * Internal dependencies
 */
import metadata from './block.json';
import { linearToNestedList } from './linear-to-nested-list';

/**
 * WordPress dependencies
 */
import { Disabled } from '@wordpress/components';

const Guidepost = ( props ) => (
	<ul>
		{ props.headings.map( ( heading, index ) => (
			<Node
				key={ index }
				content={ heading.block.content }
				anchor={ heading.block.anchor }
				level={ heading.block.level }
				children={ heading.children }
			/>
		) ) }
	</ul>
);

const Node = ( props ) => (
	<li>
		<Disabled>
			<a href={ `#${ props.anchor.replace( '#', '' ) }` } data-level={ props.level }>
				{ props.content }
			</a>
		</Disabled>
		{ props.children && (
			<Guidepost headings={ props.children } />
		) }
	</li>
);

export const deprecated = [
	{
		attributes: metadata.attributes,
		save: ( { attributes, className } ) => {
			const { headings = [] } = attributes;

			return ( headings < 1 ) ? null : (
				<div className={ className }>
					<Guidepost headings={ linearToNestedList( headings ) } />
				</div>
			);
		},
	},
];
