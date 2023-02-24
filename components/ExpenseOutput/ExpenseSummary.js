import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpenseSummary({expenses, periodName}){

    const expenseSum = expenses.reduce((sum, expense) => {
        return expense.amount + sum
    }, 0)

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>{expenseSum}</Text>
        </View>
    )
}

export default ExpenseSummary;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: GlobalStyles.colors.primary50,
        padding: 12,
        borderRadius: 4
    }, 
    period: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
        fontSize: 14,
    },
    sum: {
        fontSize: 15,
        color: GlobalStyles.colors.primary700
    }
})