import { initialState } from "../store/init-state";
import {
    EARNINGS_FETCHED,
    EARNING_ADDED,
    EARNING_REMOVED,
    EARNING_UPDATED,
    EXPENSES_FETCHED,
    EXPENSE_ADDED,
    EXPENSE_REMOVED,
    EXPENSE_UPDATED,
} from "../actions/actions";

export const dataReducer = (state = initialState.data, action) => {
    switch (action.type) {
        case EARNINGS_FETCHED:
            const earnings = action.payload;
            return { ...state, earnings };
        case EARNING_ADDED:
            const newEarning = action.payload;
            const withNewEarning = [...state.earnings, newEarning];
            return { ...state, earnings: withNewEarning };
        case EARNING_REMOVED:
            const removedEarningId = action.payload;
            const withoutDeletedEarning = state.earnings.filter(
                (el) => el._id != removedEarningId
            );
            return { ...state, earnings: withoutDeletedEarning };
        case EARNING_UPDATED:
            const updatedEarning = action.payload;
            const oldEarningIdx = state.earnings.findIndex(
                (el) => el._id === updatedEarning._id
            );
            const withUpdatedEarning = [
                ...state.earnings.slice(0, oldEarningIdx),
                updatedEarning,
                ...state.earnings.slice(oldEarningIdx + 1),
            ];
            return { ...state, earnings: withUpdatedEarning };

        case EXPENSES_FETCHED:
            const expenses = action.payload;
            return { ...state, expenses };
        case EXPENSE_ADDED:
            const newExpense = action.payload;
            const withNewExpense = [...state.expenses, newExpense];
            return { ...state, expenses: withNewExpense };
        case EXPENSE_REMOVED:
            const removedExpenseId = action.payload;
            const withoutDeletedExpense = state.expenses.filter(
                (el) => el._id != removedExpenseId
            );
            return { ...state, expenses: withoutDeletedExpense };
        case EXPENSE_UPDATED:
            const updatedExpense = action.payload;
            const oldExpenseIdx = state.expenses.findIndex(
                (el) => el._id === updatedExpense._id
            );
            const withUpdatedExpense = [
                ...state.expenses.slice(0, oldExpenseIdx),
                updatedExpense,
                ...state.expenses.slice(oldExpenseIdx + 1),
            ];
            return { ...state, expenses: withUpdatedExpense };

        default:
            return { ...state };
    }
};
