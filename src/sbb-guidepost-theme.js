( function( $ ) {
	"use strict";

	$( document ).ready( function() {
		var bttTarget = 'guidepost';
		var bttVisible = false;

		var guidepostBlock = $( '.wp-block-sbb-guidepost:first' );
		if ( guidepostBlock.length ) {

			var backToTopElement = $( '<a class="sbb-guidepost-btt" href="#' + bttTarget + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 27.5"><path d="M11.2 10.8v8.9c0 .9.8 1.7 1.7 1.7s1.7-.8 1.7-1.7v-9.1l4.1 4.2c.7.7 1.8.7 2.4 0 .7-.7.7-1.8 0-2.5l-6.9-7c-.7-.7-1.8-.7-2.4 0l-7.1 7.1c-.7.7-.7 1.8 0 2.4.7.7 1.7.7 2.4 0l4.1-4M23.5.1c.9 0 1.7.8 1.7 1.7s-.8 1.7-1.7 1.7h-21C1.6 3.5.8 2.7.8 1.8S1.6.1 2.5.1h21"/></svg></a>' );

			guidepostBlock.attr( 'id', bttTarget );
			guidepostBlock.append( backToTopElement );

			window.addEventListener( 'scroll', function() {
				var guidepostOffsetTop = guidepostBlock.offset().top;
				if ( window.scrollY > guidepostOffsetTop && ! bttVisible ) {
					bttVisible = true;
					backToTopElement.addClass( 'visible' );
				} else if ( window.scrollY < guidepostOffsetTop && bttVisible ) {
					bttVisible = false;
					backToTopElement.removeClass( 'visible' );
				}
			} );

			$( document ).on( 'click', 'a[href*=#]', function ( event ) {
				event.preventDefault();

				var hash = $( this ).attr( 'href' );

				$( 'html, body' ).animate( {
					scrollTop: $(hash).offset().top
				}, 500, function() {
					window.location.hash = hash;
				} );
			} );

		}
	} );

} )( jQuery );
