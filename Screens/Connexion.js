import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    Modal,
    TouchableHighlight,
    AsyncStorage,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import {TextField} from 'react-native-material-textfield';
import Api from '../constants/Api';
const { width, height } = Dimensions.get('window')

export default class Connexion extends React.Component {

    constructor(props) {
        super(props);

        this.email = "";
        this.password = "";

        this.state = ({
            email: "",
            password: "",
            modalVisible: false,
            messageError: ""
        })
    }

    async setDataToAsyncStorage(keys, values){
      for (i=0; i<keys.length; i++){
        AsyncStorage.setItem(keys[i], values[i]);
      }
    };

    onMailChange(mail) {
      this.email = mail
    }

    onPassChange(pass) {
      this.password = pass
    }

    submit() {
      let error = "";
      if (this.email === "") {
          error += "Adresse mail manquante\n"
      }
      if (this.password === "") {
          error += "Mot de passe manquant\n";
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
          username: this.email,
          password: this.password
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      };

      return fetch( Api + '/api/login', data)
      .then((response) => response.json())
      .then((responseJson) => {
        switch (responseJson.statut) {
          case 'NOT_FOUND':
            this.setState({messageError: responseJson.message});
            this.setState({modalVisible: true});
            break;
          case 'WRONG_PASSWD':
            this.setState({messageError: responseJson.message});
            this.setState({modalVisible: true});
            break;
          case 'OK':
            let keys = [
                'email',
                'username',
                'id',
              ];
            let values = [
              responseJson.user.email,
              responseJson.user.username,
              responseJson.user.id.toString(),
            ];
            this.setDataToAsyncStorage(keys, values);

            this.props.navigation.navigate('MainHome');
            break;
          default:
            this.setState({messageError: "Réessayez, il y a eu une erreur."});
            this.setState({modalVisible: true});
            break;
          }
        })
      .catch((error) => {
        console.error(error);
      });
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
          <KeyboardAvoidingView behavior="padding" enabled style={{flex: 1}}>
            <ImageBackground
              style={{flex: 1, width, height}}
              source={require('../assets/images/fondecran.jpg')}>

              {/* Modale d'erreur */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {this.setState({modalVisible: false})}}
              >
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
                <Image
                  style={{alignSelf: 'center', width: 160, height: 160, marginTop: 50, marginBottom: 50}}
                  source={{uri: 'https://www.thema-cafe.fr/images/8c64f68.jpg'}}
                />
                <Text style={styles.title}>
                  Connexion
                </Text>
                <View style={{margin: 20}}>

                  <TextField
                    label="Identifiant"
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
                      onChangeText={(password) => this.onPassChange(password)}
                  />

                  <TouchableOpacity
                    style={{backgroundColor: '#ffc80b',borderRadius: 2,alignSelf: 'center',marginTop: 20,}}
                    onPress={() => this.submit()}>
                    <View style={{justifyContent:'center'}}>
                      <Text style={{justifyContent:'center',color: 'white',paddingTop: 15,paddingBottom: 15,fontSize: 18,marginLeft: 50,marginRight: 50}}>CONNEXION</Text>
                    </View>
                  </TouchableOpacity>

                </View>
                <View style={{height: 150}}></View>
              </ScrollView>
            </ImageBackground>
          </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 30,
    },
    title: {
      fontSize: 42,
      textAlign: 'left',
      color: 'white'
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
