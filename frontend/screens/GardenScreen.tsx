import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Text, Dimensions, FlatList, Image } from 'react-native'
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import * as Layout from "../constants/Layout"
import { darkGreen, green, yellow } from "../constants/Colors"
// import { signIn } from '../redux/actions/authActions'
import UserPic from '../assets/icons/user.svg';
import BackIcon from '../assets/icons/previous.svg';
import PhoneIcon from '../assets/icons/phone.svg';
import PinIcon from '../assets/icons/pin.svg';
import { fontBold, fontRegular, fontSizeLarge, fontMedium } from '../providers/FontProvider';
import ProduceBar from '../components/garden/ProduceBar'
// import GardenPic from '../assets/images/garden.jpeg';
import {produceType} from '../types'
import {StatusBar} from 'react-native';

type thisProps = {
route: any,
navigation: any
}

function GardenScreen( { route, navigation }: thisProps ) {
    const [gardener, setGardener] = useState<{username?: string, pfp?: string}>({});
    const [produce, setProduce] = useState<produceType[]>([])
    const gardenProp: any = route.params ? route.params.gardenProp : null  

    /// Get user pfp
    useEffect(() => {
        fetch(`http://088d60de8c82.ngrok.io/user/${gardenProp.user}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((json) => {
                let gardener = {username: json.user.name, pfp: json.user.image};
                setGardener(gardener);
            }).catch((error) => {
                console.error(error);
            })
    }, []);

    // Get List of produce images and names from a garden ID
    useEffect(() => {
        fetch(`http://088d60de8c82.ngrok.io/gardens/p/${gardenProp._id}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((json) => {
                let produce: produceType[] = [];
                !!json && json.length && json.forEach((p: any) => {
                    produce.push({image: p.image, name: p.name, price: p.price, garden: p.garden, note: p.note});
                });
                setProduce(produce);
            }).catch((error) => {
                console.error(error);
            });
    }, []);

    const _renderProduceBar = ({ item }: any) => {
        return <ProduceBar produce={item} key={item.name}/>
    }

    const _renderGardenInfo = () => {
        return (
        <>


           <View style={styles.garden}>
               <Image source={{uri: gardenProp.image }} style={styles.imageGarden} />
           </View>

            <Text style={styles.gardenName}>{gardenProp.name}</Text>

            <View style={styles.namepfp}>
                <Image source={{uri: gardener.pfp}} style={styles.profile} width={40} height={40} />
                <Text style={styles.name}>
                    {gardener.username}
                </Text>
            </View>

            <View style={styles.desc}>
                <Text style={styles.bioTxt}>
                    {gardenProp.bio}
                </Text>

                <View style={styles.row}>
                    <PhoneIcon
                        style={styles.icons}
                        width={25}
                        height={25}
                        fill={green}
                    />
                    <Text style={styles.phoneTxt}>
                        {gardenProp.phoneNumber}
                    </Text>
                </View>

                <View style={styles.row}>
                    <PinIcon
                        style={styles.icons}
                        width={25}
                        height={25}
                        fill={green}
                    />
                    <Text style={styles.txt}>
                        {gardenProp.address}
                    </Text>
                </View>
            </View>
            </>
        )
}

    if(!gardenProp) return <View/>

    return (
        <View style={styles.container}>
            <BackIcon 
                width={40} 
                height={40} 
                fill={green}
                style={styles.overlay}
                onPress={() => navigation.navigate('Home')}
            />
            <FlatList
                data={produce}
                renderItem={_renderProduceBar}
                ListHeaderComponent={_renderGardenInfo()}
            />
        </View>
    );
}

const universalMarginLeft = 10
const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        marginTop: (StatusBar.currentHeight || 0) + 10,
        left: 0,
        marginLeft: '1%',
        zIndex: 2,
    },
    imageGarden: {
        overflow: "hidden",
        width: Layout.default.window.width,
        height: 200,
        alignSelf: "flex-start",
    },
    container: {
        flex: 2
    },
    desc: {
      
    },
    row:{
        flexDirection: "row",
        marginBottom: 5
    },
    txt: {
        flex: 1,
        fontSize: 16,
        marginLeft: 8,
        marginBottom: "2%",
        flexWrap: 'wrap',
    },
    phoneTxt: {
        fontSize: 16,
        marginLeft: 8,
        marginBottom: 4,
        marginTop: 3,
    },
    bioTxt: {
        fontSize: 16,
        marginLeft: universalMarginLeft,
        marginBottom: 15,
        flexWrap: 'wrap'
    },
    icons: {
        marginLeft: 10,
        marginTop: ".5%",
        marginBottom: 15
    },
    map: {
        width: Layout.default.window.width,
        height: Layout.default.window.height,
    },
    garden: {//
        flexDirection: "row",
        // position: 'absolute',
        // zIndex: 5,
        // padding: 20
    },
    companyName: {
        marginBottom: 8,
        marginLeft: 10,
        fontFamily: fontBold,
        fontSize: 40,
        color: darkGreen,
        // width: 100,
        textAlign: 'left',
    },
    gardenName: {
        marginLeft: 8,
        color: 'black',
        fontSize: 32,
        fontFamily: fontMedium,
        marginTop: 10
    },
    name: {
        marginTop: 0,
        marginLeft: 5,
        color: '#000000',
        fontSize: 16,
        textAlign: 'left',
        fontFamily: fontRegular
    },
    namepfp: {
        marginTop: 11,
        flexDirection: "row",
        height: 60,
        alignItems: 'center'
        //justifyContent: 'center'
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
        borderRadius: 30,
        overflow: "hidden",
        width: 45,
        height: 45,
        marginTop: 5,
        alignSelf: "flex-start",
        marginLeft: universalMarginLeft,
    },
    add: {
        marginLeft: 'auto',
        marginBottom: 14,
        marginRight: 10,
        // backgroundColor: yellow,
    }
});

const mapStateToProps = (state: any, props: any) => {
    return {
        //auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch: any, getState: any) => {
    return {
        //auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GardenScreen)