import { FlatList, Pressable, StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle, useColorScheme } from "react-native"
import DefaultStyle from "@/styles/default";
import Card from "./Card";
import Item, { ItemType } from "@/models/item";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import SaveModal from "./SaveModal";
import API from "@/services/api";
import ConfirmModal from "./ConfirmModal";

export enum ListType {default, inline, card}

type RoomListProps = {
    items: Item[],
    display?: ListType,
    onItemClick?: any,
    onItemChanged?: any,
}
export default function RoomList(props: RoomListProps){
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined)

    async function saveItem(item: Item){
        await API.saveItem(item)
        props.onItemChanged()
    }

    async function deleteItem(item :Item){
        await API.deleteItem(item)
        props.onItemChanged()
    }

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
            <View>
                <SaveModal
                    isVisible={editModalVisible}
                    title="Editar"
                    onCloseButtonPressed={() => {
                        setEditModalVisible(false)
                    }}
                    onConfirmButtonPressed={async (name: string, room: Item, kind: ItemType, original :Item) => {
                        original.name = name
                        original.parent = room
                        original.kind = kind

                        await saveItem(original)

                    }}
                    item={selectedItem}
                />
                <ConfirmModal
                    title="Quer mesmo excluir o item e tudo dentro dele?"
                    isVisible={deleteModalVisible}
                    onCloseButtonPressed={() => {
                        setDeleteModalVisible(false)
                    }}
                    onConfirmButtonPressed={(item :Item) => {
                        deleteItem(item)
                        setDeleteModalVisible(false)
                    }}
                    item={selectedItem}
                />
                <FlatList
                style={styles.listDefault}
                ItemSeparatorComponent={() => <View style={ DefaultStyle.separator }></View>}
                    data={props.items}
                    renderItem={(item) => {
                        let content = (
                            <View style={[styles.itemDefault, DefaultStyle.horizontalFlex, DefaultStyle.primary, {alignItems: 'center', justifyContent: "space-between"}]} key={item.item.id}>
                                <View style={DefaultStyle.horizontalFlex}>
                                    <Ionicons name={ item.item.kind == ItemType.ROOM ? "cube" : "document" } size={32} style={[DefaultStyle.onPrimary, { marginRight: 5 }]} />
                                    <View>
                                        <Text style={ [DefaultStyle.onPrimary, styles.title] }>{ item.item.name }</Text>
                                        {
                                            item.item.parent
                                            ? <Text style={ [DefaultStyle.onPrimaryAccent, styles.subtitle] }>Guardado em "{ item.item.parent?.name }"</Text>
                                            : undefined
                                        }
                                    </View>
                                </View>
                                <View style={ [DefaultStyle.horizontalFlex, {justifyContent: 'flex-end'}] }>
                                <Pressable onPress={() => {
                                    setSelectedItem(item.item)
                                    setDeleteModalVisible(true)
                                }}>
                                    <Ionicons name="trash" size={32} style={DefaultStyle.danger} />
                                </Pressable>
                                <Pressable onPress={() => {
                                    setSelectedItem(item.item)
                                    setEditModalVisible(true)
                                }}>
                                    <Ionicons name="information-circle" size={32} style={DefaultStyle.info} />
                                </Pressable>
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
            </View>
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
        borderColor: '#333'
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