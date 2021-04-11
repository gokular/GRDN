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
import NavBar from '../components/NavBar';
import { useFocusEffect } from '@react-navigation/native';

// const config = require('../config');
// import Svg, { Path } from 'react-native-svg';

// type thisProps = {
// signIn: (sijsofj: string)=>void,
//     navigation: any
// }
// DOWNLOAD AN EXTENSION TO MAKE AUTOMATIC INDENTS PLEASE

function HomeScreen({ navigation }: any) {
    const [location, setLocation] = useState<any>(null);
    const [initLocation, setInitLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [gardens, setGardens] = useState<any[]>([]);
    const [gardenLoading, setGardenLoading] = useState<boolean>(false);
    const [locationTimer, setLocationTimer] = useState<any>();

    useFocusEffect(React.useCallback(() => {

        const locFinder = async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setInitLocation(location);
        };

        locFinder();
      return () => {};
    }, []))

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (location != null) {
            fetch(`http://088d60de8c82.ngrok.io/gardens/g/${100}&${location.coords.longitude}&${location.coords.latitude}`, {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((json) => { // {ret: [{longitide: , latitude: }, {}, {}, ...]}
                    setGardens(json.ret);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => setGardenLoading(true));
        }
    }, [location]);

    const distance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const p = Math.PI / 180;
        const c = Math.cos;
        const a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
        return Math.abs(0.621371 * 12742 * Math.asin(Math.sqrt(a)));
    }
    
    function onRegionChange(region: any): void { 
        if (locationTimer) clearTimeout(locationTimer)
        setLocationTimer(setTimeout(function () {
        let coordObj = {coords: region}
        if(distance(location.coords.latitude, location.coords.longitude, region.latitude, region.longitude) > 100) {
            setLocation(coordObj);
        }
        }, 1000))
    }

    if(!initLocation) return <View/>
    return (
        <View style={styles.container}>

                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: initLocation.coords.latitude,
                        longitude: initLocation.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onRegionChange={onRegionChange}
                >
                    {!!gardenLoading && gardens.map((garden, index) => {
                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: garden.latitude,
                                    longitude: garden.longitude
                                }}
                                title={garden.name}
                                description={garden.bio}
                                pinColor={green}
                                onPress={() => navigation.navigate('Garden', {gardenProp: garden})}
                            />
                        );
                    })}

                    <Marker
                        coordinate={{
                            latitude: initLocation.coords.latitude,
                            longitude: initLocation.coords.longitude
                        }}
                        description="This is the user"
                        title="User"
                        pinColor={yellow}
                    />
                </MapView>
                <View
                    style={{
                        position: 'absolute',
                        top: 0
                    }}
                    >
                        <NavBar
                        navigation={navigation}
                        />
                </View>
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