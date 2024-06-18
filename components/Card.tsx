import { StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle, useColorScheme } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons'
import DefaultStyle from "@/styles/default";
import { useThemeColor } from "@/hooks/useThemeColor";


type CardProps = {
    title: string,
    content?: string,
    icon?: keyof typeof Ionicons.glyphMap,
    style?: any,
    onPress?: any,
    titleNumberOfLines?: number,
    contentNumberOfLines?: number,
}
export default function Card(props: CardProps){
    return (
        <TouchableHighlight underlayColor={DefaultStyle.primaryHighlight.backgroundColor} onPress={props.onPress ?? (() => {})} style={[styles.card, DefaultStyle.verticalFlex, DefaultStyle.primary, props.style]}>
            <View style={[DefaultStyle.verticalFlex]}>
                <View style={[DefaultStyle.horizontalFlex, {alignItems: 'center'}]}>
                    { props.icon ? <Ionicons name={ props.icon } size={32} color={ props.style.color } style={[DefaultStyle.onPrimary, { marginRight: 5 }]} /> : undefined }
                    <Text style={[DefaultStyle.onPrimary, styles.text, styles.title]} ellipsizeMode="tail" numberOfLines={props.titleNumberOfLines ?? 1}>{ props.title }</Text>
                </View>
                {props.content
                    ? (
                        <View style={[DefaultStyle.verticalFlex, {flex: 3, justifyContent: 'center'}]}>
                            <Text style={[DefaultStyle.onPrimary, styles.text]} ellipsizeMode="tail" numberOfLines={props.contentNumberOfLines ?? 1}>{ props.content }</Text>
                        </View>
                    )
                    : undefined
                }
                
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 8,
        borderColor: '#000',
        borderWidth: 5,
        borderRadius: 10,
        margin: 8,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 0,
        shadowOffset: {width: 10, height: 10}
    },
    text: {
        fontSize: 24,
    },
    title: {
        fontWeight: 'bold'
    }
})