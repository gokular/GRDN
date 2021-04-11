import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import { green, yellow } from "../constants/Colors";
import LogoOutline from "../assets/icons/logoOutline.svg";
import styles from '../styles/formStyles';
import { RootStackParamList } from '../types';
import { connect } from 'react-redux';
import { signIn } from '../redux/actions/authActions';
import ErrorModal from '../components/modals/ErrorModal'

type thisProps = {
  navigation: any,
  signIn: (email: string, password: string) => any,
  auth: any
}

function SignInScreen({ navigation, signIn, auth }: thisProps) {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    if(email.length == 0 || password.length == 0) {
      // TODO Fields required 
      setError("Missing fields")
      return 
    }
// Calls signIn function in authActions which logs user in and returns state
    const signInRes = await signIn(email, password);
    if(signInRes.success){
      // Return to home screen
      navigation.navigate('Home');
    }
    else{
    const {error} = signInRes
    setError("" + error.message)
    }
  }

  return (
<>
  <ErrorModal
    active={!!error}
    text={error}
    deactivate={() => setError("")}
  />
    <View style={styles.container}>

      <LogoOutline
        // style={styles.add}
        width={"80%"} height={"40%"}
        fill={yellow}
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
        textContentType="password"
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text
        style={styles.link}
        onPress={() => navigation.navigate('SignUp')}
      >
        Don't have account? Sign up
      </Text>
      <Text style={styles.link}>Forgot Password?</Text>
    </View>
</>
  );
}

const mapStateToProps = (state: any, props: any) => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch: any, getState: any) => {
  return {
    signIn: (email: string, password: string)=> dispatch(signIn(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)