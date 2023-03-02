import { useContext, useEffect, useState } from "react";
import ExpenseOutput from "../components/ExpenseOutput/ExpenseOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpenseContext } from "../store/expense-context";
import { getDate7DaysAgo } from "../util/Date"; 
import { fetchExpenses } from "../util/http";

function RecentExpenses(){
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const expenseCtx = useContext(ExpenseContext);
    
    // use useEffect because this will execute when ever the component rerenders
    useEffect(() => {
        async function getExpenses(){
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expenseCtx.setExpenses(expenses);
            } catch (error) {
                setError('could not fetch expenses!')
            }
            setIsFetching(false);
            
        }

        getExpenses();
    }, []);

    if (error && !isFetching) {
        return <ErrorOverlay message={error} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date()
        const date7DaysAgo = getDate7DaysAgo(today, 7)

        return expense.date >= date7DaysAgo && expense.date <= today;
    });

    return (
        <ExpenseOutput 
            expenses={recentExpenses} 
            expensePeriod="Last 7 days"
        />
    )
}

export default RecentExpenses;