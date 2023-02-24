import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import {getFormattedDate }from "../../util/Date";

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}){

    const [inputValues, setInputValues] = useState({
        // default values will be undefined if we are in add Mode, so we do this.
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : '',
        description: defaultValues ? defaultValues.description : '',
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue
            }
        })
    }

    function submitHandler(){
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        };

        // Check if it is not a number & if the amount is greater than 0
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid){
            Alert.alert('Invalid input', 'Please check your input values');
            return;
        }

        onSubmit(expenseData);
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title} >Your Expense</Text>
            <View style={styles.inputsRow}>
            <Input  
                label="Amount" 
                style={styles.rowInput}
                textInputConfig={{
                    keyBoardType: 'decimal-pad',
                    // This allowa us to point at a function that should be exicuted whenever a user enters a value.
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputValues.amount
            }}/>
            <Input 
                label="Date" 
                style={styles.rowInput}
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputValues.date
            }}/>
            </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputValues.description
            }}/>
            <View style={styles.buttons}>
                <Button onPress={onCancel} mode='flat'>
                    Cancel
                </Button>
                <Button onPress={submitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View> 
    )
}



export default ExpenseForm;

const styles = StyleSheet.create({
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    buttons: {
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})