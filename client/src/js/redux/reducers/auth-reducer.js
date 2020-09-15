import { initialState } from "../store/init-state";
import { USER_LOGGED_IN } from "../actions/actions";

export const authenticationReducer = (state = initialState.auth, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            const { token, userId } = action.payload;
            return {
                ...state,
                userId,
                token,
                isLogged: true,
            };
        default:
            return { ...state };
    }
};
