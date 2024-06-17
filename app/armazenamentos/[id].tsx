import Card from "@/components/Card";
import ItemList from "@/components/ItemList";
import Item, { ItemType } from "@/models/item";
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
import RoomList, { ListType } from "@/components/RoomList";
import Splitter from "@/components/Splitter";
import { useRouteInfo, useRouter } from "expo-router/build/hooks";
import { useIsFocused } from "@react-navigation/native";

type ArmazenamentosProps = {
    parent?: Item
}

export default function ArmazenamentoById(props: ArmazenamentosProps) {
    const navigation = useNavigation()
    const { id } = useLocalSearchParams()
    const [currentRoom, setCurrentRoom] = useState<Item>();

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [rooms, setRooms] = useState<Item[]>([]);

    const isFocused = useIsFocused()

    async function fetchCurrent(){
        setIsLoading(true);
        let room : Item | undefined = await API.room(id)
        console.log(room);
        
        room!.items.push(...(await API.items(room!.id)))
        setCurrentRoom(room)
        setItems(room!.items.filter(item => item.kind == ItemType.ITEM))
        setRooms(room!.items.filter(item => item.kind == ItemType.ROOM))
        setIsLoading(false);
    }

    useEffect(() => {
        fetchCurrent()
    }, [isFocused]);

    useEffect(() => {
        navigation.setOptions({headerTitle: currentRoom?.name})
    })

    return (
        <View style={[DefaultStyle.container]}>
            <View style={[{ flex: 3, padding: 5, paddingTop: 10 }]}>
                <Text style={{ fontSize: 28 }}>{ currentRoom?.name }</Text>
                { isLoading
                    ? <ActivityIndicator size="large" color={DefaultStyle.loading.color} />
                    : (
                        <View style={[DefaultStyle.verticalFlex, { gap: 5 }]}>
                            <View>
                            <Text style={{ fontSize: 20 }}>Armazenamentos aqui:</Text>
                            {
                                rooms.length > 0
                                ?
                                <RoomList items={rooms} display={ListType.inline}
                                    onItemClick={(room: Item) => {router.push('armazenamentos/'+room.id)}} />
                                : <Text style={{ fontSize: 16 }}>Nenhum armazenamento encontrado</Text>
                            }
                                <Splitter/>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 20 }}>Itens aqui:</Text>
                            {
                                items.length > 0
                                ? <ItemList items={items} />
                                : <Text style={{ fontSize: 16 }}>Nada guardado aqui</Text>
                            }
                                </View>
                        </View>
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});
