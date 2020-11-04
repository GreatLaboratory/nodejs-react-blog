import {combineReducers} from "redux";
import auth from './auth';
import user from './user';
import write from './write';
import post from './post';
import postList from './postList';

const rootReducer = combineReducers({
    auth,
    user,
    write,
    post,
    postList,
})

export default rootReducer;