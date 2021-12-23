import {combineReducers} from 'redux';
import chatting from './chatting';

const rootReducer = combineReducers({
  chatting,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
