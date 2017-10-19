import base from './base.config.babel'

export default Object.assign({}, base, {
    devtool: 'source-map',
    watchOptions: {
        aggregateTimeout: 100
    }
})
