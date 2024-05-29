import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DefaultStyle from "@/styles/default";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home(){
    return (
        <ThemedView
        style={DefaultStyle.container}>
            <ThemedText>Teste</ThemedText>
            <Link href='/'><ThemedText>Voltar</ThemedText></Link>
        </ThemedView>
    )
}