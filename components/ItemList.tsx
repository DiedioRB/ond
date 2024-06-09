import { FlatList, StyleProp, StyleSheet, Text, TouchableHighlight, View, ViewStyle, useColorScheme } from "react-native"
import Item from "@/models/item";
import DefaultStyle from "@/styles/default";


type ItemListProps = {
    items: Item[]
}
export default function ItemList(props: ItemListProps){
    return (
        <FlatList
        style={styles.list}
        ItemSeparatorComponent={() => <View style={ DefaultStyle.separator }></View>}
            data={props.items}
            renderItem={(item) => (
                <View style={styles.item}>
                    <Text style={ styles.title }>{ item.item.name }</Text>
                    <Text style={styles.subtitle}>{ item.item.room?.name }</Text>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        
    },
    item: {
        padding: 10,
    },
    title: {
        fontSize: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#555'
    },
})