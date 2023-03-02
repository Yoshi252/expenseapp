import { createContext, useReducer } from "react";


export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpenses: (expenses) => {},
    updateExpense: (id, {description, amount, date}) => {},
    deleteExpense: (id) => {}
})

function expenseReducer(state, action){
    switch (action.type) {
        case 'ADD':
            // we only need the payload now
            return [action.payload, ...state]
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            )
            const updatableExpense = state[updatableExpenseIndex]
            const updatedItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses = [...state]

            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            state;
    }
}

function ExpenseContextProvider({children}) {
    const [expenseState, dispatch] = useReducer(expenseReducer, []);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData});
    }

    function setExpenses(expenses){
        dispatch({type: 'SET', payload: expenses })
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id,expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    const value = {
        expenses: expenseState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return (
        <ExpenseContext.Provider value={value} >
            {children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContextProvider;