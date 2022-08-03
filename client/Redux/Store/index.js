import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../Reducer/rootReducer';
import thunk from 'redux-thunk';

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSIONCOMPOSE || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
