import React from 'react'
import { StyleSheet, Text, ActivityIndicator } from 'react-native'
import * as colors from '../../constants/Colors'
import { fontMedium, fontSizeRegular } from '../../providers/FontProvider';
import ModalWrapper from './ModalWrapper';
type thisProps = {
    active: boolean,
    deactivate: () => void,
    text: String
}

function ErrorModal(props: thisProps) {
    return (
        <ModalWrapper {...props}  >
            <Text style={styles.text}>
                {props.text}
            </Text>
        </ModalWrapper>
    )
}

export default ErrorModal

const styles = StyleSheet.create({
    text: {
        fontFamily: fontMedium,
        fontSize: fontSizeRegular,
        margin: 10,
        color: colors.red,
        textAlign: 'center'
    },
})
