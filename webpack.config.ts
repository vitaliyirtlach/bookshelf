import * as path from "path"
import * as webpack from "webpack"
import HTMLWebpackPlugin from "html-webpack-plugin"
import {CleanWebpackPlugin} from "clean-webpack-plugin"

const config: webpack.Configuration = {
    entry: path.join(__dirname, "src", "index.tsx"),
    target: "web",
    devtool: "inline-source-map",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src/")
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    devServer: {
        open: true,
        port: 3000,
        compress: true,
        contentBase: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                loader: 'ts-loader',
                exclude: "/node_modules/"
            }
        ] 
        
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true
              }
        })
    ],
    output: {
        filename: "[filename].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    }
}

export default config