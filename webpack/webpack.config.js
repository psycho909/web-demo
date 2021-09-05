const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
	mode: "development",
	target: "web",
	entry: {
		index: "./src/js/index.js",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[name].js",
	},
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "../",
						},
					},
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
					},
					{
						loader: "sass-loader",
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(png|jpg|gif|jpe?g|svg)$/,
				type: "asset/resource",
				generator: {
					filename: "images/[name][ext]",
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
			chunkFilename: "css/[id].css",
		}),
	],
	devServer: {
		static: {
			directory: path.resolve(__dirname, "src"),
			watch: true,
		},
		port: 9000,
		hot: true,
		open: true,
	},
};
