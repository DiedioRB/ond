import Card from "@/components/Card";
import ItemList from "@/components/ItemList";
import Item from "@/models/item";
import API from "@/services/api";
import DefaultStyle from "@/styles/default";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
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
import Room from "@/models/room";
import RoomList, { ListType } from "@/components/RoomList";
import Splitter from "@/components/Splitter";
import { useRouteInfo, useRouter } from "expo-router/build/hooks";

type ArmazenamentosProps = {
    parent?: Room
}

export default function ArmazenamentoById(props: ArmazenamentosProps) {
    const navigation = useNavigation()
    const { id } = useLocalSearchParams()
    const [currentRoom, setCurrentRoom] = useState<Room>();

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);

    async function fetchCurrent(){
        setIsLoading(true);
        setCurrentRoom((await API.room(id)).find((room) => room.id == id))
        setIsLoading(false);
    }

    async function fetchItems() {
        setIsLoading(true);
        setItems((await API.items()).filter((item) => item.room?.id == id));
        setIsLoading(false);
    }
    async function fetchRooms() {
        setIsLoading(true);
        setRooms((await API.rooms()).filter((room) => room.parentId == id));
        setIsLoading(false);
    }

    useEffect(() => {
        fetchCurrent()
    }, []);
    useEffect(() => {
        fetchRooms()
    }, []);
    useEffect(() => {
        fetchItems()
    }, []);

    navigation.setOptions({headerTitle: currentRoom?.name})

    return (
        <View style={[DefaultStyle.container]}>
            <View style={[{ flex: 3, padding: 5, paddingTop: 10 }]}>
                <Text style={{ fontSize: 28 }}>{ currentRoom?.name }</Text>
                { isLoading
                    ? <ActivityIndicator size="large" color={DefaultStyle.loading.color} />
                    : (
                        <View style={[DefaultStyle.verticalFlex, { gap: 5 }]}>
                            <Text style={{ fontSize: 20 }}>Armazenamentos aqui:</Text>
                            <RoomList items={rooms} display={ListType.inline}
                                onItemClick={(room: Room) => {router.push('/armazenamentos/'+room.id)}} />
                                <Splitter/>
                            <Text style={{ fontSize: 20 }}>Itens aqui:</Text>
                            <ItemList items={items} />
                        </View>
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});
