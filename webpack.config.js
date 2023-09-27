const CopyPlugin = require("copy-webpack-plugin");

/**
 * @type import("webpack").Configuration
 */
module.exports = {
    mode: "production",
    entry: {
        content: `${__dirname}/src/content.ts`,
        background: `${__dirname}/src/background.ts`,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./public", to: "./" }
            ]
        }),
    ]
}
