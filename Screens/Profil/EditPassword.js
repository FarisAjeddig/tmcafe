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
    Alert, KeyboardAvoidingView
} from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';
import Api from '../../constants/Api';


export default class EditPassword extends React.Component {

    constructor(props) {
      super(props);

      this.actualPassword = "";
      this.newPassword = "";

      this.state = ({
        id: "",
        modalVisible: false,
        messageError: ""
      })
    }

    componentDidMount() {
      AsyncStorage.getItem('id').then((value) => {
        this.setState({id: value});
      });
    }


    onActualPasswordChange(password){
      this.actualPassword = password;
    }


    onNewPasswordChange(password){
      this.newPassword = password;
    }

    submit() {
      let error = "";
      if (this.actualPassword === "") {
        error += "Mot de passe actuel manquant\n"
      }
      if (this.newPassword === ""){
        error += "Veuillez entrer votre nouveau mot de passe\n";
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
          id: this.state.id,
          actualPassword: this.actualPassword,
          newPassword: this.newPassword
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

      return fetch(Api + '/api/profile/editPassword', data)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);

          switch (responseJson.statut) {
            case 'OK':
              Alert.alert('Les modifications ont bien étés prises en compte');
              this.props.navigation.goBack();
              break;
            default:
              this.setState({messageError: responseJson.message});
              this.setState({modalVisible: true});
          }
        })
        .catch((error) => {
          console.log(error);
          console.error(error);
        });
    }

    render() {
      return (
        <KeyboardAvoidingView behavior="position" enabled>
          <View style={styles.container}>
            <Text>Remplissez ce formulaire pour changer votre mot de passe</Text>
            <PasswordInputText
              value={this.actualPassword}
              iconColor='black'
              autoCapitalize="none"
              autoCorrect={false}
              label="Mot de passe actuel"
              fontSize={20}
              titleFontSize={17}
              textColor='black'
              baseColor='black'
              tintColor='black'
              placeholder="********"
              onChangeText={(password) => this.onActualPasswordChange(password)}
            />
            <PasswordInputText
              value={this.newPassword}
              iconColor='black'
              autoCapitalize="none"
              autoCorrect={false}
              label="Nouveau mot de passe"
              fontSize={20}
              titleFontSize={17}
              textColor='black'
              baseColor='black'
              tintColor='black'
              placeholder="********"
              onChangeText={(password) => this.onNewPasswordChange(password)}
            />

            <TouchableOpacity
              style={{backgroundColor: '#ffc80b',borderRadius: 2,alignSelf: 'center',marginTop: 20,}}
              onPress={() => this.submit()}>
              <View style={{justifyContent:'center'}}>
                <Text style={{justifyContent:'center',color: 'white',paddingTop: 15,paddingBottom: 15,fontSize: 18,marginLeft: 50,marginRight: 50}}>Modifier</Text>
              </View>
            </TouchableOpacity>

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
          </View>
        </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 30,
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
