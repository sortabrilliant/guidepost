
export function linearToNestedList( array ) {
	const returnValue = [];

	array.forEach( function( heading, key ) {
		if ( typeof heading.content === 'undefined' ) {
			return;
		}

		// Make sure we are only working with the same level as the first iteration in our set.
		if ( heading.level === array[ 0 ].level ) {
			// Check that the next iteration will return a value.
			// If it does and the next level is greater than the current level,
			// the next iteration becomes a child of the current interation.
			if (
				( typeof array[ key + 1 ] !== 'undefined' ) &&
				( array[ key + 1 ].level > heading.level )
			) {
				// We need to calculate the last index before the next iteration that has the same level (siblings).
				// We then use this last index to slice the array for use in recursion.
				// This prevents duplicate nodes.
				let endOfSlice = array.length;
				for ( let i = ( key + 1 ); i < array.length; i++ ) {
					if ( array[ i ].level === heading.level ) {
						endOfSlice = i;
						break;
					}
				}

				// We found a child node: Push a new node onto the return array with children.
				returnValue.push( {
					block: heading,
					children: linearToNestedList( array.slice( key + 1, endOfSlice ) ),
				} );
			} else {
				// No child node: Push a new node onto the return array.
				returnValue.push( {
					block: heading,
					children: null,
				} );
			}
		}
	} );

	return returnValue;
}

export function getHeadingBlocks() {
	const editor = wp.data.select( 'core/editor' );
	return editor.getBlocks().filter( block => block.name === 'core/heading' );
}

export function convertHeadingBlocksToAttributes( headingBlocks ) {
	return headingBlocks.map( function( heading ) {
		const level = heading.attributes.level.toString();

		let content = heading.attributes.content || '';
		if ( typeof content[ 0 ] !== 'undefined' ) {
			content = content[ 0 ].toString();
		}

		let anchor = heading.attributes.anchor || '';
		if ( anchor !== '' && anchor.indexOf( '#' ) === -1 ) {
			anchor = '#' + anchor;
		}

		return { content, anchor, level };
	} );
}
