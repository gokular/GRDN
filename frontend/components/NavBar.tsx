import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { connect } from 'react-redux';
import UserPic from '../assets/icons/user.svg';
import Logo from '../assets/icons/logoOutline.svg';
import AddIcon from '../assets/icons/add.svg';
import { yellow, green } from '../constants/Colors'
import { fontBold } from '../providers/FontProvider'
import { StatusBar } from 'react-native';
import Layout from '../constants/Layout'
import LogoIcon from "../assets/icons/logoFilled.svg";
import {signOut} from "../redux/actions/authActions"


type thisProps = {
    navigation: any,
    containerStyle?: any,
    auth: any,
signOut: ()=>any
}

function NavBar(props: thisProps) {
    const { navigation, containerStyle, auth } = props
    return (
        <View
            style={[
                styles.nav,
                containerStyle
            ]}
        >
            <LogoIcon
                style={styles.logo}
                width={30}
                height={30}
                fill={yellow}
                onPress={() => props.signOut()}
            />
            <Text style={styles.companyName}>GRDN</Text>
            {/* <LogoOutline
                // style={{
                //     alignSelf: "flex-start"
                // }}
                width={"200%"} height={"200%"}
                fill={yellow}
            /> */}




            {!!auth.image ?

<>
            <AddIcon
                style={styles.add}
                width={30} height={30}
                fill={yellow}
                onPress={() => navigation.navigate('EditGarden')}
            />
            <Image
source={{uri: auth.image}}
style={styles.userImage}
/>
</>
:
            <UserPic
                style={[styles.profile, {marginLeft: 'auto'}]}
                width={40}
                height={40}
                fill={yellow}
                onPress={() => navigation.navigate('SignIn')}
            />

}

        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: "row",
        backgroundColor: green,
        alignItems: 'center',
        marginTop: (StatusBar.currentHeight || 0) + 10,
        width: Layout.window.width - 30,
        marginLeft: 15,
        paddingVertical: 10,
        borderRadius: 10
    },
logo: {
marginLeft: 10,
},
    companyName: {
        fontFamily: fontBold,
        fontSize: 30,
        color: yellow,
        textAlign: 'left',
        marginLeft: 5
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 180,
        marginRight: 10
    },
    profile: {
        marginLeft: 0,
        marginRight: 10
    },
    add: {
        marginLeft: 'auto',
        marginRight: 15,
    }
});

const mapStateToProps = (state: any, props: any) => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        signOut: () => dispatch(signOut()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)