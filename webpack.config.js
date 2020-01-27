const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const FixStyleOnlyEntriesPlugin = require( 'webpack-fix-style-only-entries' );

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	...defaultConfig,

	entry: {
		...defaultConfig.entry,

		'guidepost-editor': path.resolve( process.cwd(), 'src/styles/editor.scss' ),
		'guidepost-style': path.resolve( process.cwd(), 'src/styles/style.scss' ),

		'guidepost-theme': path.resolve( process.cwd(), 'src/guidepost-theme.js' ),
	},

	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { url: false, sourceMap: ! isProduction } },
					{ loader: 'sass-loader', options: { sourceMap: ! isProduction } },
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
