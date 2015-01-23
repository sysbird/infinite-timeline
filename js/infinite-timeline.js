/*
 Plugin Name: Infinite Timeline
 infinite-timeline.js
 Version: 1.0
 */
jQuery( function(){
	if( 0 == jQuery( '#infinite_timeline' ).length ){
		return;
	}

	jQuery( window ).load(function() {

		// infinitescroll
		var loading = jQuery( '#infinite_timeline img.loading' ).attr( 'src' );
		jQuery( '#infinite_timeline' ).infinitescroll( {
			navSelector  : "#infinite_timeline .pagenation",
			nextSelector : "#infinite_timeline .pagenation a",
			itemSelector : "#infinite_timeline .box",
			loading: {
				img: loading,
			}
		},
		function( newElements ){
			// Loaded
			jQuery( newElements ).imagesLoaded(function(){
				infinite_timeline_adjust_vertical_position( newElements );
				jQuery( '#infscr-loading' ).remove();
			});
		} );

		infinite_timeline_adjust_vertical_position( 0 );
	} );
} ); 

/////////////
// adjust vertical position of days gone by
function infinite_timeline_adjust_vertical_position( newElements ){

	var elements;
	if( newElements ){
		elements = jQuery( newElements ).find( '.item' );
	}
	else{
		elements = jQuery( '#infinite_timeline .item' );
	}

	elements.each(function( i, elem ) {
		// this post position
		var top = parseInt( jQuery( this ).offset().top );
		var bottom = top + parseInt( jQuery( this ).outerHeight() );

		// prev post position
		var bottom_prev = 0;
		if( jQuery( this ).prev().length ){
			bottom_prev = parseInt( jQuery( this ).prev().offset().top + jQuery( this ).prev().outerHeight() );
		}

		if( bottom_prev >= bottom ){
			// adjust this post position under the prev post
			var height = parseInt( jQuery( this ).find('.title').height() );
			if( jQuery( this ).find( 'img' ).length ){
				height = parseInt( jQuery( this ).find( 'img' ).height() );
			}

			var margin_top = parseInt( jQuery( this ).css( 'margin-top' ) );
			margin_top += bottom_prev - top - height;
			jQuery( this ).css( 'margin-top', margin_top + 'px' );
		}
	} );
}