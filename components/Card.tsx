import { StyleProp, StyleSheet, Text, View, ViewStyle, useColorScheme } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons'
import DefaultStyle from "@/styles/default";
import { useThemeColor } from "@/hooks/useThemeColor";


type CardProps = {
    title: string,
    content?: string,
    icon?: keyof typeof Ionicons.glyphMap,
    color?: string,
    textColor?: string,
    style?: any,
}
export default function Card(props: CardProps){
    const color = useThemeColor({ light: props.textColor, dark: props.textColor }, 'text');

    return (
        <View style={[styles.card, DefaultStyle.verticalFlex, props.style]}>
            <View style={[DefaultStyle.horizontalFlex]}>
                { props.icon ? <Ionicons name={ props.icon } size={32} color={props.style.color} /> : '' }
                <Text style={[props.style, styles.text]}>{ props.title }</Text>
            </View>
            <View style={[DefaultStyle.horizontalFlex, {flex: 3}]}>
                <Text style={[props.style, styles.text]}>{ props.content }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 8,
        borderColor: '#333',
        borderWidth: 2,
        borderRadius: 10,
        maxHeight: '20%',
    },
    text: {
        fontSize: 20,
    }
})