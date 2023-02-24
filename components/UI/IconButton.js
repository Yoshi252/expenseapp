import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"

function IconButton({icon, onPress, color, size }){
    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => pressed && styles.pressed}
        >
            <View style={styles.container}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 6,
        
    },
    pressed: {
        opacity: 0.75
    }
})