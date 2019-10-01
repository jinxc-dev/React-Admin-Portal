
import {createStore, applyMiddleware} from 'redux';
import rootRducer from './rootReducer';
import settings from './settings/settings.middleware'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

const initialState = {};
const middleware = [thunk, settings];

const store = createStore(
  rootRducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware),
  )
);

export default store;
