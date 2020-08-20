module.exports = {
    pages: {
        refind: {
            entry: 'src/pages/refind/main.js',
            template: 'public/index.html',
            filename: 'refind.html',
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Refind',
            chunks: ['chunk-vendors', 'chunk-common', 'refind']
        },
        anew: {
            entry: 'src/pages/anew/main.js',
            template: 'public/index.html',
            filename: 'anew.html',
            title: 'Anew',
            chunks: ['chunk-vendors', 'chunk-common', 'anew']
        },
        logs: {
            entry: 'src/pages/logs/main.js',
            template: 'public/index.html',
            filename: 'logs.html',
            title: 'Anew Logs',
            chunks: ['chunk-vendors', 'chunk-common', 'logs']
        },
        locket: {
            entry: 'src/pages/locket/main.js',
            template: 'public/index.html',
            filename: 'locket.html',
            title: 'Locket',
            chunks: ['chunk-vendors', 'chunk-common', 'locket']
        },
        ivvor: {
            entry: 'src/pages/ivvor/main.js',
            template: 'public/index.html',
            filename: 'ivvor.html',
            title: 'Ivvor',
            chunks: ['chunk-vendors', 'chunk-common', 'ivvor']
        }
    }
}