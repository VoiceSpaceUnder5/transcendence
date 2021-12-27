import {combineReducers} from 'redux';
import chatting from './chatting';
import auth from './auth';

const rootReducer = combineReducers({
  chatting,
  auth,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
