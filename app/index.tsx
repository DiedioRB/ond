import Card from "@/components/Card";
import ItemList from "@/components/ItemList";
import Item from "@/models/item";
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
import Room from "@/models/room";
import InputModal from "@/components/InputModal.";
import StylizedButton from "@/components/StylizedButton";
import Splitter from "@/components/Splitter";

export default function Index() {
    const [isLoading, setIsLoading] = useState(false);
    const [recents, setRecents] = useState<Item[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [searchModalVisible, setSearchModalVisible] = useState(false)

    async function fetchRecents() {
        setIsLoading(true);
        setRecents(await API.items());
        setIsLoading(false);
    }
    async function fetchRooms() {
        setIsLoading(true);
        setRooms((await API.rooms()).filter((room) => !room.hasParent))
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
                    //TODO: send request to API and search the item
                    
                    setSearchModalVisible(false)
                }}
                onCloseButtonPressed={() => {
                    setSearchModalVisible(false)
                }}
                title="Onde está..."
                confirmButtonText="Buscar"
                cancelButtonText="Fechar"
            />
            <View style={[DefaultStyle.horizontalFlex, { flex: 1 }]}>
                <Card
                    title="Buscar"
                    content="Onde foi que eu deixei?"
                    icon="search"
                    style={styles.searchCard}
                    onPress={async () => setSearchModalVisible(true) }
                />
                <Card
                    title="Novo"
                    content="Preciso guardar algo"
                    icon="add"
                    style={styles.createCard}
                />
            </View>
            <View>
                <View style={{ flexDirection:'row', alignItems: 'flex-start', gap: 10, padding: 10 }}>
                    <Text style={{ fontSize: 34 }}>Espaços</Text>
                    <StylizedButton href="/armazenamentos" title="Ver todos" />
                </View>
                <RoomList items={rooms} display={ListType.inline} onItemClick={(room: Room) => { router.push('/armazenamentos/'+room.id) }} />
            </View>
            <Splitter/>
            <View style={[{ flex: 3, padding: 5, paddingTop: 10 }]}>
                <Text style={{ fontSize: 28 }}>Atualizados recentemente</Text>
                { isLoading ? <ActivityIndicator size="large" color={DefaultStyle.loading.color} /> : <ItemList items={recents} /> }
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
