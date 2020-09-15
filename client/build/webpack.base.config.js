const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, "../src"),
    dist: path.join(__dirname, "../dist"),
    assets: "assets/",
};

module.exports = {
    externals: {
        paths: PATHS,
    },
    entry: {
        app: ["babel-polyfill", PATHS.src],
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: "/",
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendors",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /(\.sass$|\.scss$)/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: { path: `./build/postcss.config.js` },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true },
                    },
                    {
                        loader: "sass-resources-loader",
                        options: {
                            sourceMap: true,
                            resources: [
                                `${PATHS.src}/assets/scss/utils/mixins.scss`,
                                `${PATHS.src}/assets/scss/utils/vars.scss`,
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: "./postcss.config.js",
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/${PATHS.assets}img`,
                    to: `${PATHS.assets}img`,
                },
                {
                    from: `${PATHS.src}/${PATHS.assets}video`,
                    to: `${PATHS.assets}video`,
                },
                {
                    from: `${PATHS.src}/${PATHS.assets}fonts`,
                    to: `${PATHS.assets}fonts`,
                },
                { from: `${PATHS.src}/static`, to: "" },
            ],
        }),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: "./index.html",
        }),
    ],
};
