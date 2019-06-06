import React from 'react';
import {ModalDropdown} from 'react-native';
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
            title="solid button"
            onPress={this.onButtonPress} 
            style={styles.button}
          />
            < <ModalDropdown
              style={{ marginLeft: 50 }}
              ref={el => this._dropdown_5 = el}
              defaultValue=''
              dropdownStyle={{
                borderRadius: 6,
                backgroundColor: "#26344a",
                shadowColor: "rgba(0, 0, 0, 0.2)",
                shadowOffset: {
                  width: 0,
                  height: 5
                },
                shadowRadius: 20,
                shadowOpacity: 1,
                padding: 8
              }}
              dropdownTextStyle={{
                fontFamily: "poppins-500",
                fontSize: 16,
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#ffffff",
                backgroundColor: "#26344a"
              }}
              options={['H1', `H2`, 'H3']}
              onDropdownWillShow={this._dropdown_5_willShow.bind(this)}

            />
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

            </ModalDropdown>
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
        position: "absolute"
    },
    button:{
        marginTop: 300
    }
  });
  