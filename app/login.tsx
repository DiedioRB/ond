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
    const [emailText, setEmailText] = useState("")
    const [passwordText, setPasswordText] = useState("")
    const [errorModalVisible, setErrormodalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState("")

    const isFocused = useIsFocused()

    async function login(){
        setIsLoading(true)
        let found :User | undefined = await API.login(emailText, passwordText)
        if(found != undefined){
            await StorageHelper.setUser(found)
            router.replace('/')
        }else{
            setModalMessage("Usuário ou senha incorretos.")
            setErrormodalVisible(true)
        }
        setIsLoading(false)
    }

    function register(){
        router.push('/register')
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
        <View style={[DefaultStyle.container, DefaultStyle.flexCenter, DefaultStyle.background]}>
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
                <View style={[DefaultStyle.fillWidth, {padding: 20, gap: 20, height: '50%', justifyContent: 'center'}]}>
                    <View style={[DefaultStyle.flexCenter, DefaultStyle.fillParent, {flex: 1, alignItems: 'flex-start', gap: 3}]}>
                        <Text style={[DefaultStyle.onBackground, {fontSize: 20, fontWeight: 'bold'}]}>E-mail</Text>
                        <TextInput onChangeText={(text) => { setEmailText(text) }} value={emailText} keyboardType="email-address" textContentType="emailAddress"  style={[DefaultStyle.fillWidth, DefaultStyle.onBackground, {borderBottomWidth: 2, fontSize: 16, paddingHorizontal: 5, paddingVertical: 10} ]} />
                        <Text style={[DefaultStyle.onBackground, {fontSize: 20, fontWeight: 'bold'}]}>Senha</Text>
                        <TextInput onChangeText={(text) => { setPasswordText(text) }} secureTextEntry={true} value={passwordText} style={[DefaultStyle.fillWidth, DefaultStyle.onBackground, {borderBottomWidth: 2, fontSize: 16, paddingHorizontal: 5, paddingVertical: 10} ]} />
                    </View>
                    <View style={[DefaultStyle.horizontalFlex, {flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 20}]}>
                        <StylizedButton
                            onPress={() => {
                                register()
                            }}
                            title={"Cadastro"} />
                        <StylizedButton
                            onPress={() => {
                                login()
                            }}
                            title={"Login"} />
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
