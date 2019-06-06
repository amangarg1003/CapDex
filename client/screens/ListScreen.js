import React from 'react';
import { Icon, ListItem } from 'react-native-elements'
import { Agenda } from 'react-native-calendars'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import {
  Image,
    Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { WebBrowser } from 'expo';

export default class ListScreen extends React.Component {
  static navigationOptions = {
    header: null,
    // title: 'Pending Invites',
  };

  constructor(props) {
    super(props);
    this.state = {
      people1: [],
      caught: []
    }

  }

  componentDidMount() {
      fetch('https://80hj0816wb.execute-api.us-east-2.amazonaws.com/prod2/cae-manager', {
        method: 'POST',
        body: JSON.stringify({
          operation: "list",
          tableName: "People",
          payload: {}
        }),
      }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson.Items[0].Person_id);
            this.setState({
                  people1: responseJson.Items
                }
            )
    });
      return fetch('https://80hj0816wb.execute-api.us-east-2.amazonaws.com/prod2/cae-manager', {
        method: 'POST',
        body: JSON.stringify({
          operation: "read",
          tableName: "Caught",
          payload: {
            Key : {
              "Person_id" : 0//this.props.Person_id
            }
          }
        }),
      }).then((response) => response.json())
          .then((responseJson) => {
            console.log("2nd " + responseJson.Item.Pcaught[0]);
            this.setState({
                  caught: responseJson.Item.Pcaught
                }
            )
          });
  }

  render() {
    this.state.people1.sort((a,b) => (a.Person_id > b.Person_id) ? 1 : ((b.Person_id > a.Person_id) ? -1 : 0));
    return (
      <View style={styles.container}>
        <View style={{
          height: '15%',
          width: '100%',
          backgroundColor: '#004977',
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
        </View>
        <ScrollView>

          {
            this.state.people1.map((personinfo) => {

            if (this.state.caught.includes(personinfo.Person_id)) {
              // noinspection BadExpressionStatementJS
              return <TouchableOpacity onPress={()=>{console.log("pressed")}}><Card style={{
                backgroundColor: '#fbfbfb',
              }}>
                <View style={{flexDirection:"row"}}>
                  <View style={{flex:1}}>

                    <CardTitle style={{
                      "font-size": "50px",
                    }}
                        title={<Text style={{"fontFamily": "eightbit"}}>{('000' + personinfo.Person_id).substr(-3)}</Text>}
                        subtitle={<Text style={{"fontFamily": "eightbit"}}>{personinfo.Person_name}</Text>}
                    />
                  </View>
                  <View style={{flex:1}}>
                    <CardContent>
                      <View>
                        <Image style={{
                          width: 100,
                          height: 100,
                          borderRadius: 50,
                          borderColor: '#fff',
                          borderWidth: 4,
                        }} source={{uri: personinfo.image_url}} alt={""}/>
                      </View>
                    </CardContent>
                  </View>
                </View>


                <CardAction
                    separator={true}
                    inColumn={false}
                    style={{
                      padding: 5,
                    }}>
                  <CardButton style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: 'center',
                    backgroundColor: '#004977',
                  }}
                              onPress={() => {
                                Linking.openURL("mailto:" + personinfo.email);
                              }}
                              title="Email"
                              color="white"
                  />
                </CardAction>
              </Card></TouchableOpacity>
            } else {

              // noinspection BadExpressionStatementJS
              return <Card style={{
                backgroundColor: '#fbfbfb',
              }}>
                <CardTitle
                    title={<Text style={{"fontFamily": "eightbit"}}>{('000' + personinfo.Person_id).substr(-3)}</Text>}
                    subtitle={<Text style={{"fontFamily": "eightbit"}}>XXXXXXX</Text>}
                />
              </Card>
            }


          })}


        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004977',
  },
});
