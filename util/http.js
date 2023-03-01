import axios from "axios";

const BACKEND_URL = 'https://react-native-course-ebf53-default-rtdb.firebaseio.com';

// Get this URL from axios / Add the expense.json to the end
export function storeExpense(expenseData){
    axios.post( BACKEND_URL + '/expenses.json', expenseData);
}

export async function fetchExpenses() { 

    const response = await axios.get(BACKEND_URL + '/expenses.json');

    const expenses = [];

    // Just to see why we are transforming this
    console.log(response.data);

    for (const key in response.data) {
        // We are dynamically fetching data 
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date (response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expenseObj);
    }

    return expenses;
}
