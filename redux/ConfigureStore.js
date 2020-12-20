import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { leaders } from './leaders';
import { products } from './products';
import { comments } from './comments';
import {login} from './login'
// import { promotions } from './promotions';
import { favorites } from './favorites';
const config = { key: 'root', storage: AsyncStorage, debug: true };
export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config,{ leaders, products, comments, favorites,login }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return {persistor,store};
};