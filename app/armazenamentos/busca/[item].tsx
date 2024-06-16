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

type ArmazenamentosProps = {
    
}

export default function busca(props: ArmazenamentosProps) {
    const navigation = useNavigation()
    const { item } = useLocalSearchParams()
    console.log(item);
    
    const [currentRoom, setCurrentRoom] = useState<Item>();

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [rooms, setRooms] = useState<Item[]>([]);

    async function fetchResults(){
        setIsLoading(true);
        let results : Item[] = await API.searchItem(item)
        setItems(results)
        setIsLoading(false);
    }

    useEffect(() => {
        fetchResults()
    }, []);

    useEffect(() => {
        navigation.setOptions({headerTitle: 'Busca por "'+item+'"'})
    })

    return (
        <View style={[DefaultStyle.container]}>
            <View style={[{ flex: 3, padding: 5, paddingTop: 10 }]}>
                <Text style={{ fontSize: 28 }}>Resultados da busca por: "{ item }"</Text>
                { isLoading
                    ? <ActivityIndicator size="large" color={DefaultStyle.loading.color} />
                    : (
                        <View style={[DefaultStyle.verticalFlex, { gap: 5 }]}>
                            <View>
                            {
                                items.length > 0
                                ?
                                <RoomList items={items} display={ListType.default}
                                    onItemClick={(room: Item) => {router.push('/armazenamentos/'+room.parent?.id)}} />
                                : <Text style={{ fontSize: 16 }}>Nenhum resultado encontrado</Text>
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
