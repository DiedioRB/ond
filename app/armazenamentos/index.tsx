import Card from "@/components/Card";
import ItemList from "@/components/ItemList";
import Item from "@/models/item";
import API from "@/services/api";
import DefaultStyle from "@/styles/default";
import { useEffect, useState } from "react";
import { router, useNavigation } from 'expo-router'
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
import { useIsFocused } from "@react-navigation/native";

type ArmazenamentosProps = {
    parent?: Item
}

export default function Armazenamentos(props: ArmazenamentosProps) {
    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(false);
    const [rooms, setRooms] = useState<Item[]>([]);

    const isFocused = useIsFocused()

    async function fetchRooms() {
        setIsLoading(true);
        setRooms(await API.baseRooms());
        setIsLoading(false);
    }

    useEffect(() => {
        fetchRooms();
    }, [isFocused]);

    useEffect(() => {
        navigation.setOptions({headerTitle: 'Espaços'})
    }, []);

    return (
        <View style={[DefaultStyle.container]}>
            <View style={[{ flex: 3, padding: 5, paddingTop: 10 }]}>
                <Text style={{ fontSize: 28 }}>Espaços</Text>
                { isLoading
                    ? <ActivityIndicator size="large" color={DefaultStyle.loading.color} />
                    : (
                    <RoomList items={rooms} display={ListType.card}
                        onItemClick={(room: Item) => {router.push('armazenamentos/'+room.id)}} />
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});
