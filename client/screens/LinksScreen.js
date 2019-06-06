import React from 'react';
import { Icon, ListItem, Button } from 'react-native-elements'
import { Agenda } from 'react-native-calendars'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  // Button,
  Alert,
  TextInput,
} from 'react-native';
import { WebBrowser } from 'expo';
import CountDown from 'react-native-countdown-component';
// import MyView from './MyView';

import {CameraOverlay} from '../components/CameraOverlay';
// import {ReactOverlay} from '../components/CameraOverlay';




export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
    // title: 'Pending Invites',
  };

  constructor() {
    super();
    this.state = {
      timerDone: false,
      displayConnectCard: false,
      visible: false
    }
  }

  sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

  onButtonPress = () => {
    this.setState({
      text: this.state.mimin
    });
  }

  renderItemComponent(item, firstItemInDay) {


    // this.sleep(2000)
    return (<Card style={{
      backgroundColor: '#fbfbfb',
    }}>
      <CardTitle
        title="This is a title"
        subtitle="This is subtitle"
      />
      <CardContent>
        <CountDown
          until={3}
          onFinish={() => this.setState({ timerDone: true })}
          // onPress={() => alert('hello')}
          size={20}
        />
        <Text>{item.key}</Text>
      </CardContent>
      <CardAction
        separator={true}
        inColumn={false}
        style={{
          padding: 5,
        }}>
        <Button type='outline' disabled={!this.state.timerDone} style={{
          flex: 1,
          flexDirection: "row",
          alignItems: 'center',
          backgroundColor: 'grey',
          marginRight: 7,
        }}
          onPress={() => { 
            this.setState({
              visible: true
            })
            // console.log(this.state.visible)
            // alert("LMAO") 
            }
          }
          title="Confirm Catch"
          color="white"
        />
      </CardAction>
    </Card>)
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{
          height: '15%',
          width: '100%',
          backgroundColor: '#15db92',
          alignItems: "center",
          justifyContent: 'center'
        }}>
          <Text style={{
            fontWeight: 'bold',
            color: "white",
            fontSize: 50,
            position: "absolute",
            bottom: 0,
            paddingBottom: 8
          }}>
            CapDex
            </Text>
          <TouchableOpacity style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
          }}>
            <Icon
              reverse
              name='md-sync'
              type='ionicon'
              color='light blue'
              size={25}
            />
          </TouchableOpacity>
        </View>
        {<View style={{
          height: '5%',
          width: '100%',
          flexDirection: "row",
        }}>
          <View style={{
            flex: 1,
            // justifyContent: 'center',
            paddingLeft: 10,
          }}>
            {/* <Button title="Catch" style={{
              flexDirection: "row",
            }} onpress={() => {

              Alert.alert('you pressed the catch button');
            }}> */}
            
            <View style={{
              flex: 1,
              flexDirection: 'row',
              paddingTop: 3,
              paddingBottom: 3,

            }}>
              <TextInput
              style={{ 
                height: 35,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                width: '60%',
              }}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
            />
              <Button
                style = {{
                  paddingLeft: 5,
                }}
                onPress={this._onPressButton}
                title="Catch"
              />
              {/* <Icon
                name='md-add'
                type='ionicon'
                color='#007fff'
                size={20}
                paddingTop={8}
              /> */}
            </View>
          </View>
        </View>}
        {<View style={{
          flexDirection: "row",
          paddingLeft: 10,
          paddingBottom: 4
        }}>
          <Text style={{ fontSize: 20, color: '#2d4150' }}>Your Pending Collegues:</Text>
        </View>}
        {<ScrollView style={{
          backgroundColor: '#f4f4f4'
        }}>
          <FlatList

            data={[
              { key: 'David Bennett' },
            ]}
            // renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
            renderItem={({ item }) => this.renderItemComponent(item)}
          />
        </ScrollView>}
        <CameraOverlay isVisible={this.state.visible}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
