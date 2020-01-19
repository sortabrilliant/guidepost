<?php
/**
 * Plugin Name: Guidepost
 * Plugin URI: https://sortabrilliant.com/guidepost/
 * Description: Add a list of internal links allowing your readers to quickly navigate around.
 * Author: sorta brilliant
 * Author URI: https://sortabrilliant.com
 * Version: 1.0.4
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Guidepost
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
