import DefaultStyle from "@/styles/default";
import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import StylizedButton from "./StylizedButton";
import Item from "@/models/item";

type ConfirmModalProps = {
    title: string,
    isVisible: boolean,
    onCloseButtonPressed: any,
    onConfirmButtonPressed: any,
    confirmButtonText?: string,
    cancelButtonText?: string,
    item? :Item,
}

export default function ConfirmModal(props: ConfirmModalProps){
    return (
        <Modal
        transparent={true}
        visible={props.isVisible}
        animationType="fade"
        onRequestClose={() => props.onCloseButtonPressed()}
        >
            <View style={[DefaultStyle.flexCenter, DefaultStyle.container, { backgroundColor: '#0003' }]}>
                <View style={[DefaultStyle.modal]}>
                    <View style={[DefaultStyle.fillParent, DefaultStyle.verticalFlex]}>
                        <View style={[DefaultStyle.flexCenter, DefaultStyle.fillParent, {flex: 3, alignItems: 'flex-start', gap: 3}]}>
                            <Text style={[{fontSize: 20, fontWeight: 'bold'}]}>{ props.title }</Text>
                        </View>
                        <View style={[DefaultStyle.horizontalFlex, {flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 20}]}>
                            <StylizedButton
                                onPress={() => {
                                    props.onCloseButtonPressed()
                                }}
                                title={props.cancelButtonText ?? "Cancelar"} />
                            <StylizedButton
                                onPress={() => {
                                    props.onConfirmButtonPressed(props.item)
                                }}
                                title={props.confirmButtonText ?? "Confirmar"} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}