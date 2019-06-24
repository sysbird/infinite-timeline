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

		});
		
		function reloadSrcsetImgs( item ) {
			var imgs = item.querySelectorAll('img[srcset]');
			for ( var i=0; i < imgs.length; i++ ) {
				var img = imgs[i];
				img.outerHTML = img.outerHTML;
			}
		} // end Hack
	} );

	// image loaded
	document.addEventListener( 'lazyloaded', function( e ){
		infinite_timeline_adjust_vertical_position( e );
	});
} );

/////////////
// adjust vertical position of days gone by
function infinite_timeline_adjust_vertical_position( e ){
	
	// this post position
	var item = jQuery(e.target).closest('.item');
	
	// next post position
	var item_next = item.next();
	if( item_next.length ){
		var bottom = parseInt( item.offset().top + item.outerHeight() );
		var bottom_next = parseInt( item_next.offset().top  + item_next.outerHeight());
		if( bottom_next <= bottom ){
			// adjust this post position under the next post
			var height = parseInt( item.find('.title').height() );
			if( item.find( 'img' ).length ){
				height = parseInt( item.find( 'img' ).height() );
			}

			var margin_top = parseInt( item_next.css( 'margin-top' ) );
			margin_top += ( bottom - bottom_next + 80 );
			item_next.css( 'margin-top', margin_top + 'px' );
		}
	}	
}