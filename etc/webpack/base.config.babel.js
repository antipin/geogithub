import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import postcssAutoprefixer from 'autoprefixer'
import postcssAtImport from 'postcss-import'

const ROOT_DIRECTORY = path.resolve(__dirname, '../../')
const SOURCE_DIRECTORY = path.resolve(ROOT_DIRECTORY, 'src')
const BUILD_DIRECTORY = path.resolve(ROOT_DIRECTORY, 'dist')
const noEmitOnErrorsPlugin = new webpack.NoEmitOnErrorsPlugin()
const { NODE_ENV } = process.env
const envPlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
    }
})
const extractCSSPlugin = new ExtractTextPlugin({
    filename: '[name].css',
    disable: false,
    allChunks: true,
})
const copyWebpackPlugin = new CopyWebpackPlugin([
    {
        from: `${SOURCE_DIRECTORY}/components/common/favicon/**/*`,
        to: BUILD_DIRECTORY,
        flatten: true,
    },
])
const RULES = {
    js: {
        test: /\.js$/,
        include: [ new RegExp(SOURCE_DIRECTORY) ],
        use: [
            {
                loader: 'babel-loader',
            }
        ],
    },
    images: {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            }
        ],
    },
    svg: {
        test: /\.svg$/i,
        use: [
            {
                loader: 'file-loader',
            },
            {
                loader: 'svgo-loader',
            }
        ]
    },
    styles: {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        camelCase: 'dashes',
                        importLoaders: 1,
                        localIdentName: '[name]__[local]--[hash:base64:5]',
                        // fixes issue with class names conflict
                        // https://github.com/webpack-contrib/css-loader/issues/464
                        context: BUILD_DIRECTORY,
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            postcssAtImport({
                                path: './src/themes/default',
                            }),
                            postcssAutoprefixer({
                                browsers: [ 'last 2 versions' ]
                            }),
                        ]
                    }
                }
            ],
        })
    },
}
const PLUGINS = {
    envPlugin,
    noEmitOnErrorsPlugin,
    extractCSSPlugin,
    copyWebpackPlugin,
    loaderOptionsPlugin: new webpack.LoaderOptionsPlugin(),
}

export default {
    context: SOURCE_DIRECTORY,
    entry: {
        main: [ './geogithub.js' ],
    },
    output: {
        publicPath: '/',
        path: BUILD_DIRECTORY,
        filename: '[name].js',
    },
    module: {
        rules: [
            RULES.js,
            RULES.images,
            RULES.svg,
            RULES.styles,
        ]
    },
    plugins: [
        PLUGINS.envPlugin,
        PLUGINS.noEmitOnErrorsPlugin,
        PLUGINS.extractCSSPlugin,
        PLUGINS.copyWebpackPlugin,
        PLUGINS.loaderOptionsPlugin,
    ],
    stats: {
        assets: false,
        children: false,
        modules: false,
    },
}
