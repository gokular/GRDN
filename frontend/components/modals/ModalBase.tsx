import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

function ModalBase({ children, style }: any) {
    return (
        <View style={{ ...styles.container, ...style }}>
            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
        backgroundColor: "white",
        borderRadius: 2,
        padding: 10,
        alignItems: "center",
        justifyContent: 'center',
        maxWidth: '80%',
        minHeight: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
})
export default ModalBase