import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import createReducer from './reducerLoader'

// 支持 redux 调试工具
// http://extension.remotedev.io/#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState = {}) => {

    const middleware = [
        thunkMiddleware
    ]

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(
            applyMiddleware(...middleware)
        )
    )

    store.asyncReducers = {}

    return store
}

const initialState = {}
const store = configureStore(initialState)

export default store
