import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import LogIn from './components/LogIn';
import axios from 'axios';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoadingComplete: false,
      signedIn: false
    };
  }

  async componentWillMount() {
    const token = await AsyncStorage.getItem("token");
    if(token != null && token != "{}"){
      var fetchToken = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + token;
      try{
        let response = await fetch(fetchToken);
        let jsonResp = await response.json();
        if(!("error" in jsonResp) && !("error_description" in jsonResp)){
          this.setState({
            ...this.state,
            signedIn: true
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  loginSuccess = async (result) => {
    await AsyncStorage.setItem("token", result.accessToken); 
    this.setState({
      ...this.state,
      signedIn: true
    })
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else if (!this.state.signedIn){
      return (
        <LogIn loginSuccess = {result => this.loginSuccess(result)} />
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
