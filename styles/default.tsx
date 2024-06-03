import { StyleSheet } from "react-native";

const DefaultStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 1,
    },
    horizontalFlex: {
        flex: 1,
        flexDirection: 'row',
    },
    verticalFlex: {
        flex: 1,
        flexDirection: 'column',
    },
    flexCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    sizeTest: {
        backgroundColor: '#F00'
    }
})

export default DefaultStyle;