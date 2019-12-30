/* eslint-disable */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'

import store from './store'
import createRoutes from './routes'

import App from './container/rootContainer'
import './global.css'

const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
  // onEnter(
  //   {
  //     location: { pathname }
  //   },
  //   replace
  // ) {
  //   if (!['/welcome', '/'].includes(pathname)) {
  //     replace('/welcome')
  //   }
  // }
}
render(
  <Provider store={store}>
    <Router history={hashHistory} routes={rootRoute} />
  </Provider>,
  document.getElementById('root')
)
