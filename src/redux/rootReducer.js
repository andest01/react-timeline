import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './modules/counter';
import asdfasdfasdfasdfasdf from './modules/timeline.actions';
export default combineReducers({
  counter,
  router,
  timeline: asdfasdfasdfasdfasdf
});
