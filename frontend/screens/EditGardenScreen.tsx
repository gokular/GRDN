import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, FlatList, Platform, Image, TextInput } from 'react-native'
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import * as Layout from "../constants/Layout"
import { darkGreen, green, yellow } from "../constants/Colors"
// import { signIn } from '../redux/actions/authActions'
import UserPic from '../assets/icons/user.svg';
import BackIcon from '../assets/icons/previous.svg';
import PhoneIcon from '../assets/icons/phone.svg';
import PinIcon from '../assets/icons/pin.svg';
import { fontBold, fontRegular, fontSizeLarge, fontMedium, fontLight } from '../providers/FontProvider';
import ProduceBar from '../components/garden/ProduceBar'
// import GardenPic from '../assets/images/garden.jpeg';
import { produceType } from '../types'
import { StatusBar } from 'react-native';
import Camera from "../assets/icons/camera.svg";
import * as ImagePicker from 'expo-image-picker';
import {addProduce, clearProduce} from '../redux/actions/addProduceActions';

type thisProps = {
    auth: any,
    route: any,
    addProduce: any,
    navigation: any,
    clearProduce: any
}

function EditGardenScreen({ route, navigation, auth, addProduce, clearProduce }: thisProps) {
    const [gardener, setGardener] = useState<{ username?: string, pfp?: string }>({});
    const [produce, setProduce] = useState<produceType[]>([]);
    const [gardenName, setGardenName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [image, setImage] = useState<any>();

    // Get user pfp
    useEffect(() => {
        fetch(`http://088d60de8c82.ngrok.io/user/${auth.id}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((json) => {
                let gardener = { username: json.user.name, pfp: json.user.image };
                setGardener(gardener);
            }).catch((error) => {
                console.error(error);
            })
    }, []);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();

        return ()=>{
            // To clear produces
            clearProduce()
        }

    }, []);

    const handleSubmit = async () => {
        const { authToken }: any = auth
        

        const {newProduces} = addProduce            
        const produceIds: any = []
        const produceObjects: any = []
        newProduces.forEach((produce: any)=>{
            produceIds.push(produce._id)
            produceObjects.push({image: produce.image, name: produce.name, price: produce.price})
            }
        )

        //[{image: "", name: "", price: ""}]

    

        let formdata = new FormData();
        formdata.append('bio', description);
        formdata.append('name', gardenName);
        formdata.append('phoneNumber', phoneNumber);
        formdata.append('address', address);
        formdata.append('user', auth.id);
        // formdata.append('phoneNumber', phoneNumber);
        // formdata.append('address', address);
        // formdata.append('bio', description)
        //@ts-ignore
        formdata.append('image', { uri: image.uri, name: image.uri.substr(image.uri.lastIndexOf('/')), type: "image/jpeg" });
        formdata.append('produce', JSON.stringify(produceIds))

        console.log(formdata);

        try {
            const response = await fetch(`http://088d60de8c82.ngrok.io/gardens`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + auth.token
                },
                body: formdata
            });
            console.log(response);

            if (response.ok) {
                navigation.navigate('Home');
            }

        } catch (error) {
            console.log(error);
            // TODO Output error to screen?
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result);
        }
    };


    const _renderProduceBar = ({ item }: any) => {
        return <ProduceBar produce={item} key={item.name} />
    }

    const _renderGardenInfo = () => {
        return (
            <>

                <View style={styles.garden}>
                    {!!image &&
                        <Image
                            source={{ uri: image.uri }}
                            style={{
                                overflow: "hidden",
                                width: Layout.default.window.width,
                                height: 200,
                                alignSelf: "flex-start",
                                zIndex: 5
                            }}
                        />
                    }
                    <Camera
                        style={{
                            marginLeft: "42.5%",
                            marginTop: "19.5%",
                            justifyContent: "center",
                            alignContent: "center",
                            zIndex: 3
                        }}
                        height={50}
                        width={50}
                        fill={"rgba(0,0,0,0.1)"}
                        onPress={pickImage}
                    />
                </View>


                <TextInput
                    style={styles.gardenName}
                    keyboardType="default"
                    textContentType="name"
                    onChangeText={setGardenName}
                    placeholder="Garden Name..."
                />

                <View style={styles.namepfp}>
                    <Image source={{ uri: gardener.pfp }} style={styles.profile} width={40} height={40} />
                    <Text style={styles.name}>
                        {gardener.username}
                    </Text>
                </View>

                <View style={styles.desc}>

                    <TextInput
                        style={styles.bioTxt}
                        keyboardType="default"
                        textContentType="none"
                        onChangeText={setDescription}
                        placeholder="Add Description..."
                    />

                    <View style={styles.row}>
                        <PhoneIcon
                            style={styles.icons}
                            width={25}
                            height={25}
                            fill={green}
                        />
                        <TextInput
                            style={styles.phoneTxt}
                            keyboardType="number-pad"
                            textContentType="telephoneNumber"
                            onChangeText={setPhoneNumber}
                            placeholder="Phone Number..."
                        />
                    </View>

                    <View style={styles.row}>
                        <PinIcon
                            style={styles.icons}
                            width={25}
                            height={25}
                            fill={green}
                        />
                        <TextInput
                            style={styles.txt}
                            keyboardType="default"
                            textContentType="addressCity"
                            onChangeText={setAddress}
                            placeholder="Enter Address..."
                        />
                    </View>
                </View>

            </>
        )
    }
    // if (!gardenProp) return <View />

    return (
        <View style={styles.container}>
            <BackIcon
                width={40}
                height={40}
                fill={green}
                style={styles.overlay}
                onPress={() => navigation.navigate('Home')}
            />
            <TouchableOpacity
                style={styles.buttonSubmit}
                onPress={() => handleSubmit()}
            >
                <Text style={styles.buttonTextRev}>Submit</Text>
            </TouchableOpacity>

            <FlatList
                data={addProduce.newProduces}
                renderItem={_renderProduceBar}
                ListHeaderComponent={_renderGardenInfo()}
ListFooterComponent={<View style={{height: 100}}/>}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AddProduce')}
            >
                <Text style={styles.buttonText}>Add Produce</Text>
            </TouchableOpacity>
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
        flex: 1
    },
    desc: {

    },
    row: {
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
        height: 200,
        backgroundColor: '#cccccc',
        // position: 'absolute',
        zIndex: 0,
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
    },
    button: {
        backgroundColor: green,
        width: "100%",
        alignItems: "center",
        padding: 15,
        position: 'absolute',
        bottom: 0
    },
    buttonText: {
        color: yellow,
        fontFamily: fontMedium,
        fontSize: 16,
    },
    buttonSubmit: {
        backgroundColor: yellow,
        borderRadius: 10,
        width: "25%",
        padding: 10,
        position: 'absolute',
        marginTop: (StatusBar.currentHeight || 0) + 10,
        right: 0,
        marginRight: '1%',
        zIndex: 2,
        alignItems: "center"
    },
    buttonTextRev: {
        color: green,
        fontWeight: "600",
        fontFamily: fontBold,
        fontSize: 16,
    },
});

const mapStateToProps = (state: any, props: any) => {
    return {
        auth: state.auth,
        addProduce: state.addProduce
    }
}

const mapDispatchToProps = (dispatch: any, getState: any) => {
    return {
        clearProduce: () => dispatch(clearProduce()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGardenScreen)