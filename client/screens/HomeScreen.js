import React from 'react';
import { Icon } from 'react-native-elements'
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
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          '2012-05-22': [{ text: 'item 1 - any js object' }],
          '2012-05-23': [{ text: 'item 2 - any js object' }],
          '2012-05-24': [],
          '2012-05-25': [{ text: 'item 3 - any js object' }, { text: 'any js object' }],
        }],
      selected: '2019-02-16',
      Job_Title: "",
      Person_id: -1,
      Email: "",
      Image_Url: "",
      Person_Name: "",
      Count: 1,
      ScannedCount: 1
    }
  }
  componentDidMount() {
    return fetch('https://80hj0816wb.execute-api.us-east-2.amazonaws.com/prod2/cae-manager', {
      method: 'POST',
      body: JSON.stringify({
        operation: "query",
        tableName: "People",
        payload: {
          value: "Alan Ward"
        }
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          // Items: responseJson.Items,
          Job_Title: responseJson.Items[0]["job_title"],
          Person_id: responseJson.Items[0]["Person_id"],
          Email: responseJson.Items[0]["email"],
          Image_Url: responseJson.Items[0]["image_url"],
          Person_Name: responseJson.Items[0]["Person_name"],
          Count: responseJson.Count,
          ScannedCount: responseJson.ScannedCount
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }



  renderItemComponent(item, firstItemInDay) {

    return (<Card style={{
      backgroundColor: '#fbfbfb',
    }}>
      <CardTitle
        title="This is a title"
        subtitle="This is subtitle"
      />
      <CardContent>
        <Text>{item.text}</Text>
      </CardContent>
      <CardAction
        separator={true}
        inColumn={false}
        style={{
          padding: 5,
        }}>
        <CardButton style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#004977',
          width: '30%',
        }}
          onPress={() => { }}
          title="Push"
          color="blue"
        />
        <CardButton style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#004977',
          width: '30%',
          marginRight: 7,
        }}
          onPress={() => { }}
          title="Later"
          color="blue"
        />
      </CardAction>
    </Card>)
  }

  render() {
    return (
      < View style={styles.container}>
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
        <View style={styles.calendarContainer}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.profpicwrap}>
                <Image style={styles.profpic} source={{uri: this.state.Image_Url}} />
              </View>

            </View>
            <View style={styles.about}>
              <Text style={styles.name}>{this.state.Person_Name}</Text>
              <Text style={styles.pos}>{this.state.Job_Title}</Text>
              <Text></Text>
              <Text style={styles.fact}>Lives under the sea</Text>
              <Text style={styles.fact}>Under constant danger of being eaten by a sunflower starfish</Text>
              <Text style={styles.fact}>Skeletons of his kind wash up on shore regularly</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }


  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#11e3ff",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    // backgroundColor: "orange",
    width: '80%',
    height: '20%',
    paddingBottom: 50,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#007fff',
    borderRadius: 4,
  },
  buttonText: {
    padding: 4,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  calendarContainer: {
    alignItems: 'center',
    marginBottom: 50,
    height: '95%',
    width: '95%',
    // backgroundColor: "purple"
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  profpic: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: '#fff',
    borderWidth: 4,
  },
  profpicwrap: {
    width: '80%',
    height: '50%',
    borderRadius: 100,
    // backgroundColor: "orange"
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  pos: {
    fontSize: 14,
    fontWeight: '300',
    fontStyle: 'italic',

  },
});
