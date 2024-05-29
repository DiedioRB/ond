import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import API from "@/services/api";
import DefaultStyle from "@/styles/default";
import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

export default function Index() {
  const [random, setRandom] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function fetch(){
    setIsLoading(true)
    await setRandom(await API.random())
    setIsLoading(false)
  }

  return (
    <ThemedView
      style={DefaultStyle.container}>
      <ThemedText>Aleatório: { isLoading ? <ActivityIndicator/> : random } </ThemedText>
      <Button title="Novo" onPress={async () => fetch()}/>
      <Link href='/home'><ThemedText>Home</ThemedText></Link>
    </ThemedView>
  );
}
