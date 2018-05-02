// Redux
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

// todo: make this an environment variable.
const isProduction = false;

export const configureStore = () => {
  const customMiddleWare = store => next => action => {
    console.log("Middleware triggered:", action);
    next(action);
  }
  const logger = createLogger({ collapsed: true });
  const middlewares = [ thunk ];
  const devMiddlware = [ logger, customMiddleWare ];
  if (!isProduction) {
    middlewares.push(...devMiddlware);
  }

  createStore(
    reducers,
    applyMiddleware(middlewares),
  );
}

export const store = configureStore();