import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkFsaMiddleware from 'redux-thunk-fsa'

function makeStore({ reducer, env }) {
    
    const { NODE_ENV } = env
    const loggerMiddleware = createLogger({
        predicate: () => true,
        stateTransformer: (state) => state,
        collapsed: true,
    })
    const middlewares = [ thunkFsaMiddleware ]

    if (NODE_ENV === 'development') {

        middlewares.push(loggerMiddleware)

    }

    return createStore(reducer, {}, applyMiddleware(...middlewares))

}

export default makeStore