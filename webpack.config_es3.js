module.exports = {
    entry: {
        main: './scripts/index.js'
    },
    output: {
        filename: "build/[name]_es3.pack.js",
        pathinfo: true
    },
    resolve: {
        root: '.',
        alias: {
            zclip: 'bower_components/zeroclipboard/dist/ZeroClipboard',
            cookie: 'bower_components/jquery.cookie/jquery.cookie'
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                // http://stackoverflow.com/a/33513000
                query: {
                    presets: ["react", "es2015", "stage-0"],
                    plugins: ["transform-es3-property-literals", "transform-es3-member-expression-literals"]
                }
            }
        ]
    }
}
