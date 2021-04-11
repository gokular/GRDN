import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { fontBold } from '../../fontProvider'

function ModalButton(props: any) {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    text: {
        fontFamily: fontBold
    },
})

export default ModalButton
