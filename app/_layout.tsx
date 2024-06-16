import { Stack, useNavigation, useRouter } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'Ond?' }} />
      <Stack.Screen name="/armazenamentos" options={{ headerTitle: 'Espaços' }} />
      <Stack.Screen name="/armazenamentos/[id]" options={{ headerTitle: 'Espaços', animation: 'slide_from_right' }} />
      <Stack.Screen name="/busca/[item]" options={{ headerTitle: 'Resultados da busca', animation: 'slide_from_bottom' }} />
    </Stack>
  );
}
