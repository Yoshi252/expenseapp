import { useNavigation } from "@react-navigation/native";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import {getFormattedDate} from "../../util/Date";

function ExpenseItem({description, amount, date, id}){

    const navigation = useNavigation()

    function handleExpensePress(){
        navigation.navigate("ManageExpenses", {
            expenseId: id,
        })
    }

    return (
        <Pressable
            onPress={handleExpensePress}
        >
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.description, styles.textBase ]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>  
                    <Text style={styles.amount}>${amount}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: GlobalStyles.colors.primary500,
        marginVertical: 12,
        marginHorizontal: 4,
        borderRadius: 6
    },
    description: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    amountContainer: {
        backgroundColor: GlobalStyles.colors.primary50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        paddingHorizontal: 4
    }, 
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold'
    }
})