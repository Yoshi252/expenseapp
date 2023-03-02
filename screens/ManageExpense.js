import { useContext, useLayoutEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expense-context";
import { storeExpense, updatedExpense, deletedExpense } from "../util/http";

function ManageExpenses({ route, navigation }) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [error, setError] = useState();

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

    async function deleteExpense(){
        setIsSubmitting(true);
        try {
            await deletedExpense(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense - please try again later!');
            setIsSubmitting(false);
        }
    }

    async function confirmHandler(expenseData){
        setIsSubmitting(true);
            try {
                if(isEditing){
                expenseCtx.updateExpense(editedExpenseId, expenseData);
                await updatedExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({...expenseData, id: id});
            }
            navigation.goBack()
        } catch (error) {
            setError('Could not save data - please try again later!');
            setIsSubmitting(false);
        }
        
        
    }



    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} />
    }

    if (isSubmitting) {
        return <LoadingOverlay />;
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
        marginTop: 2
    }
})