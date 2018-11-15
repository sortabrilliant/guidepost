<?php
/**
 * Plugin Name: Guidepost
 * Plugin URI: https://sortabrilliant.com/guidepost/
 * Description: Add a list of internal links allowing your readers to quickly navigate around.
 * Author: sorta brilliant
 * Author URI: https://sortabrilliant.com
 * Version: 1.0.2
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

/**
 * GitHub Plugin Updater.
 */
function sbb_github_plugin_updater_test_init() {
	include_once 'updater.php';

	if ( is_admin() ) {
		$config = array(
			'slug'               => plugin_basename( __FILE__ ),
			'proper_folder_name' => 'sbb-guidepost',
			'api_url'            => 'https://api.github.com/repos/sortabrilliant/guidepost',
			'raw_url'            => 'https://raw.github.com/sortabrilliant/guidepost/master',
			'github_url'         => 'https://github.com/sortabrilliant/guidepost',
			'zip_url'            => 'https://github.com/sortabrilliant/guidepost/archive/master.zip',
			'requires'           => '4.9.8',
			'tested'             => '4.9.8',
			'readme'             => 'README.md',
		);

		new SBB_Guidepost_GitHub_Updater( $config );
	}
}
add_action( 'init', 'sbb_github_plugin_updater_test_init' );
