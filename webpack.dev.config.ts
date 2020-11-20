import {join, resolve} from "path"
import { Configuration, HotModuleReplacementPlugin } from "webpack"
import HTMLWebpackPlugin from "html-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import TerserWebpackPlugin from "terser-webpack-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const isDev = process.env.NODE_ENV === "development"

const getPlugins = (isDev: boolean): Array<any> => {
    const devPlugins = [
        new HotModuleReplacementPlugin()
    ]
    let common = [
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
    ]
    if (isDev) {
        common = common.concat(devPlugins)
    }
    return common
}

export default {
    entry: ["@babel/polyfill", join(__dirname, "src", "index.tsx")],
    target: "web",
    mode: "development",
    devtool: isDev ? "source-map" : false,
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
            "@": resolve(__dirname, "src"),
            "@styles": resolve(__dirname, "src", "styles"),
        }
    },
    devServer: {
        open: isDev,
        port: 3000,
        hot: isDev,
        compress: true,
        publicPath: "/",
        contentBase: join(__dirname, "build"),
        historyApiFallback: true,
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
                        plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime", "babel-plugin-transform-async-to-generator"]
                    },
                    
                }, "ts-loader"],
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
        path: resolve(join(__dirname, "build")),
        
    }
} as Configuration