import { FlatList, Pressable, StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle, useColorScheme } from "react-native"
import DefaultStyle from "@/styles/default";
import Card from "./Card";
import Item, { ItemType } from "@/models/item";
import Ionicons from "@expo/vector-icons/Ionicons";

export enum ListType {default, inline, card}

type RoomListProps = {
    items: Item[],
    display?: ListType,
    onItemClick?: any
}
export default function RoomList(props: RoomListProps){

    function empty(){
        return (
            <View style={styles.empty}>
                <Text style={[DefaultStyle.emptyText, { fontSize: 20 }]}>
                    Nenhum armazenamento encontrado
                </Text>
            </View>
        )
    }
    
    function displayDefault(){
        return (
            <FlatList
            style={styles.listDefault}
            ItemSeparatorComponent={() => <View style={ DefaultStyle.separator }></View>}
                data={props.items}
                renderItem={(item) => {
                    let content = (
                        <View style={[styles.itemDefault, DefaultStyle.horizontalFlex, {alignItems: 'center'}]} key={item.item.id}>
                            <Ionicons name={ item.item.kind == ItemType.ROOM ? "cube" : "document" } size={32} style={{ marginRight: 5 }} />
                            <View>
                                <Text style={ styles.title }>{ item.item.name }</Text>
                                {
                                    item.item.parent
                                    ? <Text style={ styles.subtitle }>Guardado em "{ item.item.parent?.name }"</Text>
                                    : undefined
                                }
                            </View>
                        </View>
                    )
                    return props.onItemClick
                        ? (
                            <Pressable onPress={props.onItemClick ? () => props.onItemClick(item.item) : () => {}} key={item.item.id}>
                                {content}
                            </Pressable>
                        )
                        : content
                }}
            />
        )
    }

    function displayCard(){
        return (
            <View style={styles.listCard}>
                {props.items.map((room) => 
                    <View style={[styles.itemCard]} key={room.id}>
                        <Card title={ room.name } onPress={props.onItemClick ? () => props.onItemClick(room) : () => {}} titleNumberOfLines={2} />
                    </View>
                )}
            </View>
        )
    }

    function displayInline(){
        return (
            <View style={styles.listInline}>
                {props.items.map((room) => 
                    <View style={[styles.itemInline]} key={room.id}>
                        <Card title={ room.name } onPress={props.onItemClick ? () => props.onItemClick(room) : () => {}} titleNumberOfLines={2} />
                    </View>
                )}
            </View>
        )
    }

    if(props.items.length < 1){
        return empty()
    }

    if(props.display == undefined){
        return displayDefault()
    }

    switch(props.display){
        case ListType.inline:
            return displayInline()
        case ListType.card:
            return displayCard()
        case ListType.default:
        default:
            return displayDefault()
    }

}

const styles = StyleSheet.create({
    listDefault: {

    },
    listInline: {
        flex: 1,
        flexDirection:'row',
        overflow: 'scroll'
    },
    listCard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemDefault: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderLeftWidth: 5,
    },
    itemInline:{
        width: '40%',
        height: '100%'
    },
    itemCard: {
        width: '50%',
        minHeight: 150
    },
    title: {
        fontSize: 20,
    },
    subtitle: {
        fontSize: 14,
    },
    empty: {
        
    }
})