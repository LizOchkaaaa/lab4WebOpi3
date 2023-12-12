import {combineReducers} from "redux";
import {appReducer} from "./app";
import {userReducer} from "./user";

const reducer = combineReducers({
    app: appReducer,
    user: userReducer
});

export default reducer;