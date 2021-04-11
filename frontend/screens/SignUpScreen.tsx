import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, TextInput, Platform, Image, ScrollView } from 'react-native';
import { fontLight, fontRegular, fontSizeLarge } from '../providers/FontProvider';
import { darkGreen, green, yellow } from "../constants/Colors";
import Layout from "../constants/Layout";
import BackButton from "../assets/icons/previous.svg";
import Camera from "../assets/icons/camera.svg";
import styles from '../styles/formStyles';
import { RootStackParamList } from '../types';
import * as ImagePicker from 'expo-image-picker';

type thisProps = {
  navigation: any
}

export default function SignUpScreen({ navigation }: thisProps) {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCopy, setPasswordCopy] = useState<string>("");
  const [image, setImage] = useState<any>();

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

  const handleSubmit = async () => {
    if (email.length == 0 || name.length == 0 || password.length == 0 || passwordCopy.length == 0) {
      // TODO fields required
    }

    let formdata = new FormData();
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('password', password);
//@ts-ignore
    formdata.append('image', { uri: image.uri, name: image.uri.substr(image.uri.lastIndexOf('/')), type: "image/jpeg" });

    try {
      const response = await fetch(`http://088d60de8c82.ngrok.io/user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formdata
      });
      console.log(response);

      if (response.ok) {
        navigation.navigate('SignIn');
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

  return (
    <ScrollView contentContainerStyle={{flex: 1, minHeight: Layout.window.height}}>
    <View style={styles.container}>

      <BackButton
        style={styles.backButton}
        width={"10%"} height={"10%"}
        fill={green}
        onPress={() => navigation.navigate('SignIn')}
      />

      <TextInput
        style={styles.input}
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={setEmail}
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        onChangeText={setName}
        placeholder="Name"
      />

      <TextInput
        style={styles.input}
        textContentType="password"
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        textContentType="password"
        onChangeText={setPasswordCopy}
        placeholder="Confirm Password"
        secureTextEntry={true}
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
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text
        style={styles.link}
        onPress={() => navigation.navigate('SignIn')}
      >
        Already have an account? Sign in.
      </Text>
    </View>
    </ScrollView>
  );
}