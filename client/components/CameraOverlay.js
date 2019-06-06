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
            name: "",
            num: "",
            correct: false,
            inputValue: '',
            // Default Value of the TextInput
            valueForQRCode: 'Anirudh',
            // Default value for the QR Code
        }
    }
        
    handler_overlay() {
        this.setState({
            isVisible: false,
        })
    }
    
    handler_verify(caught) {
        this.setState({
            correct: caught
        })
    }

    onSpecialButtonPress = ()=>this.setState({
        isVisible: true
    })

    render() {
        return (
          <View >
          <Button
            title="Scan QR Code after a conversation!"
            onPress={this.onSpecialButtonPress} 
            style={styles.button}
          />
            <Overlay
                isVisible={this.state.isVisible}
                onBackdropPress={() => this.setState({ isVisible: false })}
                style={styles.modal}
                transparent={true}
                // backgroundColor="purple"
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
                <BarcodeScannerExample 
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
        position: "absolute",
        paddingTop: 100,
        marginTop: 100
    },
    button:{
        marginTop: 300
    }
  });
  