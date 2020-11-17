import {join, resolve} from "path"
import { Configuration } from "webpack"
import HTMLWebpackPlugin from "html-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import TerserWebpackPlugin from "terser-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"


export default {
    entry: join(__dirname, "src", "index.tsx"),
    target: "web",
    devtool: "inline-source-map",
    resolve: {
        alias: {
            "@": resolve(__dirname, "src/"),
            "@styles": resolve(__dirname, "src", "styles/")
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    devServer: {
        open: true,
        port: 3000,
        hot: true,
        compress: true,
        contentBase: join(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.tsx?$/i,
                loader: 'ts-loader',
                exclude: "/node_modules/"
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ] 
        
    },
    plugins: [
        new CleanWebpackPlugin(),
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
                to: resolve(__dirname, "build")
            }]
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin()
        ]
    },
    output: {
        filename: "[name].[contenthash].js",
        path: resolve(__dirname, "build")
    }
} as Configuration