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

export const EARNINGS_FETCHED = "EARNINGS_FETCHED";
export const earningsFetched = (payload) => {
    return {
        type: EARNINGS_FETCHED,
        payload,
    };
};

export const EARNING_ADDED = "EARNING_ADDED";
export const earningAdded = (payload) => {
    return {
        type: EARNING_ADDED,
        payload,
    };
};

export const EARNING_REMOVED = "EARNING_REMOVED";
export const earningRemoved = (payload) => {
    return {
        type: EARNING_REMOVED,
        payload,
    };
};

export const EARNING_UPDATED = "EARNING_UPDATED";
export const earningUpdated = (payload) => {
    return {
        type: EARNING_UPDATED,
        payload,
    };
};

export const EXPENSES_FETCHED = "EXPENSES_FETCHED";
export const expensesFetched = (payload) => {
    return {
        type: EXPENSES_FETCHED,
        payload,
    };
};

export const EXPENSE_ADDED = "EXPENSE_ADDED";
export const expenseAdded = (payload) => {
    return {
        type: EXPENSE_ADDED,
        payload,
    };
};

export const EXPENSE_REMOVED = "EXPENSE_REMOVED";
export const expenseRemoved = (payload) => {
    return {
        type: EXPENSE_REMOVED,
        payload,
    };
};

export const EXPENSE_UPDATED = "EXPENSE_UPDATED";
export const expenseUpdated = (payload) => {
    return {
        type: EXPENSE_UPDATED,
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
