import { Link } from "expo-router";
import { Button, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity } from "react-native";

type StylizedButtonProps = {
    title: string,
    onPress?: any,
    href?: string,
    style?: any,
}

export default function StylizedButton(props: StylizedButtonProps){
    if(props.href){
        return (
            <TouchableHighlight
            underlayColor={'#0003'}
            onPress={() => {}}>
                <Link href={props.href ?? "" } style={styles.button}>{props.title}</Link>
            </TouchableHighlight>
        )
    }
    return (
        <TouchableHighlight
        underlayColor={'#0003'}
        onPress={() => props.onPress()}>
            <Text style={styles.button}>{props.title}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderColor: '#000',
        borderWidth: 5,
        shadowColor: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        shadowOpacity: 1,
        shadowRadius: 0,
        shadowOffset: {width: 5, height: 2}
    }
})