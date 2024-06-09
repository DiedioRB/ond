import Card from "@/components/Card";
import ItemList from "@/components/ItemList";
import Item from "@/models/item";
import API from "@/services/api";
import DefaultStyle from "@/styles/default";
import { useEffect, useState } from "react";
import { router } from 'expo-router'
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

export default function Index() {
    const [isLoading, setIsLoading] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);

    async function fetchRooms() {
        setIsLoading(true);
        setRooms(await API.rooms());
        setIsLoading(false);
    }

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <View style={[DefaultStyle.container]}>
            <View style={[{ flex: 3, padding: 5, paddingTop: 10 }]}>
                <Text style={{ fontSize: 28 }}>Armazenamentos</Text>
                { isLoading ? <ActivityIndicator size="large" color={DefaultStyle.loading.color} /> : <RoomList items={rooms} display={ListType.default} /> }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});
