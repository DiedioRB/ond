import Card from "@/components/Card";
import API from "@/services/api";
import DefaultStyle from "@/styles/default";
import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [random, setRandom] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function fetch(){
    setIsLoading(true)
    await setRandom(await API.random())
    setIsLoading(false)
  }

  return (
    <View
      style={[DefaultStyle.container, {height: '50%'}]}
      >
      <View style={DefaultStyle.horizontalFlex}>
        <Card title="Buscar" content="Onde foi que eu deixei?" icon="search" style={ styles.searchCard } />
        <Card title="Novo" content="Preciso guardar algo" icon="add" style={ styles.createCard }/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchCard: {
    backgroundColor: '#12054D',
    color: '#DDD'
  },
  createCard: {
    backgroundColor: '#871D27',
    color: '#DDD'
  }
})