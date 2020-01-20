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

defined( 'ABSPATH' ) || exit;

define( 'SBBGP_VERSION', '1.0.4' );
define( 'SBBGP_PLUGIN_DIR', dirname( __FILE__ ) );
define( 'SBBGP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 */
function sbb_guidepost_register_block() {
	$default_asset_file = array(
		'dependencies' => array(),
		'version'      => SBBGP_VERSION,
	);

	// Editor Script.
	$asset_filepath = SBBGP_PLUGIN_DIR . '/build/index.asset.php';
	$asset_file     = file_exists( $asset_filepath ) ? include $asset_filepath : $default_asset_file;

	wp_register_script(
		'sbb-guidepost-editor',
		SBBGP_PLUGIN_URL . 'build/index.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true // Enqueue script in the footer.
	);

	// Frontend Script.
	$asset_filepath = SBBGP_PLUGIN_DIR . '/build/sbb-guidepost-theme.asset.php';
	$asset_file     = file_exists( $asset_filepath ) ? include $asset_filepath : array(
		'dependencies' => array(),
		'version'      => SBBGP_VERSION,
	);

	wp_register_script(
		'sbb-guidepost-frontend',
		SBBGP_PLUGIN_URL . 'build/sbb-guidepost-theme.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	// Editor Styles.
	$asset_filepath = SBBGP_PLUGIN_DIR . '/build/guidepost-editor.asset.php';
	$asset_file     = file_exists( $asset_filepath ) ? include $asset_filepath : $default_asset_file;

	wp_register_style(
		'sbb-guidepost-editor',
		SBBGP_PLUGIN_URL . 'build/guidepost-editor.css',
		array(),
		$asset_file['version']
	);

	// Frontend Styles.
	$asset_filepath = SBBGP_PLUGIN_DIR . '/build/guidepost-style.asset.php';
	$asset_file     = file_exists( $asset_filepath ) ? include $asset_filepath : $default_asset_file;

	wp_register_style(
		'sbb-guidepost-frontend',
		SBBGP_PLUGIN_URL . 'build/guidepost-style.css',
		array(),
		$asset_file['version']
	);

	register_block_type(
		'sbb/guidepost',
		array(
			'editor_script' => 'sbb-guidepost-editor',
			'editor_style'  => 'sbb-guidepost-editor',
			'script'        => 'sbb-guidepost-frontend',
			'style'         => 'sbb-guidepost-frontend',
		)
	);
}

add_action( 'init', 'sbb_guidepost_register_block' );
