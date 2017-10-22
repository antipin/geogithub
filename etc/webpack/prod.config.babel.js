import webpack from 'webpack'
import base from './base.config.babel'

const uglifyJS = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
})

/*
 * take into consideration:
 *  - https://facebook.github.io/react/docs/optimizing-performance.html
 */

export default Object.assign({}, base, {
    plugins: [
        ...base.plugins,
        //uglifyJS, // fixit: js code fails after uglify
    ]
})
