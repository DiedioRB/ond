import Card from "@/components/Card";

import Item, { ItemType } from "@/models/item";
import API from "@/services/api";
import DefaultStyle from "@/styles/default";
import { useEffect, useState } from "react";
import { Link, router, useFocusEffect, useNavigation } from 'expo-router'
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import RoomList, { ListType } from "@/components/RoomList";
import InputModal from "@/components/InputModal.";
import StylizedButton from "@/components/StylizedButton";
import Splitter from "@/components/Splitter";
import SaveModal from "@/components/SaveModal";
import StorageHelper from "@/helpers/storage_helper";
import User from "@/models/user";
import { useIsFocused } from "@react-navigation/native";

export default function Index() {
    const [isLoading, setIsLoading] = useState(false)
    const [recents, setRecents] = useState<Item[]>([])
    const [rooms, setRooms] = useState<Item[]>([])
    const [searchModalVisible, setSearchModalVisible] = useState(false)
    const [newModalVisible, setNewModalVisible] = useState(false)

    const isFocused = useIsFocused()

    let user : User | null;

    async function fetchRecents() {
        setIsLoading(true)
        setRecents((await API.items()).sort((a, b) => b.id! - a.id!))
        setIsLoading(false)
    }
    async function fetchRooms() {
        setIsLoading(true)
        setRooms((await API.baseRooms()).slice(0, 5))
        setIsLoading(false)
    }

    async function getLogin() {
        user = await StorageHelper.getUser()
        if(user == null){
            router.replace('/login')
        }
    }

    useEffect(() => {
        getLogin()
    }, [isFocused])

    useEffect(() => {
        fetchRecents()
        fetchRooms()
    }, [isFocused])

    return (
        <View style={[DefaultStyle.container, DefaultStyle.background, {rowGap: 10}]}>
            <InputModal
                isVisible={searchModalVisible}
                onConfirmButtonPressed={(text: any) => {
                    router.push("armazenamentos/busca/"+text)
                    
                    setSearchModalVisible(false)
                }}
                onCloseButtonPressed={() => {
                    setSearchModalVisible(false)
                }}
                title="Onde está..."
                confirmButtonText="Buscar"
                cancelButtonText="Fechar"
            />
            <SaveModal
                isVisible={newModalVisible}
                title="Preciso guardar..."
                onConfirmButtonPressed={async (item: any, room: Item, kind : ItemType) => {
                    let newItem : Item = new Item(null, item, room, kind, [])
                    
                    await API.saveItem(newItem)
                    await fetchRecents()
                    await fetchRooms()
                    setNewModalVisible(false)
                }}
                onCloseButtonPressed={() => {
                    setNewModalVisible(false)
                }}
            />
            <View style={[DefaultStyle.horizontalFlex, { flex: 1 }]}>
                <Card
                    title="Buscar"
                    content="Onde está..."
                    icon="search"
                    style={styles.searchCard}
                    onPress={() => setSearchModalVisible(true) }
                />
                <Card
                    title="Novo"
                    content="Vou guardar..."
                    icon="add"
                    style={styles.createCard}
                    onPress={() => setNewModalVisible(true)}
                />
            </View>
            <View>
                <View style={{ flexDirection:'row', alignItems: 'flex-start', gap: 10, padding: 10 }}>
                    <Text style={[DefaultStyle.onBackground, { fontSize: 34 }]}>Salas</Text>
                    <StylizedButton href="armazenamentos" title="Ver todas" />
                </View>
                <RoomList items={rooms} display={ListType.inline} onItemClick={(room: Item) => { router.push('armazenamentos/'+room.id) }} />
            </View>
            <Splitter/>
            <View style={[{ flex: 3, padding: 5, paddingTop: 10, overflow:'scroll' }]}>
                <Text style={[DefaultStyle.onBackground, { fontSize: 28 }]}>Adicionados recentemente</Text>
                { isLoading
                    ? <ActivityIndicator size="large" color={DefaultStyle.loading.color} />
                    : <RoomList items={recents} display={ListType.default} onItemClick={
                            (room: Item) => {
                                let id = room.kind == ItemType.ROOM ? room.id : room.parent!.id
                                router.push('armazenamentos/'+id)
                            }
                        }
                        onItemChanged={async () => {
                            await fetchRooms()
                            await fetchRecents()
                        }}
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchCard: {
        // backgroundColor: "#12054D",
        // color: "#DDD",
    },
    createCard: {
        // backgroundColor: "#871D27",
        // color: "#DDD",
    },
    roomsCard: {
        // backgroundColor: "#871D27",
        // color: "#DDD",
    },
});
