import Card from "@/components/Card";
import ItemList from "@/components/ItemList";
import Item, { ItemType } from "@/models/item";
import API from "@/services/api";
import DefaultStyle from "@/styles/default";
import { useEffect, useState } from "react";
import { Link, router } from 'expo-router'
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

export default function Index() {
    const [isLoading, setIsLoading] = useState(false);
    const [recents, setRecents] = useState<Item[]>([]);
    const [rooms, setRooms] = useState<Item[]>([]);
    const [searchModalVisible, setSearchModalVisible] = useState(false)
    const [newModalVisible, setNewModalVisible] = useState(false)

    async function fetchRecents() {
        setIsLoading(true);
        setRecents((await API.items()).sort((a, b) => b.id! - a.id!));
        setIsLoading(false);
    }
    async function fetchRooms() {
        setIsLoading(true);
        setRooms(await API.baseRooms())
        setIsLoading(false);
    }

    useEffect(() => {
        fetchRecents()
        fetchRooms()
    }, []);

    return (
        <View style={[DefaultStyle.container, {rowGap: 10}]}>
            <InputModal
                isVisible={searchModalVisible}
                onConfirmButtonPressed={(text: any) => {
                    router.push("/armazenamentos/busca/"+text)
                    
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
                    setNewModalVisible(false)
                }}
                onCloseButtonPressed={() => {
                    setNewModalVisible(false)
                }}
            />
            <Pressable onPress={() => {
                router.push("/scan")
            }}>GO</Pressable>
            <View style={[DefaultStyle.horizontalFlex, { flex: 1 }]}>
                <Card
                    title="Buscar"
                    content="Onde foi que eu deixei?"
                    icon="search"
                    style={styles.searchCard}
                    onPress={() => setSearchModalVisible(true) }
                />
                <Card
                    title="Novo"
                    content="Preciso guardar algo"
                    icon="add"
                    style={styles.createCard}
                    onPress={() => setNewModalVisible(true)}
                />
            </View>
            <View>
                <View style={{ flexDirection:'row', alignItems: 'flex-start', gap: 10, padding: 10 }}>
                    <Text style={{ fontSize: 34 }}>Espaços</Text>
                    <StylizedButton href="/armazenamentos" title="Ver todos" />
                </View>
                <RoomList items={rooms} display={ListType.inline} onItemClick={(room: Item) => { router.push('/armazenamentos/'+room.id) }} />
            </View>
            <Splitter/>
            <View style={[{ flex: 3, padding: 5, paddingTop: 10 }]}>
                <Text style={{ fontSize: 28 }}>Adicionados recentemente</Text>
                { isLoading
                    ? <ActivityIndicator size="large" color={DefaultStyle.loading.color} />
                    : <RoomList items={recents} display={ListType.default} onItemClick={
                        (room: Item) => {
                            let id = room.kind == ItemType.ROOM ? room.id : room.parent!.id
                            router.push('/armazenamentos/'+id)
                        }
                    } /> }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
});
