import {join, resolve} from "path"
import { Configuration } from "webpack"
import HTMLWebpackPlugin from "html-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import TerserWebpackPlugin from "terser-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import {getTransformer} from 'ts-transform-graphql-tag'

export default {
    context: resolve(__dirname, "src"),
    entry: ["@babel/polyfill", join(__dirname, "src", "index.tsx")],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
            "@": resolve(__dirname, "src"),
            "@styles": resolve(__dirname, "src", "styles"),
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-runtime",
                            "import-graphql"
                        ]
                    },
                    
                }
            },
            {
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      modules: true,
                      importLoaders: 1,
                    },
                  }, "css-loader"]
            },
            {
                test: /\.tsx?$/i, 
                use: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime", "babel-plugin-transform-async-to-generator", "import-graphql"]
                    },  
                },{
                    loader: "ts-loader",
                    options: {
                        getCustomTransformers: () => ({ before: [getTransformer()] })
                    }
                }],
                exclude: "/node_modules/"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      importLoaders: 1,
                    },
                  }, "sass-loader"]
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
              }
        ]  
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HTMLWebpackPlugin({
            template: join(__dirname, "public", "index.html"),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true
              }
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: resolve(__dirname, "public", "assets"),
                to: resolve(__dirname, "build", "public")
            }]
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [new TerserWebpackPlugin()]
    },
    
    output: {
        filename: "[name].bundle.js",
        path: resolve(__dirname, "build"),
        publicPath: "/"
    }
} as Configuration