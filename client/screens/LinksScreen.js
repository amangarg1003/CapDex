import React from 'react';
import { Icon, ListItem } from 'react-native-elements'
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
} from 'react-native';
import { WebBrowser } from 'expo';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
    // title: 'Pending Invites',
  };


  renderItemComponent(item, firstItemInDay) {

    return (<Card style={{
      backgroundColor: '#fbfbfb',
    }}>
      <CardTitle
        title="This is a title"
        subtitle="This is subtitle"
      />
      <CardContent>
        <Text>{item.key}</Text>
      </CardContent>
      <CardAction
        separator={true}
        inColumn={false}
        style={{
          padding:5,
        }}>
        <CardButton style={{
          flex: 1,
          flexDirection: "row",
          alignItems: 'center',
          backgroundColor: '#15db92',
        }}
          onPress={() => { }}
          title="Push"
          color="blue"
        />
        <CardButton style={{
          flex: 1,
          flexDirection: "row",
          alignItems: 'center',
          backgroundColor: '#15db92',
          marginRight:7,
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
            APP NAME
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
        {/* <View style={{
          height: '5%',
          width: '100%',
          flexDirection: "row",
        }}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft:10,
          }}>
            <TouchableOpacity style={{
              flexDirection: "row",
            }}>
              <Text style={{ fontSize: 20, color:'#2d4150'}}>Invite</Text>
              <Icon
                name='md-add'
                type='ionicon'
                color='#007fff'
                size={20}
                paddingLeft={7}
                paddingTop={4}
              />
            </TouchableOpacity>
          </View>
        </View> */}
        {/* <View style={{
          flexDirection: "row",
          paddingLeft:10,
          paddingBottom:4
        }}>
          <Text style={{ fontSize: 20, color:'#2d4150'}}>Your Pending Invitations:</Text>
          <Text style={{
            fontSize:20,
            color:'#b4b4b4'
          }}>(8)</Text>
        </View> */}
        {/* <ScrollView style={{
          backgroundColor:'#f4f4f4'
        }}>
          <FlatList
            data={[
              { key: 'Devin' },
              { key: 'Jackson' },
              { key: 'James' },
              { key: 'Joel' },
              { key: 'John' },
              { key: 'Jillian' },
              { key: 'Jimmy' },
              { key: 'Julie' },
            ]}
            // renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
            renderItem={({item}) => this.renderItemComponent(item) }
          />
        </ScrollView> */}
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
