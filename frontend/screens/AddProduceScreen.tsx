import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux';
import Camera from "../assets/icons/camera.svg";
import BackButton from "../assets/icons/previous.svg";
import { green, yellow } from '../constants/Colors';
import { fontBold, fontLight, fontSizeRegular } from '../providers/FontProvider';
import { StatusBar } from 'react-native';


type thisProps = {
}

function AddProduceScreen(props: thisProps) {
    const [name, setName] = useState<string>()
    const [price, setPrice] = useState<string>()

    return (
        <View style={styles.container}>

            <BackButton
                style={styles.backButton}
                width={"10%"} height={"10%"}
                fill={green}
            //onPress={() => navigation.navigate('SignIn')}
            />

            <TextInput
                style={styles.input}
                onChangeText={setName}
                placeholder="Name"
            />

            <TextInput
                style={styles.input}
                keyboardType={'numeric'}
                onChangeText={setPrice}
                placeholder="Price"
                secureTextEntry={true}
            />

            <Camera
                style={{
                    alignSelf: "flex-start",
                    marginLeft: 40,
                }}
                width={"10%"} height={"10%"}
                fill={green}
            //onPress={pickImage}
            />

            {/*{!!image &&
              <Image
                source={{ uri: image.uri }}
                style={styles.image}
              />
            }*/}
            <TouchableOpacity
                style={styles.button}
            //onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Add Produce</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: (StatusBar.currentHeight || 0) + 10,
    },
    backButton: {
        alignSelf: "flex-start",
        marginLeft: 40
    },
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
        width: "100%",
        alignItems: "center",
        padding: 15,
        position: 'absolute',
        bottom: 0
    },
    buttonText: {
        color: yellow,
        fontFamily: fontBold,
        marginTop: 'auto',
        fontSize: fontSizeRegular,
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 10000,
        margin: 10
    }
});

const mapStateToProps = (state: any, props: any) => {
    return {
        //auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        //signOut: () => dispatch(signOut()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduceScreen)