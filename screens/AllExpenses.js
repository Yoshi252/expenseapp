import { useContext } from "react";
import ExpenseOutput from "../components/ExpenseOutput/ExpenseOutput";
import { ExpenseContext } from "../store/expense-context";

function AllExpenses(){

    const expenseCtx = useContext(ExpenseContext)

    return (
        <ExpenseOutput 
            expenses={expenseCtx.expenses} 
            expensePeriod="Total"
        />
    )
}

export default AllExpenses;