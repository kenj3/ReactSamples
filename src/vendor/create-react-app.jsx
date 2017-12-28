/**
 * 基于redux的app
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import promiseMiddleware from './redux-promise';
import { operationMiddleware } from './redux-operation';

export default class {
  constructor({ debug = false, history, router, reducer, onError, onRouterChange }) {

    history = history || hashHistory;

    this.debug = debug;

    this.hooks = {
      onError,
      onRouterChange
    };

    this.router = router;

    this.reducer = reducer;

    this.store = this.configureStore({}, history);

    this.history = syncHistoryWithStore(history, this.store);

    if (typeof this.hooks.onRouterChange === 'function') {
      this.history.listen((params) => {
        if (params && params.action == 'POP') {
          this.hooks.onRouterChange(params);
        }
      });
    }
  }

  configureStore(initialState, history) {
    let middleware = [
      thunkMiddleware,
      // 异步操作中间件
      promiseMiddleware({
        onFailure: this.hooks.onError
      }),
      // 操作日志中间件
      operationMiddleware(),
      // 路由中间件
      routerMiddleware(history)
    ];

    const canDevTools = !!(window.__REDUX_DEVTOOLS_EXTENSION__);
    const createStoreWithMiddleware = compose(
      applyMiddleware(...middleware),
      this.debug && canDevTools
        ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f);

    return createStoreWithMiddleware(createStore)(this.reducer, initialState);
  }

  start(container) {
    ReactDOM.render(
      <Provider store={this.store}>
        {this.router(this.history)}
      </Provider>,
      document.getElementById(container)
    );
  }
}
