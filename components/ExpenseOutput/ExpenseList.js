import { FlatList, Text } from "react-native"; 
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem({item}){
    return (
        <ExpenseItem 
            id={item.id}
            description={item.description}
            amount={item.amount}
            date={item.date}
        />
    )
}

function ExpenseList({ expenses }){
    return (
        <FlatList 
            data={expenses}
            renderItem={renderExpenseItem} 
            keyExtractor={(item) => item.id}
        />
    )
}

export default ExpenseList;