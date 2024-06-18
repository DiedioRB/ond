import Card from "@/components/Card";
import Item, { ItemType } from "@/models/item";
import API from "@/services/api";
import DefaultStyle from "@/styles/default";
import { useEffect, useState } from "react";
import { Link, router, useNavigation } from 'expo-router'
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import RoomList, { ListType } from "@/components/RoomList";
import InputModal from "@/components/InputModal.";
import StylizedButton from "@/components/StylizedButton";
import Splitter from "@/components/Splitter";
import SaveModal from "@/components/SaveModal";
import User from "@/models/user";
import StorageHelper, { StorageKeys } from "@/helpers/storage_helper";
import { useIsFocused } from "@react-navigation/native";
import MessageModal from "@/components/MessageModal";

export default function Index() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [nameText, setNameText] = useState("")
    const [emailText, setEmailText] = useState("")
    const [passwordText, setPasswordText] = useState("")
    const [errorModalVisible, setErrormodalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState("")

    const isFocused = useIsFocused()

    async function register(){
        setIsLoading(true)
        let registered :User | undefined = await API.register(nameText, emailText, passwordText)
        if(registered != undefined){
            await StorageHelper.setUser(registered)
            router.replace('/')
        }else{
            setModalMessage("Ocorreu um erro durante o cadastro.")
            setErrormodalVisible(true)
        }
        setIsLoading(false)
    }

    async function getLogin() {
        let user :User | null = await StorageHelper.getUser()
        if(user != null){
            router.replace('/')
        }
    }

    useEffect(() => {
        getLogin()
    }, [isFocused]);

    useEffect(() => {
        navigation.setOptions({headerShown: false})
    })

    return (
        <View style={[DefaultStyle.container, DefaultStyle.flexCenter]}>
            <MessageModal
                isVisible={errorModalVisible}
                message={modalMessage}
                onCloseButtonPressed={() => {
                    setErrormodalVisible(false)
                }}
                confirmButtonText="OK"
            />
            <View style={[DefaultStyle.fillParent, DefaultStyle.flexCenter, {gap: 20}]}>
                <Text style={styles.title}>Ond?</Text>
                <View style={[DefaultStyle.fillWidth, {padding: 20, gap: 20}]}>
                    <View style={[DefaultStyle.flexCenter, DefaultStyle.fillParent, {flex: 3, alignItems: 'flex-start', gap: 3}]}>
                        <Text style={[{fontSize: 20, fontWeight: 'bold'}]}>Nome</Text>
                        <TextInput onChangeText={(text) => { setNameText(text) }} value={nameText} keyboardType="default" textContentType="name" style={[DefaultStyle.fillWidth, {borderBottomWidth: 2, fontSize: 16, paddingHorizontal: 5, paddingVertical: 10} ]} />
                        <Text style={[{fontSize: 20, fontWeight: 'bold'}]}>E-mail</Text>
                        <TextInput onChangeText={(text) => { setEmailText(text) }} value={emailText} keyboardType="email-address" textContentType="emailAddress" style={[DefaultStyle.fillWidth, {borderBottomWidth: 2, fontSize: 16, paddingHorizontal: 5, paddingVertical: 10} ]} />
                        <Text style={[{fontSize: 20, fontWeight: 'bold'}]}>Senha</Text>
                        <TextInput onChangeText={(text) => { setPasswordText(text) }} secureTextEntry={true} value={passwordText} style={[DefaultStyle.fillWidth, {borderBottomWidth: 2, fontSize: 16, paddingHorizontal: 5, paddingVertical: 10} ]} />
                    </View>
                    <View style={[DefaultStyle.horizontalFlex, {flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 20}]}>
                        <StylizedButton
                            onPress={() => {
                                router.back()
                            }}
                            title={"Voltar"} />
                        <StylizedButton
                            onPress={() => {
                                register()
                            }}
                            title={"Cadastrar"} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 50
    }
});
