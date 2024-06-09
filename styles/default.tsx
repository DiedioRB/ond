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
    modal: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderWidth: 5,
        borderColor: '#333',
        borderRadius: 10,
        minHeight: '20%',
        maxHeight: '80%',
        width: '80%',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 0,
        shadowOffset: {width: 10, height: 10}
    },
    separator: {
        height: 1,
        width: '95%',
        backgroundColor: '#999',
        alignSelf: 'center'
    },
    loading: {
        color: '#999'
    },
    sizeTest: {
        backgroundColor: '#F00'
    }
})

export default DefaultStyle;