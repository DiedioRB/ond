import { FlatList, StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle, useColorScheme } from "react-native"
import Room from "@/models/room";
import DefaultStyle from "@/styles/default";
import Card from "./Card";

export enum ListType {inline, default}

type RoomListProps = {
    items: Room[],
    display?: ListType
}
export default function RoomList(props: RoomListProps){
    
    function displayDefault(){
        return (
            <FlatList
            style={styles.listDefault}
            ItemSeparatorComponent={() => <View style={ DefaultStyle.separator }></View>}
                data={props.items}
                renderItem={(item) => (
                    <View style={styles.itemDefault}>
                        <Text style={ styles.title }>{ item.item.name }</Text>
                    </View>
                )}
            />
        )
    }

    function displayInline(){
        return (
            <View style={styles.listInline}>
                {props.items.map((room) => 
                    <View style={[styles.itemInline]}>
                        <Card title={ room.name } />
                    </View>
                )}
            </View>
        )
    }

    if(props.display == undefined){
        return displayDefault()
    }

    switch(props.display){
        case ListType.default:
            return displayDefault()
        case ListType.inline:
        default:
            return displayInline()
    }

    return 
}

const styles = StyleSheet.create({
    listDefault: {

    },
    listInline: {
        flex: 1,
        flexDirection:'row',
        overflow: 'scroll'
    },
    itemDefault: {
        padding: 10
    },
    itemInline:{
        width: innerWidth*.4,
        height: innerWidth*.4
    },
    title: {
        fontSize: 20,
    },
})