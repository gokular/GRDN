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
// const config = require('../config');
// import Svg, { Path } from 'react-native-svg';

// type thisProps = {
// signIn: (sijsofj: string)=>void,
//     navigation: any
// }
// DOWNLOAD AN EXTENSION TO MAKE AUTOMATIC INDENTS PLEASE

function HomeScreen({ navigation }) {
    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [gardens, setGardens] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            // setGardens([location.coords]);
        })();
        // fetch(`localhost:8000/gardens`, {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         longtitude: location.coords.longitude,
        //         latitude: location.coords.latitude,
        //         miles: '100'
        //     })
        // })
        //     .then((response) => response.json())
        //     .then((json) => { // {ret: [{longitide: , latitude: }, {}, {}, ...]}
        //         setGardens(json.ret);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }, []);

    // useEffect(() => {
    // (async () => {
    // await locFinder;
    // })();
    // }, [gardens]);

    function onRegionChange(region: any): void {
        //console.log("region change", region)
    }

    return (
        <View style={styles.container}>
            {/* <Text>
                Home
            </Text>
            <Text>
                {!!location && (location.coords.latitude + ", " + location.coords.longitude)}
            </Text>
            <Text>
                {errorMsg}
            </Text> */}
            <View
                style={styles.nav}
            >
                <View style={styles.navbar}>
                    <Text style={styles.companyName}>GRDN</Text>
                    <AddIcon
                        style={styles.add}
                        width={30} height={30}
                        fill={yellow}
                        onPress={() => navigation.navigate('EditGarden')}
                    />
                    <UserPic style={styles.profile} width={40} height={40} fill={yellow} />
                </View>
            </View>
            {!!location &&
                <MapView
                    style={styles.map}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onRegionChange={onRegionChange}
                >
                    {/* {!!gardens.length && gardens.map((garden) => {
                        return (
                            <Marker
                                coordinate={{
                                    latitude: garden.latitude,
                                    longitude: garden.longitude
                                }}
                                title={garden.name}
                                description={garden.bio}
                                pinColor={green}
                            />
                        );
                    })} */}

                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }}
                        description="This is the user"
                        title="User"
                        pinColor={green}
                    />
                </MapView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: Layout.default.window.width,
        height: Layout.default.window.height,
    },
    nav: {
        flexDirection: "row",
        height: 100,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)