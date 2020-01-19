const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const FixStyleOnlyEntriesPlugin = require( 'webpack-fix-style-only-entries' );

module.exports = {
	...defaultConfig,

	entry: {
		...defaultConfig.entry,

		'guidepost-editor': path.resolve( process.cwd(), 'src/block/editor.scss' ),
		'guidepost-style': path.resolve( process.cwd(), 'src/block/style.scss' ),

		'sbb-guidepost-theme': path.resolve( process.cwd(), 'src/sbb-guidepost-theme.js' ),
	},

	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { url: false } },
					{ loader: 'sass-loader' },
				],
			},
		],
	},

	plugins: [
		...defaultConfig.plugins,
		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin( { filename: '[name].css' } ),
	],
};
