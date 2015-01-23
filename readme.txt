=== Infinite Timeline ===
Contributors: sysbird
Plugin URI: http://wordpress.org/plugins/infinite-timeline/
Tags: shortcode, post, timeline
Requires at least: 3.8
Tested up to: 4.1
Stable tag: 1.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

The shortcode displays posts on vertical timeline by infinite scroll.

== Description ==
The shortcode displays posts on vertical timeline, and it will read the next page by Infinite scroll.

* [Demo](http://www.sysbird.jp/birdsite/archives/)  
* [GitHub](https://github.com/sysbird/infinite-timeline)
* [Description in Japanese](http://www.sysbird.jp/wptips/infinite-timeline/)  

= Features =
* The shortcode displays posts on vertical timeline.  
* Automatically it will read the next page by Infinite scroll.  
* When clicked the post on timeline, browse to single page.  
* In addition to the post, use the page or custom post type, and can be set category, tag.    
* It's compatible with responsive web design.  
* [jquery.infinitescroll.js](https://github.com/paulirish/infinite-scroll) the jQuery plugin is licensed under the MIT license.  
* [imagesloaded.pkgd.js](https://github.com/desandro/imagesloaded) the jQuery plugin is licensed under the MIT license.  

= Usage =
1. Please write shortcode [infinite-timeline] in the content.  
2. You can set option.  
   post_type: post or page or custom post type (default: post)  
   category_name: category slug (default: none)  
   tag: tag name (default: none)  
   posts_per_page: number of posts you want to show on one page (default: Reading Settings at dashboard)  
   example. [infinite-timeline category_name="news" posts_per_page="20"]  

= Contributors =
TORIYAMA Yuko at [sysbird](https://profiles.wordpress.org/sysbird/)  

== Installation ==
1. Upload the "Infinite Timeline" folder to the plugins directory in your WordPress installation.  
2. Go to plugins list and activate "Infinite Timeline".  

== Screenshots ==
1. Posts on vertical timeline  

== Changelog ==

= 1.0 =
* Hello, world!  
