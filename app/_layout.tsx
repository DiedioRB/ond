import HeaderButtons from "@/components/HeaderButtons";
import StorageHelper from "@/helpers/storage_helper";
import DefaultStyle from "@/styles/default";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, router, useNavigation, useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'Ond?', headerRight: (props) => (
        <HeaderButtons headerButtonProps={props} />
      )
      }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="armazenamentos" options={{ headerTitle: 'Espaços' }} />
      <Stack.Screen name="armazenamentos/[id]" options={{ headerTitle: 'Espaços', animation: 'slide_from_right' }} />
      <Stack.Screen name="busca/[item]" options={{ headerTitle: 'Resultados da busca', animation: 'slide_from_bottom' }} />
    </Stack>
  );
}
