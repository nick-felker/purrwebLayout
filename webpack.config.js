const autoprefixer = require('autoprefixer');
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "./bundle.js",
        library: "bundle"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            }
        ]
    },
}

