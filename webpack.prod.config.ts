import { Configuration } from "webpack";
import merge from "webpack-merge";
import webpackCommonConfig from "./webpack.common.config";

export default merge<Configuration>(webpackCommonConfig, {
    mode: "production",
}) 
