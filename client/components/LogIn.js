import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon, Google, AuthSession } from 'expo';
import { Button } from 'react-native-elements';

const apiKey = 'AIzaSyCCU1JbRgNKl2q1_f8V9zPaUj9EW_ZNBSw';
const IOS_CLIENT_ID = "209498689625-4v4g1fqfm42gpdpj8jp2hbuhu57c87m3.apps.googleusercontent.com";
const CLIENT_SECRET = "LGyjUPjeUIT69HowjElnZJGZ";

export default class LogIn extends React.Component {
    constructor(props) {
        super(props);
    }

    async logIn() {
        try {
            const result = await Expo.Google.logInAsync({
                clientId: IOS_CLIENT_ID,
                scopes: ["https://www.googleapis.com/auth/calendar.events", "email", "profile"]
            })

            if (result.type === "success") {
                this.props.loginSuccess(result);
            } else {
                console.log("cancelled");
            }

        } catch (e) {
            console.log("error", e);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>M</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Login"
                        onPress={() => this.logIn()}
                        type='clear'
                        titleStyle={{color: '#F4B400', fontWeight: 'bold', fontSize: 22}}
                        // buttonStyle={{backgroundColor: '#F4B400'}}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 150,
        fontWeight: 'bold',
        color: '#15db92'
    },
    buttonContainer: {
        width: 100,
        paddingTop: 75
    }
})

