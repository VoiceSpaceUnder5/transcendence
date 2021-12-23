import {combineReducers} from 'redux';
import chatting from './chatting';
import login from './login';

const rootReducer = combineReducers({
  chatting,
  login,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
