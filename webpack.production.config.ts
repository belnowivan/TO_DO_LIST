/* eslint-disable import/no-default-export */
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { SwcMinifyWebpackPlugin } from 'swc-minify-webpack-plugin';
import { webpackCommonConfig } from './webpack.common.config';

const config: webpack.Configuration = {
    ...webpackCommonConfig,
    mode: 'production',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'public', 'style.css'), to: path.resolve(__dirname, 'build') },
                { from: path.resolve(__dirname, 'public', 'favicon.ico'), to: path.resolve(__dirname, 'build') },
            ],
        }),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new SwcMinifyWebpackPlugin()],
    },
    stats: { warnings: false },
};

export default config;
