import { FlatList, StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle, useColorScheme } from "react-native"
import Item from "@/models/item";
import DefaultStyle from "@/styles/default";


type ItemListProps = {
    items: Item[]
}
export default function ItemList(props: ItemListProps){
    function empty(){
        return (
            <View style={styles.empty}>
                <Text style={[DefaultStyle.emptyText, { fontSize: 20 }]}>
                    Nenhum item encontrado
                </Text>
            </View>
        )
    }

    if(props.items.length < 1){
        return empty()
    }

    return (
        <FlatList
        style={styles.list}
        ItemSeparatorComponent={() => <View style={ DefaultStyle.separator }></View>}
            data={props.items}
            renderItem={(item) => (
                <View style={styles.item} key={item.item.id}>
                    <Text style={ styles.title }>{ item.item.name }</Text>
                    <Text style={ styles.subtitle }>{ item.item.room?.name }</Text>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderLeftWidth: 5,
    },
    title: {
        fontSize: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#555'
    },
    empty: {

    }
})