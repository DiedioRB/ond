import HeaderButtons from "@/components/HeaderButtons";
import StorageHelper from "@/helpers/storage_helper";
import DefaultStyle from "@/styles/default";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Stack, router, useNavigation, useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export default function RootLayout() {
  let options : NativeStackNavigationOptions = {
    
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'Ond?',
        headerStyle: {backgroundColor: DefaultStyle.background.backgroundColor}, headerTitleStyle: {color: DefaultStyle.onBackground.color},
        headerLargeStyle: {backgroundColor: DefaultStyle.background.backgroundColor},
        headerLargeTitleStyle: {color: DefaultStyle.onBackground.color},
      }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="armazenamentos" options={{ 
        headerTitle: 'Espaços',
        headerLargeStyle: {backgroundColor: DefaultStyle.background.backgroundColor},
        headerLargeTitleStyle: {color: DefaultStyle.onBackground.color},
      }} />
      <Stack.Screen name="armazenamentos/[id]" options={{
        headerTitle: 'Espaços', animation: 'slide_from_right',
        headerLargeStyle: {backgroundColor: DefaultStyle.background.backgroundColor},
        headerLargeTitleStyle: {color: DefaultStyle.onBackground.color},
      }} />
      <Stack.Screen name="busca/[item]" options={{
        headerTitle: 'Resultados da busca', animation: 'slide_from_bottom',
        headerLargeStyle: {backgroundColor: DefaultStyle.background.backgroundColor},
        headerLargeTitleStyle: {color: DefaultStyle.onBackground.color},
      }} />
    </Stack>
  );
}
