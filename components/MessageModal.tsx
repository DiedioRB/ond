import DefaultStyle from "@/styles/default";
import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import StylizedButton from "./StylizedButton";
import Item from "@/models/item";

type ConfirmModalProps = {
    message: string,
    isVisible: boolean,
    onCloseButtonPressed: any,
    confirmButtonText :string
}

export default function MessageModal(props: ConfirmModalProps){
    return (
        <Modal
        transparent={true}
        visible={props.isVisible}
        animationType="fade"
        >
            <View style={[DefaultStyle.flexCenter, DefaultStyle.container, { backgroundColor: '#0003' }]}>
                <View style={[DefaultStyle.modal]}>
                    <View style={[DefaultStyle.fillParent, DefaultStyle.verticalFlex]}>
                        <View style={[DefaultStyle.flexCenter, DefaultStyle.fillParent, {flex: 3, alignItems: 'flex-start', gap: 3}]}>
                            <Text style={[{fontSize: 20, fontWeight: 'bold'}]}>{ props.message }</Text>
                        </View>
                        <View style={[DefaultStyle.horizontalFlex, {flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 20}]}>
                            <StylizedButton
                                onPress={() => {
                                    props.onCloseButtonPressed(props.onCloseButtonPressed)
                                }}
                                title={props.confirmButtonText ?? "Confirmar"} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}