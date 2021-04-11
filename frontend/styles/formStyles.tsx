import { StyleSheet } from 'react-native';
import { fontLight, fontRegular, fontSizeLarge } from '../providers/FontProvider';
import { green, yellow } from "../constants/Colors";

const formStyles = StyleSheet.create({
    input: {
        width: "80%",
        padding: 15,
        margin: 10,
        fontFamily: fontLight,
        backgroundColor: "rgb(222, 222, 222)",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0)",
        fontSize: 16,
        color: "rgb(51, 51, 51)"
    },
    button: {
        backgroundColor: green,
        borderRadius: 5,
        width: "80%",
        alignItems: "center",
        padding: 15,
        margin: 10,
    },
    buttonText: {
        color: yellow,
        fontWeight: "600",
        fontFamily: fontLight,
        fontSize: 16,
    },
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        margin: 10,
        color: green,
        fontSize: 16,
        fontFamily: fontLight,
        fontWeight: "500",
        width: "60%",
        textAlign: "center"
    },
    backButton: {
        alignSelf: "flex-start",
        marginLeft: 40,
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 10000,
        margin: 10
    }
});

export default formStyles;