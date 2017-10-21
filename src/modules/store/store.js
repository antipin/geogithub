import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkFsaMiddleware from 'redux-thunk-fsa'

function makeStore({ reducer, initialState, isDevelopment }) {
    
    const middlewares = [ thunkFsaMiddleware ]

    if (isDevelopment) {

        const loggerMiddleware = createLogger({
            predicate: () => true,
            stateTransformer: (state) => state,
            collapsed: true,
        })
    
        middlewares.push(loggerMiddleware)

    }

    return createStore(reducer, initialState, applyMiddleware(...middlewares))

}

export default makeStore