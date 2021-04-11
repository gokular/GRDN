
import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { connect } from 'react-redux';
import UserPic from '../assets/icons/user.svg';
import AddIcon from '../assets/icons/add.svg';
import {yellow, green} from '../../constants/Colors'
import {fontBold, fontRegular} from '../../providers/FontProvider'
import {StatusBar} from 'react-native';
import Layout from '../../constants/Layout'
import {produceType} from '../../types'

type thisProps = {
produce: produceType
}

function ProduceBar(props: thisProps) {
    const {produce} = props
    return (
        <View style={styles.produce}>
{
!!produce.image ?
            <Image source={{uri: produce.image}} 
                style={styles.imageProduce}
            />
: <View style={styles.imageProduce}/>
}

            <Text style={styles.produceTxt}>
                {produce.name}
            </Text>

            <Text style={styles.priceTxt}>
                ${produce.price} / lb
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({

    produceTxt: {
        fontSize: 17,
        marginLeft: 15,
        marginTop: "4%",
        alignSelf: "flex-start",
        fontWeight: 'bold'
    },
    produce: {
        //backgroundColor: '#ffffff',
        width: Layout.window.width,
        flexDirection: "row",
        height: 55,
        marginBottom: 5
    },
    imageProduce: {
        borderRadius: 30,
        overflow: "hidden",
        width: 45,
        height: 45,
        marginTop: 5,
        alignSelf: "flex-start",
        marginLeft: "2%"
    },
    imageGarden: {
        overflow: "hidden",
        width: Layout.window.width,
        height: 200,
        marginTop: 5,
        alignSelf: "flex-start",
    },
    priceTxt: {
        fontSize: 17,
        marginLeft: "auto",
        marginTop: "5%",
        marginRight: "5%",
        fontFamily: fontRegular
    },
});

export default ProduceBar