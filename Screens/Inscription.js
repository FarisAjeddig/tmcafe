import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Modal,
    TouchableHighlight,
    AsyncStorage,
    BackHandler,
    ToastAndroid,
    SectionList,
    DatePickerIOS,
    Picker, CheckBox, Button,
    Dimensions, ScrollView, Alert
} from 'react-native';
import {Icon, FormLabel, FormInput, FormValidationMessage} from 'expo';
import PasswordInputText from 'react-native-hide-show-password-input';
import {TextField} from 'react-native-material-textfield';
// let FloatingLabel = require('react-native-floating-labels');
// import DatePicker from 'react-native-datepicker'
const { width, height } = Dimensions.get('window')



export default class Inscription extends React.Component {
    constructor(props) {
        super(props);

        this.email="";
        this.password = "";
        this.username="";

        this.state = ({
          modalVisible: false,
          messageError: ""
        });
    }

    onMailChange(mail){
      this.email = mail;
    }

    onPasswordChange(password){
      this.password = password;
    }

    onUsernameChange(username){
      this.username = username;
    }

    submit() {
      let error = "";
      if (this.email === "") {
        error += "Adresse mail manquante\n"
      }
      if (this.password === "") {
        error += "Mot de passe manquant\n";
      }
      if (this.username === ""){
        error += "Pseudo manquant\n";
      }
      if (error === "") {
        return (this.submitToAPI());
      }
      else {
        this.setState({messageError: error});
        this.setState({modalVisible: true});
        return [];
      }
    }

    submitToAPI() {
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          email: this.email,
          username: this.username,
          password: this.password
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      return fetch('https://www.thema-cafe.fr/api/register', data)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);

          if (responseJson.statut == "ALREADY_EXIST"){
            this.setState({messageError: responseJson.message});
            this.setState({modalVisible: true});
          } else if (responseJson.statut == "OK") {
            Alert.alert(responseJson.message)
          }

          })
        .catch((error) => {
          console.log(error);
          console.error(error);
        });
    }

    render () {
        return (
            <ImageBackground
              style={{flex: 1, width, height}}
              source={{uri: 'https://dev.beeshary.com/restBeewe2/img/leatherWorkBlur.jpg'}}>
              {/* Modale d'erreur */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {this.setState({modalVisible: false})}}>
                <View style={styles.modalErr}>
                  <View style={styles.modalErr2}>
                    <Text style={{fontSize:20, fontWeight: 'bold'}}>Erreur</Text>
                    <Text>{this.state.messageError}</Text>
                    <TouchableHighlight
                      style={styles.btnOkModal}
                      onPress={() => this.setState({modalVisible: false})}>
                      <Text style={{textAlign: 'center', color: 'white', paddingTop: 15, paddingBottom: 15}}>OK</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
              <ScrollView style={styles.container}>
                <Text style={styles.Title}>Inscription</Text>

                <TextField
                  label="Pseudo"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textColor='white'
                  baseColor='white'
                  tintColor='white'
                  fontSize={20}
                  titleFontSize={17}
                  onChangeText={(username) => this.onUsernameChange(username)}
                  value={this.username}
                  placeholder="Ex: thema12"
                  keyboardType='email-address'
                />

                <TextField
                  label="Adresse mail"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textColor='white'
                  baseColor='white'
                  tintColor='white'
                  fontSize={20}
                  titleFontSize={17}
                  onChangeText={(email) => this.onMailChange(email)}
                  value={this.mail}
                  placeholder="example@gmail.com"
                  keyboardType='email-address'
                />
                <Text style={{color: '#cdaf52', fontSize: 10}}>(Vous recevrez un e-mail pour activer votre compte)</Text>

                <PasswordInputText
                    value={this.password}
                    iconColor='white'
                    autoCapitalize="none"
                    autoCorrect={false}
                    label="Mot de passe"
                    fontSize={20}
                    titleFontSize={17}
                    textColor='white'
                    baseColor='white'
                    tintColor='white'
                    placeholder="********"
                    onChangeText={(password) => this.onPasswordChange(password)}
                />


                <TouchableOpacity
                  style={{backgroundColor: '#ffc80b',borderRadius: 2,alignSelf: 'center',marginTop: 20,}}
                  onPress={() => this.submit()}>
                  <View style={{justifyContent:'center'}}>
                    <Text style={{justifyContent:'center',color: 'white',paddingTop: 15,paddingBottom: 15,fontSize: 18,marginLeft: 50,marginRight: 50}}>S'inscrire</Text>
                  </View>
                </TouchableOpacity>

                <Text style={{marginTop: 30, color: 'white', textAlign: 'center'}}>En vous inscrivant, vous acceptez que THEMA CAFÉ MONTPELLIER utilise votre adresse email pour vous envoyer des invitations à de prochaines soirées</Text>
              </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
        sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
        Title: {
        fontSize: 38,
        //fontFamily: 'Lato-Regular',
        color: 'white',
        marginLeft: 10,
        marginTop: 30
    },
        container: {
          flex: 1,
          paddingLeft: 40,
          paddingRight: 40,
          paddingTop: 30,
    },
        labelInput: {
        color: '#FFFFFF',
    },
        formInput: {
        // width: {width / 2},
        borderBottomWidth: 1.5,
        marginLeft: 20,
        borderColor: '#FFFFFF',
    },
        input: {
        color: "white",
        borderWidth: 0,
    },
        genderDateView: {
        flexDirection: 'row',
        paddingTop: 15,
        alignItems: 'center',
    },
        GenderPicker: {
        height: 50,
        color: 'white',
        alignItems: 'center',
        flex: 1,
    },
        checkBox: {
    },
        NewsLetter: {
            color: 'white',
            paddingTop: 5,
    },
    btnCreate: {
        backgroundColor: '#ffc80b',
        height: 50,
        borderRadius: 3,
        paddingTop: 11,
        marginTop: 15,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        width: 350,
    },
    btnLater: {
        backgroundColor: 'grey',
        height: 50,
        borderRadius: 3,
        paddingTop: 11,
        marginTop: 15,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        width: 350,
    },

    containerBtn: {
        alignItems: 'center',
    },
    TextBtn: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff'
    },
    modalErr: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        paddingLeft: 60,
        paddingRight: 60
    },
    modalErr2: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 10,
        paddingLeft: 10
    },
    btnOkModal: {
        backgroundColor: "#0011af",
        alignSelf: 'stretch',
        marginRight: 20,
        marginLeft: 20,
    }
});
