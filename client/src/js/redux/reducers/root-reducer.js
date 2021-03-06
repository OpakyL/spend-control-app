import { combineReducers } from "redux";
import { RESET_STATE } from "../actions/actions";
import { initialState } from "../store/init-state";
import { authenticationReducer } from "./auth-reducer";
import { dataReducer } from "./data-reducer";

const reducerCombined = combineReducers({
    auth: authenticationReducer,
    data: dataReducer,
});

export const reducer = (state, action) => {
    if (action.type === RESET_STATE) {
        return initialState;
    }
    return reducerCombined(state, action);
};
