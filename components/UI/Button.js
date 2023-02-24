import { Pressable, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({children, onPress, mode, style}){
    return (
        <View style={style}>
            <Pressable
                onPress={onPress}
            >
                <View style={[styles.button, mode === 'flat' && styles.flat]}> 
                    <Text style={styles.buttonText}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        padding: 12,
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 4,
    },
    buttonText: {
        fontWeight: 'bold',
        color: "white"
    },
    flat: {
        backgroundColor: 'transparent'
    }
})