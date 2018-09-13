//needed configuration for webpack
module.exports = {
    entry:'./view/src/index.js',
    output:{
        path: __dirname + '/view/public',
        filename: 'bundle.js'
    },
    module:{
        rules:
        [{
            use: "babel-loader",
            test:/\.js$/,
            exclude:/node_modules/
        }]
    }
};