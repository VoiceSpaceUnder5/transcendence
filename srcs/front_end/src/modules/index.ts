import {combineReducers} from 'redux';
import chatting from './chatting';
import auth from './auth';
import game from './game';

const rootReducer = combineReducers({
  chatting,
  auth,
  game,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
