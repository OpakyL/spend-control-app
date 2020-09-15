export const RESET_STATE = "RESET_STATE";
export const resetState = () => {
    return {
        type: RESET_STATE,
    };
};

export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const userLoggedIn = (payload) => {
    return {
        type: USER_LOGGED_IN,
        payload,
    };
};

export const SET_TIMER_COUNT = "SET_TIMER_COUNT";
export const setTimerCount = (time) => {
    return {
        type: SET_TIMER_COUNT,
        payload: time,
    };
};

export const MONEY_CHANGED = "MONEY_CHANGED";
export const moneyChanged = (value) => {
    return {
        type: MONEY_CHANGED,
        payload: value,
    };
};

export const REASON_CHANGED = "REASON_CHANGED";
export const reasonChanged = (value) => {
    return {
        type: REASON_CHANGED,
        payload: value,
    };
};
