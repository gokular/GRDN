import React from 'react'
import { Modal, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import ModalBase from './ModalBase'
type thisProps = {
    active: boolean,
    deactivate?: () => void,
    children: any,
    baseStyle?: any
}

const windowHeight = Dimensions.get('window').height;

function ModalWrapper({ active, deactivate, children, baseStyle, ...rest }: thisProps) {
    function onBackgroundPress() {
        if (deactivate) deactivate()

    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={active}
            onRequestClose={deactivate}
        >
            <TouchableOpacity activeOpacity={1} onPress={onBackgroundPress} style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                    <ModalBase style={baseStyle}>
                        {children}
                    </ModalBase>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

export default ModalWrapper

const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight,
        zIndex: 100
    },
})
