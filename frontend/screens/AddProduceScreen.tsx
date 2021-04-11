import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Platform } from 'react-native'
import { connect } from 'react-redux';
import Camera from "../assets/icons/camera.svg";
import BackButton from "../assets/icons/previous.svg";
import { green, yellow } from '../constants/Colors';
import { fontBold, fontLight, fontSizeRegular } from '../providers/FontProvider';
import { StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addProduce, clearProduce } from '../redux/actions/addProduceActions'

type thisProps = {
  navigation: any,
  route: any,
  auth: any,
  addProduce: (produce: any) => any,
  clearProduce: any,
}

function AddProduceScreen(props: thisProps) {
  const [name, setName] = useState<string>()
  const [price, setPrice] = useState<string>()
  const [image, setImage] = useState<any>()

  const { auth, route } = props

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


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

  const handleSubmit = async () => {
    if (!name || name.length == 0 || !price || price.length === 0) {
      // TODO fields required
      return
    }



    let formdata = new FormData();
    formdata.append('name', name);
    formdata.append('price', price);
    //@ts-ignore
    formdata.append('image', { uri: image.uri, name: image.uri.substr(image.uri.lastIndexOf('/')), type: "image/jpeg" });

    try {
      const response = await fetch(`http://088d60de8c82.ngrok.io/gardens/p`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": "Bearer " + auth.token
        },
        body: formdata
      });

      if (response.ok) {
        const data = await response.json();
        await props.addProduce(data.prod)
        props.navigation.goBack()
      }

    } catch (error) {
      console.log(error);
      // TODO Output error to screen?
    }


  }

  return (
    <View style={styles.container}>

      <BackButton
        style={styles.backButton}
        width={"10%"} height={"10%"}
        fill={green}
        onPress={() => props.navigation.goBack()}
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
      />

      <Camera
        style={{
          alignSelf: "flex-start",
          marginLeft: 40,
        }}
        width={"10%"} height={"10%"}
        fill={green}
        onPress={pickImage}
      />

      {!!image &&
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
      }
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
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
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch: any, props: any) => {
  return {
    addProduce: (produce: any) => dispatch(addProduce(produce)),
    clearProduce: () => dispatch(clearProduce()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduceScreen)