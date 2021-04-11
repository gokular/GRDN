import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Text, Dimensions, FlatList } from 'react-native'
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import * as Layout from "../constants/Layout"
import { darkGreen, green, yellow } from "../constants/Colors"
// import { signIn } from '../redux/actions/authActions'
import { fontBold, fontRegular, fontSizeLarge } from '../providers/FontProvider';
import UserPic from '../assets/icons/user.svg';
import AddIcon from '../assets/icons/add.svg';

function GardenScreen( {navigation} ) {
    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [gardens, setGardens] = useState<any[]>([]);

    return (
        <View style={styles.container}>
           <View style={styles.garden}></View>

        </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: Layout.default.window.width,
        height: Layout.default.window.height,
    },
    garden: {
        flexDirection: "row",
        height: 300,

        // PUT GARDEN IMAGE HERE

        // position: 'absolute',
        // zIndex: 5,
        // padding: 20
    },
    companyName: {
        marginBottom: 8,
        marginLeft: 10,
        fontFamily: fontBold,
        fontSize: 40,
        color: yellow,
        // width: 100,
        textAlign: 'left',
    },
    navbar: {
        backgroundColor: green,
        flex: 1,
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'flex-end',
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },
    profile: {
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 10,
        // alignSelf: 'flex-end',
        // float: right
    },
    add: {
        marginLeft: 'auto',
        marginBottom: 14,
        marginRight: 10,
        // backgroundColor: yellow,
    }
});