import { useContext, useLayoutEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expense-context";

function ManageExpenses({route, navigation, }){

    const expenseCtx = useContext(ExpenseContext)

    const editedExpenseId = route.params?.expenseId

    const isEditing = !!editedExpenseId

    const selectedExpense  = expenseCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    })

    function deleteExpense(){
        expenseCtx.deleteExpense(editedExpenseId)
        navigation.goBack()
    }
    function confirmHandler(expenseData){
        if(isEditing){
            expenseCtx.updateExpense(
                editedExpenseId,
                expenseData
            )
        } else {
            expenseCtx.addExpense(
                expenseData
            )
        }
        navigation.goBack()
    }
    
    function cancelHandler() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ExpenseForm 
                submitButtonLabel={isEditing ? 'Update' : 'Add'} 
                onSubmit={confirmHandler}
                onCancel={cancelHandler} 
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon='trash'
                        size={36}
                        color={GlobalStyles.colors.error500}
                        onPress={deleteExpense}
                    />
                </View>
            )}
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 6,
        marginTop: 16
    }
})