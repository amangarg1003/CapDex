import React from 'react';
import {Modal} from 'react-native';
import {Button, Overlay } from 'react-native-elements';
import {BarcodeScannerExample} from '../components/BarcodeScannerExample';
import QRCode from 'react-native-qrcode';
import { StyleSheet, View, TextInput, TouchableOpacity, Text,} from 'react-native';



export class CameraOverlay extends React.Component{

    constructor(props){
        super(props)

        this.handler_overlay = this.handler_overlay.bind(this)
        this.handler_verify = this.handler_verify.bind(this)

        this.state={
            isVisible: props.isVisible,
            // name: this.props.name,
            name: "Rich Fairbank",
            num: "",
            correct: false,
            inputValue: '',
            // Default Value of the TextInput
            valueForQRCode: '',
            // Default value for the QR Code
            verified: false,
            Pcaught: [],
            id: -1
        }
    }
        
    handler_overlay() {
        this.setState({
            // isVisible: false,
            // verified: true

        })
    }
    
    handler_verify(caught) {
        this.setState({
            // isVisible: false, //gotta make a separate button handler
            correct: caught,
            verified: true

        })
        caught=true
        if(caught==true){
            this.setState({
                // isVisible: false,
                verified: true
    
            })
        // this.onSpecialSadButtonPress()        

        let id = 0;
        let Pcaught = []

        fetch('https://80hj0816wb.execute-api.us-east-2.amazonaws.com/prod2/cae-manager', {
            method: 'POST',
            body: JSON.stringify({
              operation: "query",
              tableName: "People",
              payload: {
                value: "David Bennett"
              }
            }),
          }).then((response) => response.json())
            .then((responseJson) => {
              
                id= responseJson.Items[0].Person_id
              
      
      
            })
            .catch((error) => {
              console.error(error);
            });
        
        fetch('https://80hj0816wb.execute-api.us-east-2.amazonaws.com/prod2/cae-manager', {
            method: 'POST',
            body: JSON.stringify({
                "operation": "read",
                "tableName": "Caught",
                "payload": {
                "Key": {
                "Person_id": id
                }
                }
                }),
          }).then((response) => response.json())
            .then((responseJson) => {
              
                Pcaught= responseJson.Pcaught
              
      
      
            })
            .catch((error) => {
              console.error(error);
            });

        Pcaught.push(id);

        fetch('https://80hj0816wb.execute-api.us-east-2.amazonaws.com/prod2/cae-manager', {
            method: 'POST',
            body: JSON.stringify({
                "operation": "update",
                "tableName": "Caught",
                "payload": {
                "Key": {
                "Person_id": id
                },
                "UpdateExpression": "set Pcaught = :val1",
                "ExpressionAttributeValues": {
                ":val1": Pcaught
                }
                }
                }),
          })
            .catch((error) => {
              console.error(error);
            });
    }

    }

    onSpecialButtonPress = ()=>this.setState({
        isVisible: true
    })

    onSpecialSadButtonPress = ()=>this.setState({
        isVisible: false
    })

    render() {
        return (
          <View >
          <Button
            title="Scan QR Code after a conversation!"
            onPress={this.onSpecialButtonPress} 
            style={styles.fixed_button}
          />
            <Overlay
                isVisible={this.state.isVisible}
                onBackdropPress={() => this.setState({ isVisible: false })}
                style={styles.modal}
                transparent={true}
                // overlayBackgroundColor="red"
                // windowBackgroundColor="red"
            >
                <QRCode
                    value={this.state.valueForQRCode}
                    //Setting the value of QRCode
                    size={250}
                    //Size of QRCode
                    bgColor="#000"
                    //Backgroun Color of QRCode
                    fgColor="#fff"
                    //Front Color of QRCode
                />
                <Text>^ Your Code ^  v Scan your new friend v</Text>
                <Text>{this.state.name}</Text>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                    <Button
                        title="X"
                        onPress={this.onSpecialSadButtonPress} 
                        style={styles.button_in}
                    />
                    </View>
                    <View style={{flex:1}}>
                    <Button
                        title="Verified"
                        disabled={!this.state.verified}
                        onPress={this.handler_verify} 
                        style={styles.button_in}
                    />
                    </View>
                </View>
                <BarcodeScannerExample 
                    name = {this.state.name}
                    handler_overlay = {this.handler_overlay}
                    handler_verify = {this.handler_verify}
                />

            </Overlay>
          </View>
        );
      
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
    },
    modal: {
        // position: "absolute",
        paddingTop: 50,
        marginTop: 50,
        backgroundColor: "red"
    },
    button:{
        marginTop: 300
    },
    button_in:{
        marginTop: 10
    },
    fixed_button:{
        // position: 'absolute'
    }
  });
  