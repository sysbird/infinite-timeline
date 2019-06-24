=== Infinite Timeline ===
Contributors: sysbird
Plugin URI: https://wordpress.org/plugins/infinite-timeline/
Tags: shortcode, post, timeline
Requires at least: 3.8
Tested up to: 5.2.2
Stable tag: 1.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

The shortcode displays posts on vertical timeline by infinite scroll.


== Description ==
The shortcode displays posts on vertical timeline, and it will read the next page by Infinite scroll.

* [Demo](https://birdsite.jp/archives/)
* [GitHub](https://github.com/sysbird/infinite-timeline)
* [Description in Japanese](https://sysbird.jp/wptips/infinite-timeline/)


= Features =
* The shortcode displays posts on vertical timeline.
* Automatically it will read the next page by Infinite scroll.
* When clicked the post on timeline, browse to single page.
* In addition to the post, use the page or custom post type, and can be set category, tag.
* It's compatible with responsive web design.
* [infinite-scroll.pkgd.js](https://infinite-scroll.com) the jQuery plugin is licensed under the MIT license.
* [lazysizes.js](https://github.com/aFarkas/lazysizes) the javascript library is licensed under the MIT license.


= Usage =
1. Please write shortcode [infinite-timeline] in the content.
2. You can set option.
   post_type: post or page or custom post type (default: post)
   category_name: category slug (default: none)
   tag: tag name (default: none)
   posts_per_page: number of posts you want to show on one page (default: Reading Settings at dashboard)
   example. [infinite-timeline category_name="news" posts_per_page="20"]

== Installation ==
1. Upload the entire "Infinite Timeline" folder to the /wp-content/plugins/ directory.
2. Activate the plugin through the ‘Plugins’ menu in WordPress.


== Screenshots ==
1. example  1
2. example  2


== Changelog ==

= 1.1 =
* fix WordPress Version 5.2.
* cntering loading image.
* used lazysizes.js for show images.
* change loop by WP_Query.
* ignore sticky posts.

= 1.0 =
* Hello, world!
