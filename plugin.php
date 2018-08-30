<?php
/**
 * Plugin Name: Guidepost — Sorta Brilliant
 * Plugin URI: https://github.com/sortabrilliant/sbb-guidepost/
 * Description: Add a list of internal links allowing your readers to quickly navigate around.
 * Author: Sorta Brilliant
 * Author URI: https://sortabrilliant.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package SBB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
