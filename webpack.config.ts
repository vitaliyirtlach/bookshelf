import {join, resolve} from "path"
import { Configuration, HotModuleReplacementPlugin } from "webpack"
import HTMLWebpackPlugin from "html-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import TerserWebpackPlugin from "terser-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

const isDev = process.env.NODE_ENV === "development"

const getPlugins = (isDev: boolean): Array<any> => {
    const devPlugins = [
        new BundleAnalyzerPlugin(),
        new HotModuleReplacementPlugin()
    ]
    const common = [
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
        }),
    ]
    if (isDev) {
        common.concat(devPlugins)
    }
    return common
}

export default {
    entry: ["@babel/polyfill", join(__dirname, "src", "index.tsx")],
    target: "web",
    mode: "development",
    devtool: isDev ? "source-map" : false,
    resolve: {
        alias: {
            "@": resolve(__dirname, "src/"),
            "@styles": resolve(__dirname, "src", "styles/")
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    devServer: {
        open: isDev,
        port: 3000,
        hot: isDev,
        compress: true,
        contentBase: join(__dirname, "build")
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
                            "@babel/plugin-transform-runtime"
                        ]
                    },
                    
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.tsx?$/i, 
                use: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"]
                    },
                    
                }, "ts-loader"],
                exclude: "/node_modules/"
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ] 
        
    },
    plugins: getPlugins(isDev),
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [new TerserWebpackPlugin()]
    },
    output: {
        filename: "[name].js",
        path: resolve(__dirname, "build"),
        publicPath: "/"
    }
} as Configuration