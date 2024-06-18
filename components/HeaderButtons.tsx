import StorageHelper from "@/helpers/storage_helper";
import DefaultStyle from "@/styles/default";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

type CustomHeaderProps = {
    headerButtonProps? : HeaderButtonProps
}

export default function HeaderButtons (props : CustomHeaderProps){
    return (
        <View style={[DefaultStyle.horizontalFlex, { padding: 10, gap: 10, alignItems: 'center' }]}>
          <Pressable onPress={() => {
            StorageHelper.logout()
            router.replace('/login')
          }}>
            <Ionicons name="log-out" size={32} style={DefaultStyle.onBackground} />
          </Pressable>
        </View>
    )
}