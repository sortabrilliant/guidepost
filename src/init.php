<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package SBB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @since 1.0.0
 */
function sbb_guidepost_block_assets() {
	// Styles.
	wp_enqueue_style(
		'sbb-guidepost-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-blocks' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);
}

add_action( 'enqueue_block_assets', 'sbb_guidepost_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function sbb_guidepost_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'sbb-guidepost-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
		true
	);

	// Styles.
	wp_enqueue_style(
		'sbb-guidepost-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
	);
}

add_action( 'enqueue_block_editor_assets', 'sbb_guidepost_editor_assets' );
