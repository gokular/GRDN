import React from 'react'
import { StyleSheet, Text, ActivityIndicator } from 'react-native'
import * as colors from '../../constants/Colors'
import { fontMedium, fontSizeRegular } from '../../constants/Fonts';
import ModalWrapper from './ModalWrapper';
import { BarIndicator } from 'react-native-indicators'
type thisProps = {
    active: boolean,
    deactivate?: () => void,
    text?: String
}


function LoadingModal(props: thisProps) {
    return (
        <ModalWrapper {...props}>
            <Text style={styles.text}>
                {props.text || 'Loading'}
            </Text>
            <BarIndicator color={colors.green} size={40} />
        </ModalWrapper>
    )
}

export default LoadingModal

const styles = StyleSheet.create({
    text: {
        fontFamily: fontMedium,
        fontSize: fontSizeRegular,
        margin: 10,
        color: 'black',
        textAlign: 'center'
    },
})
