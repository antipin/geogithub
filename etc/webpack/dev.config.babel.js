import base, { BUILD_DIRECTORY } from './base.config.babel'

export default Object.assign({}, base, {
    devtool: 'source-map',
    watch: true,    
    watchOptions: {
        aggregateTimeout: 100
    },
    devServer: {
        contentBase: BUILD_DIRECTORY,
        compress: true,
        port: 8000
    }      
})
