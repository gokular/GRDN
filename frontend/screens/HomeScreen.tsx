import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux';

type thisProps = {
}

function HomeScreen(props: thisProps) {
    return (
        <View style={styles.container}>
            <Text>
                Home
</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)