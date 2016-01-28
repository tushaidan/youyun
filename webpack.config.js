module.exports = {
    entry: {
        main: './scripts/index.js'
    },
    output: {
        filename: "build/[name].pack.js",
        pathinfo: true,
        sourceMapFilename: "build/[name].pack.js.map"
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
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ["react", "es2015", "stage-0"]
                }
            }
        ]
    }
}
