( function() {
	'use strict';

	window.addEventListener( 'DOMContentLoaded', () => {
		const bttTarget = 'guidepost';
		let bttVisible = false;

		const guidepostBlock = document.querySelector( '.wp-block-sortabrilliant-guidepost' );

		if ( typeof guidepostBlock !== 'undefined' ) {
			const backToTopElement = document.createElement( 'a' );
			backToTopElement.className = 'sortabrilliant-guidepost-button';
			backToTopElement.href = `#${ bttTarget }`;

			backToTopElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 27.5"><path d="M11.2 10.8v8.9c0 .9.8 1.7 1.7 1.7s1.7-.8 1.7-1.7v-9.1l4.1 4.2c.7.7 1.8.7 2.4 0 .7-.7.7-1.8 0-2.5l-6.9-7c-.7-.7-1.8-.7-2.4 0l-7.1 7.1c-.7.7-.7 1.8 0 2.4.7.7 1.7.7 2.4 0l4.1-4M23.5.1c.9 0 1.7.8 1.7 1.7s-.8 1.7-1.7 1.7h-21C1.6 3.5.8 2.7.8 1.8S1.6.1 2.5.1h21" /></svg>';

			guidepostBlock.id = bttTarget;
			guidepostBlock.appendChild( backToTopElement );

			window.addEventListener( 'scroll', function() {
				const guidepostOffsetTop = guidepostBlock.offsetTop;
				if ( window.scrollY > guidepostOffsetTop && ! bttVisible ) {
					bttVisible = true;
					backToTopElement.classList.add( 'visible' );
				} else if ( window.scrollY < guidepostOffsetTop && bttVisible ) {
					bttVisible = false;
					backToTopElement.classList.remove( 'visible' );
				}
			} );

			[ ...document.getElementsByTagName( 'a' ) ]
				.filter( ( element ) => !! element.hash )
				.forEach( ( element ) => {
					const scrollToTarget = ( targetElementId ) => {
						const scrollToElement = document.getElementById(
							targetElementId.split( '#' )[ 1 ]
						);

						const easeInCubic = ( t ) => t * t * t;

						let start = null;
						const duration = 500;

						const animationStep = ( timestamp ) => {
							start = start || timestamp;
							const runtime = timestamp - start;

							const ease = easeInCubic( runtime / duration );
							window.scroll( 0, window.pageYOffset + ( scrollToElement.getBoundingClientRect().top * ease ) );

							if ( runtime < duration ) {
								requestAnimationFrame( animationStep );
							}
						};

						requestAnimationFrame( animationStep );
					};

					element.addEventListener( 'click', ( event ) => {
						event.preventDefault();
						scrollToTarget( event.currentTarget.hash );
					} );
				} );
		}
	} );
}() );
