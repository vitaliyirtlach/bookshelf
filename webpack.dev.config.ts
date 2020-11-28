import { join } from "path"
import { Configuration, HotModuleReplacementPlugin } from "webpack"
import WebpackCommonConfig from "./webpack.common.config"
import { merge } from "webpack-merge"

export default merge<Configuration>(WebpackCommonConfig, {
    mode: "development",
    plugins: [new HotModuleReplacementPlugin()],
    devtool: "source-map",
    devServer: {
        open: true,
        port: 3000,
        hot: true,
        compress: true,
        contentBase: join(__dirname, "build"),
        historyApiFallback: true,
    },
})