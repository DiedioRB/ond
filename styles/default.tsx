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
        width: '90%',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 0,
        shadowOffset: {width: 10, height: 10},
        padding: 10
    },
    fillParent: {
        width: '100%',
        height: '100%',
    },
    fillWidth: {
        width: '100%',
    },
    fillHeight: {
        height: '100%',
    },
    separator: {
        height: 1,
        width: '95%',
        backgroundColor: '#999',
        alignSelf: 'center'
    },
    loading: {
        color: '#999',
    },
    emptyText: {
        color: '#555',
    },
    background: {
        backgroundColor: '#8364a1',
    },
    onBackground: {
        color: '#DDD',
        borderColor: '#DDD',
        textShadowColor: '#000',
        textShadowOffset: {width: 2, height: 0},
        textShadowRadius: 2
    },
    primary: {
        backgroundColor: '#586fa1'
    },
    onPrimary: {
        color: '#EEE',
        borderColor: '#EEE',
    },
    onPrimaryAccent : {
        color: '#BBB',
        borderColor: '#BBB',
    },
    primaryHighlight: {
        backgroundColor: '#384f80'
    },
    white: {
        backgroundColor: '#DDD'
    },
    black: {
        backgroundColor: '#333'
    },
    danger: {
        color: '#B36'
    },
    info: {
        color: '#f4d553'
    },
})

export default DefaultStyle;