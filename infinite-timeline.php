<?php
/*
 Plugin Name: Infinite Timeline
 Plugin URI: http://wordpress.org/plugins/infinite-timeline/
 Description: The shortcode displays posts on vertical timeline.
 Author: sysbird
 Author URI: https://profiles.wordpress.org/sysbird/
 Version: 1.0
 License: GPLv2 or later
 Text Domain: infinite-timeline
 Domain Path: /languages
*/

//////////////////////////////////////////////////////
// Wordpress 3.0+
global $wp_version;
if ( version_compare( $wp_version, "3.8", "<" ) ){
	return false;
}

//////////////////////////////////////////////////////
// Start the plugin
class InfiniteTimeline {

	//////////////////////////////////////////
	// construct
	function __construct() {
		load_plugin_textdomain( 'infinite-timeline', false, plugin_basename( dirname( __FILE__ ) ) . '/languages' );
		add_shortcode('infinite-timeline', array( &$this, 'shortcode' ) );
		add_action( 'wp_enqueue_scripts', array( &$this, 'add_script' ) );
		add_action( 'wp_print_styles', array( &$this, 'add_style' ) );
	}

	//////////////////////////////////////////
	// add JavaScript
	function add_script() {
		$filename = plugins_url( dirname( '/' .plugin_basename( __FILE__ ) ) ).'/js/imagesloaded.pkgd.js';
		wp_enqueue_script( 'infinite-timeline-imagesloaded.pkgd', $filename, array( 'jquery' ), '3.1.8' );

		$filename = plugins_url( dirname( '/' .plugin_basename( __FILE__ ) ) ).'/js/jquery.infinitescroll.js';
		wp_enqueue_script( 'infinite-timeline-infinitescroll', $filename, array( 'jquery' ), '2.1.0' );

		$filename = plugins_url( dirname( '/' .plugin_basename( __FILE__ ) ) ).'/js/infinite-timeline.js';
		wp_enqueue_script( 'infinite-timeline', $filename, array( 'jquery' ), '1.0' );
	}

	//////////////////////////////////////////
	// add css
	function add_style() {
		$filename = plugins_url( dirname( '/' .plugin_basename( __FILE__ ) ) ).'/css/infinite-timeline.css';
		wp_enqueue_style( 'infinite-timeline', $filename, false, '1.1' );
	}

	//////////////////////////////////////////
	// ShoetCode
	function shortcode( $atts ) {

		global $page, $post;
		$output = '';

		// option
		$atts = shortcode_atts( array( 'category_name' => '',
											'tag' => '',
											'post_type' => 'post',
											'posts_per_page' => 0 ),
											$atts );
	
		$args = array( 'post_type' => $atts['post_type'] );

		// category name
		$category_name = $atts['category_name'];
		if( $category_name ){
			$args['category_name'] = $category_name;
		}

		// tag
		$tag = $atts['tag'];
		if( $tag ){
			$args['tag'] = $tag;
		}

		// posts per page
		$posts_per_page = $atts['posts_per_page'];
		if( !$posts_per_page ){
			$posts_per_page = get_option( 'posts_per_page' );
		}
		$args['posts_per_page'] = $posts_per_page;
		wp_reset_postdata();

		// prev post
		$year_prev = 0;
		if( 1 < $page ){
			$args['posts_per_page'] = 1;
			$args['offset'] = $posts_per_page * ( $page -1 ) -1;
			$myposts = get_posts( $args );
			if ( $myposts ) {
				foreach( $myposts as $post ){
					setup_postdata( $post );
					$year_prev = ( integer )get_post_time( 'Y' );
				}
			}

			wp_reset_postdata();
		}

		// get posts
		$args['posts_per_page'] = $posts_per_page;
		$args['offset'] = $posts_per_page * ( $page -1 );
		$myposts = get_posts( $args );
		$time_last = 0;
		$year_last = 0;
		$year_top = 0;
		$count = 0;
		if ( $myposts ) {
			foreach( $myposts as $post ){
				setup_postdata( $post );
				$title = get_the_title();

				$add_class = '';
				if ( has_post_thumbnail( $post->ID ) ) {
				//	$add_class = ' has_post_thumbnail';
				}

				if( $count %2 ){
					$add_class .= ' right';
				}
				else{
					$add_class .= ' left';	
				}
				
				// days gone by
				$time_current = (integer)get_post_time();
				if(!$time_last){
					$time_last = (integer)get_post_time();
				}

				$year = ( integer )get_post_time( 'Y' );
				if( $year != $year_last ){
					if( $count ){
						$output .= '</div>';
					}

					if( $year <> $year_prev ) {
						$output .= '<div class="year_head">' .$year .'</div>';
					}

					$year_last = $year;
					$year_top = 1;
					$output .= '<div class="year_posts">';
				}

				$days = ceil(abs($time_current - $time_last) / (60 * 60 * 24) );
				$time_last = $time_current;

				$add_style = '';
				if( $year_top ){
					$add_class .= ' year_top';
				}
				else{
					$add_style = ' style="margin-top: ' .$days .'px;"';
				}

				$size = 'large';
				if( wp_is_mobile() ){
					$size = 'medium';
				}

				$output .= '<div class="item' .$add_class .'"' .$add_style .'>';
				$output .= '<a href="' .get_permalink() .'">';
				$output .= get_the_post_thumbnail( $post->ID, $size );
				$output .= '<div class="title">' .get_post_time( get_option( 'date_format' ) ) .'<br>' .$title .'</div>';
				$output .= '</a>';
				$output .= '</div>';

				$count++;
				$year_top = 0;
  			}
		}

		wp_reset_postdata();

		// output
		if( $count ){
			$url = add_query_arg( array( 'page' => ( $page + 1 ) ) );
			$output = '<div id="infinite_timeline"><div class="box">' .$output .'</div></div><div class="pagenation"><a href="' .$url .'">' .__('More', 'infinite-timeline') .'</a><img src="' .plugins_url( dirname( '/' .plugin_basename( __FILE__ ) ) ) .'/loading.gif" alt="" class="loading"></div></div>';
		}

		return $output;
	}
}
$InfiniteTimeline = new InfiniteTimeline();
?>