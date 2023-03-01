import { useContext, useEffect, useState } from "react";
import ExpenseOutput from "../components/ExpenseOutput/ExpenseOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDate7DaysAgo } from "../util/Date"; 
import { fetchExpenses } from "../util/http";

function RecentExpenses(){

    // const expenseCtx = useContext(ExpenseContext);
    const [fetchedExpenses, setFetchExpenses] = useState([]);

    // use useEffect because this will execute when ever the component rerenders
    useEffect(() => {
        async function getExpenses(){
            const expenses = await fetchExpenses();
            setFetchExpenses(expenses);
        }

        //This is a work around so we can still use async await without turning the effect function into an async function 
        getExpenses();
    }, []);

    const recentExpenses = fetchedExpenses.filter((expense) => {
        const today = new Date()
        const day7DaysAgo = getDate7DaysAgo(today, 7)

        return expense.date > day7DaysAgo
    });

    return (
        <ExpenseOutput 
            expenses={recentExpenses} 
            expensePeriod="Last 7 days"
        />
    )
}

export default RecentExpenses;