import React from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux';

type thisProps = {
}

function BlankFunctional(props: thisProps) {
    return (
        <View style={styles.container}>
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

export default connect(mapStateToProps, mapDispatchToProps)(BlankFunctional)