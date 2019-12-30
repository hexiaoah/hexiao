import { injectAsyncReducer } from '@src/utils/asyncInjector'
import store from '@src/store'
import visualConfigReducer from './reducers'


injectAsyncReducer(store, 'visualConfig', visualConfigReducer)
