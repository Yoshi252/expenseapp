import { useContext } from "react";
import ExpenseOutput from "../components/ExpenseOutput/ExpenseOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDate7DaysAgo } from "../util/Date";

function RecentExpenses(){

    const expenseCtx = useContext(ExpenseContext);

    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date()
        const day7DaysAgo = getDate7DaysAgo(today, 7)

        return expense.date > day7DaysAgo
    })

    return (
        <ExpenseOutput 
            expenses={recentExpenses} 
            expensePeriod="Last 7 days"
        />
    )
}

export default RecentExpenses;