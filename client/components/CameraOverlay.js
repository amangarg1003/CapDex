import React from 'react';
import { Overlay } from 'react-native-elements';
import {BarcodeScannerExample} from '../components/BarcodeScannerExample';
import QRCode from 'react-native-qrcode';
import { StyleSheet, View, TextInput, TouchableOpacity, Text,} from 'react-native';



export class CameraOverlay extends React.Component{

    constructor(props){
        super(props)

        this.handler_overlay = this.handler_overlay.bind(this)
        this.handler_verify = this.handler_verify.bind(this)

        this.state={
            isVisible:true,
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

    render() {
        return (
          < View style={styles.container}>
            <Overlay
                isVisible={this.state.isVisible}
                onBackdropPress={() => this.setState({ isVisible: false })}
                style={styles.container}
            >
                <QRCode
                    value={this.state.valueForQRCode}
                    //Setting the value of QRCode
                    size={100}
                    //Size of QRCode
                    bgColor="#000"
                    //Backgroun Color of QRCode
                    fgColor="#fff"
                    //Front Color of QRCode
                />
                <Text>Hello from Overlay!</Text>
                <BarcodeScannerExample 
                    handler_overlay = {this.handler_overlay}
                    handler_verify = {this.handler_verify}
                />

            </Overlay>
          </View>
            //    <BarcodeScannerExample style={styles.container}
            //         handler_overlay = {this.handler_overlay}
            //         handler_verify = {this.handler_verify}
            //     />
        );
      
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
  });
  