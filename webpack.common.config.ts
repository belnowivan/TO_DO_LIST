import path from 'path';
import webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

type WebpackCommonConfigInterface = Pick<
    webpack.Configuration,
    'entry' | 'module' | 'output' | 'resolve' | 'optimization' | 'externals'
>;

export const webpackCommonConfig: WebpackCommonConfigInterface = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'typescript',
                                tsx: true,
                            },
                            transform: {
                                react: {
                                    runtime: 'automatic',
                                },
                            },
                        },
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    output: {
        filename: '[name]-[hash:6].bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
};
