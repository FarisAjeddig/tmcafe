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
    ScrollView,
    Alert
} from 'react-native';

import PasswordInputText from 'react-native-hide-show-password-input';
import {TextField} from 'react-native-material-textfield';

export default class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.password = "",
    this.state = ({
      username: "",
      email: "",
      password:"",
      messageError: "",
      modalVisible: false
    })
  }

  async setDataToAsyncStorage(keys, values){
    for (i=0; i<keys.length; i++){
      AsyncStorage.setItem(keys[i], values[i]);
    }
  };

  componentDidMount = () => {
    let keys = ['username', 'email', 'id'];
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.map((result, i, store) => {
        switch (store[i][0]) {
          case 'username':
            this.setState({username: store[i][1]})
            this.username = store[i][1];
            break;
          case 'email':
            this.setState({email: store[i][1]})
            this.email = store[i][1];
            break;
          case 'id':
            this.setState({id : store[i][1]})
            break;
          default:
            break;
        }
      })
    })
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
      error += "Vous ne pouvez pas laisser l'adresse mail vide\n"
    }
    if (this.username === ""){
      error += "Vous ne pouvez pas laisser le pseudo vide\n";
    }
    if (this.password === "") {
      error += "Mot de passe nécessaire pour valider les modifications\n";
    }
    console.log(error);
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
        email: this.email,
        username: this.username,
        password: this.password
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return fetch('https://www.thema-cafe.fr/api/profile/edit', data)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

        switch (responseJson.statut) {
          case 'OK':
            let keys = [
                'email',
                'username'
              ];
            let values = [
              this.email,
              this.username
            ];
            this.setDataToAsyncStorage(keys, values);
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

        <ScrollView style={styles.container2}>

        <TextField
          label="Nouveau pseudo"
          autoCapitalize="none"
          autoCorrect={false}
          textColor='black'
          baseColor='black'
          tintColor='black'
          fontSize={20}
          titleFontSize={17}
          onChangeText={(username) => this.onUsernameChange(username)}
          value={this.username}
          defaultValue={this.state.username}
          placeholder="Ex: thema12"
          keyboardType='email-address'
        />

        <TextField
          label="Nouvelle adresse mail"
          autoCapitalize="none"
          autoCorrect={false}
          textColor='black'
          baseColor='black'
          tintColor='black'
          fontSize={20}
          titleFontSize={17}
          onChangeText={(email) => this.onMailChange(email)}
          defaultValue={this.state.email}
          value={this.email}
          placeholder="example@gmail.com"
          keyboardType='email-address'
        />

        <PasswordInputText
            value={this.password}
            iconColor='black'
            autoCapitalize="none"
            autoCorrect={false}
            label="Entrez votre mot de passe pour valider les modifications"
            fontSize={20}
            titleFontSize={17}
            textColor='black'
            baseColor='black'
            tintColor='black'
            placeholder="********"
            onChangeText={(password) => this.onPasswordChange(password)}
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

      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    container2: {
        // flex: 1,
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
