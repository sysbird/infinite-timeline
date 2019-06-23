/*
 Plugin Name: Infinite Timeline
 infinite-timeline.js
 Version: 1.1
 */
jQuery( function(){

	if( 0 == jQuery( '#infinite_timeline' ).length ){
		return;
	}

	jQuery( window ).load(function() {
		// infinitescroll
		var infScroll = new InfiniteScroll( '#infinite_timeline .page', {
			path: '#infinite_timeline .pagenation a',
			append: '#infinite_timeline .box',
			button: '#infinite_timeline .pagenation',
			status: '#infinite_timeline .page-load-status',
			scrollThreshold: true,
			history: 'false',
		});

		infinite_timeline_adjust_vertical_position( 0 );

		// Safari not displaying loaded srcset images according to Official Hack
		jQuery('#infinite_timeline .page').on('append.infiniteScroll', function(event, response, path, items) {
			jQuery(items).find('img[srcset]').each(function(i, img) {
				img.outerHTML = img.outerHTML;
			});
		});
		
		infScroll.on( 'append', function( response, path, items ) {
			for ( var i=0; i < items.length; i++ ) {
				reloadSrcsetImgs( items[i] );
			}

			jQuery( items ).imagesLoaded(function(){
				infinite_timeline_adjust_vertical_position( items );
			});
		});
		
		function reloadSrcsetImgs( item ) {
			var imgs = item.querySelectorAll('img[srcset]');
			for ( var i=0; i < imgs.length; i++ ) {
				var img = imgs[i];
				img.outerHTML = img.outerHTML;
			}
		}
		// end Hack

	} );

} );

/////////////
// adjust vertical position of days gone by
function infinite_timeline_adjust_vertical_position( newElements ){

	var elements;
	if( newElements ){
		// more
		elements = jQuery( newElements ).find( '.item' );
	}
	else{
		// Initialize
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