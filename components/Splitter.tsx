import DefaultStyle from "@/styles/default";
import { Link } from "expo-router";
import { Button, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

type SplitterProps = {
    style?: any,
}

export default function Splitter(props: SplitterProps){
    return (
        <View style={[styles.splitter, props.style]}></View>
    )
}

const styles = StyleSheet.create({
    splitter: {
        height: 5,
        width: '95%',
        backgroundColor: DefaultStyle.onBackground.color,
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 5
    }
})