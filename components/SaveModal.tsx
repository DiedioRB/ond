import DefaultStyle from "@/styles/default";
import { useEffect, useState } from "react";
import SelectDropdown from 'react-native-select-dropdown';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import StylizedButton from "./StylizedButton";
import Item, { ItemType } from "@/models/item";
import API from "@/services/api";

type SaveModalProps = {
    title: string,
    isVisible: boolean,
    onCloseButtonPressed: any,
    onConfirmButtonPressed: any,
    item?: Item,
}

export default function SaveModal(props: SaveModalProps){
    const [isLoading, setIsLoading] = useState(false);
    const [inputText, setInputText] = useState("")
    const [rooms, setRooms] = useState<Item[]>([])
    const [selectedRoom, setSelectedRoom] = useState<Item | null>(null)

    async function fetchRooms(){
        setIsLoading(true)
        setRooms(await API.rooms())
        setIsLoading(false)
    }

    function onOpen(){
        fetchRooms()
        
        setSelectedRoom(props.item?.parent ?? null)
        if(props.item){
            setInputText(props.item.name)
        }
    }

    useEffect(() => {
        fetchRooms()
    }, [])

    return (
        <Modal
        transparent={true}
        visible={props.isVisible}
        animationType="fade"
        onRequestClose={() => props.onCloseButtonPressed()}
        onShow={onOpen}
        >
            <View style={[DefaultStyle.flexCenter, DefaultStyle.container, { backgroundColor: '#0003' }]}>
                <View style={[DefaultStyle.modal, {height: '50%'}]}>
                    <View style={[DefaultStyle.fillParent, DefaultStyle.verticalFlex, {gap: 20}]}>
                        <View style={[DefaultStyle.flexCenter, DefaultStyle.fillParent, {flex: 3, alignItems: 'flex-start', gap: 3}]}>
                            <Text style={[{fontSize: 20, fontWeight: 'bold'}]}>Onde?</Text>
                            <SelectDropdown
                                defaultValue={rooms.find((item) => item.id == props.item?.parent?.id) ?? null}
                                search
                                searchPlaceHolder="Procurar"
                                searchInputTxtStyle={{ padding: 5 }}
                                data={[new Item(null, "Nova sala", undefined, ItemType.ROOM, []), ...rooms]}
                                onSelect={(room : Item, index) => {
                                    setSelectedRoom(room ?? null)
                                }}
                                renderButton={(selected : Item, isOpen) => {
                                    return (
                                        <View style={styles.dropdownButton}>
                                            <Text>{selected?.name ?? "Nova sala"}</Text>
                                        </View>
                                    )
                                }}
                                renderItem={(item : Item, index, isSelected) => {
                                    return (
                                        <View style={styles.dropdownItem}>
                                            <Text>{item.name}{ item.parent ? " ("+item.parent.name+")" : undefined }</Text>
                                        </View>
                                    )
                                }}
                            />
                            <Text style={[{fontSize: 20, fontWeight: 'bold'}]}>O quê?</Text>
                            <TextInput onChangeText={(text) => { setInputText(text) }} value={inputText} style={[DefaultStyle.fillWidth, {borderBottomWidth: 2, fontSize: 16, paddingHorizontal: 5, paddingVertical: 10} ]} />
                        </View>
                        <View style={[DefaultStyle.horizontalFlex, {flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 10}]}>
                            <StylizedButton
                                onPress={() => {
                                    props.onCloseButtonPressed()
                                    setInputText("")
                                    setSelectedRoom(null)
                                }}
                                title={"Cancelar"}
                                style={DefaultStyle.danger} />
                            <StylizedButton
                                onPress={() => {
                                    props.onConfirmButtonPressed(inputText, selectedRoom, ItemType.ITEM, props.item)
                                    setInputText("")
                                    setSelectedRoom(null)
                                }}
                                title={"+ Item"} />
                            <StylizedButton
                                onPress={() => {
                                    props.onConfirmButtonPressed(inputText, selectedRoom, ItemType.ROOM, props.item)
                                    setInputText("")
                                    setSelectedRoom(null)
                                }}
                                title={"+ Armazenamento"} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    dropdownButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownItem: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 1
    }

})