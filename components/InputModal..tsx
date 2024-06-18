import DefaultStyle from "@/styles/default";
import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import StylizedButton from "./StylizedButton";

type InputModalProps = {
    title: string,
    isVisible: boolean,
    onCloseButtonPressed: any,
    onConfirmButtonPressed: any,
    confirmButtonText?: string,
    cancelButtonText?: string,
}

export default function InputModal(props: InputModalProps){
    const [inputText, setInputText] = useState("")

    return (
        <Modal
        transparent={true}
        visible={props.isVisible}
        animationType="fade"
        onRequestClose={() => props.onCloseButtonPressed()}
        >
            <View style={[DefaultStyle.flexCenter, DefaultStyle.container, { backgroundColor: '#0003' }]}>
                <View style={[DefaultStyle.modal, {height: '40%'}]}>
                    <View style={[DefaultStyle.fillParent, DefaultStyle.verticalFlex]}>
                        <View style={[DefaultStyle.flexCenter, DefaultStyle.fillParent, {flex: 3, alignItems: 'flex-start', gap: 3}]}>
                            <Text style={[{fontSize: 20, fontWeight: 'bold'}]}>{ props.title }</Text>
                            <TextInput onChangeText={(text) => { setInputText(text) }} value={inputText} style={[DefaultStyle.fillWidth, {borderBottomWidth: 2, fontSize: 16, paddingHorizontal: 5, paddingVertical: 10} ]} />
                        </View>
                        <View style={[DefaultStyle.horizontalFlex, {flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 20}]}>
                            <StylizedButton
                                onPress={() => {
                                    props.onCloseButtonPressed()
                                    setInputText("")
                                }}
                                title={props.cancelButtonText ?? "Cancelar"} />
                            <StylizedButton
                                onPress={() => {
                                    props.onConfirmButtonPressed(inputText)
                                    setInputText("")
                                }}
                                title={props.confirmButtonText ?? "Confirmar"} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}