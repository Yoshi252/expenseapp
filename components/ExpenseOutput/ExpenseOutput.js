import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";


function ExpenseOutput({expenses, expensePeriod}){
    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={expenses} periodName={expensePeriod} />
            <ExpenseList expenses={expenses} />
        </View>
    )
}

export default ExpenseOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})