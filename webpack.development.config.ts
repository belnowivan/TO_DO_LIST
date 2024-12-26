/* eslint-disable import/no-default-export */
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { webpackCommonConfig } from './webpack.common.config';
import 'webpack-dev-server';

const config: webpack.Configuration = {
    ...webpackCommonConfig,
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
        new ForkTsCheckerWebpackPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: './build',
        port: 8009,
        host: 'localhost',
        open: false,
        historyApiFallback: true,
        server: 'https',
        client: {
            overlay: false,
        },
        proxy: [
            {
                context: ['/proxy-api'],
                target: 'any-server.com',
                pathRewrite: { '^/proxy-api': '' },
                secure: false,
                changeOrigin: true,
            },
        ],
    },
    watch: true,
};

export default config;
