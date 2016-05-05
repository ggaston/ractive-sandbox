module.exports = {  
    entry: {
        tabs: './app/js/app.js',
        form: './app/js/form.js'       
    },
    output: {
        filename: './dist/js/[name]-bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                // If you're following the tutorial for the first time, 
                // you will be using Babel v6 and thus you need to add this extra configuration
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    }
};
