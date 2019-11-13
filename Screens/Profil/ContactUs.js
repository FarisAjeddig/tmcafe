import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
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
    Linking,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import Api from '../../constants/Api';


export default class ContactUs extends React.Component {
  constructor(props) {
    super(props);

    this.message = "";

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

  onMessageChange(message){
    this.message = message;
  }

  submit() {
    if (this.message === "") {
      this.setState({messageError: "Vous n'avez pas rempli le champ\n"});
      this.setState({modalVisible: true});
      return [];
    } else {
      return (this.submitToAPI());
    }
  }

  submitToAPI() {
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        id: this.state.id,
        subject: "[Mobile App]",
        message: this.message
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return fetch(Api + '/api/contact', data)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

        switch (responseJson.statut) {
          case 'OK':
            Alert.alert('Le message a bien été envoyé');
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
      <KeyboardAvoidingView behavior="position" style={styles.container} enabled>
        <ScrollView>
          <Text style={styles.title}>Nos coordonnées</Text>
          <Text style={styles.coordonates} onPress={() => Linking.openURL('mailto:bastardie.eric@orange.fr')}>bastardie.eric@orange.fr</Text>
          <Text style={styles.coordonates} onPress={() => Linking.openURL('tel:+33618418257')}>06 18 41 82 57</Text>
          <View></View>

          <Text style={styles.title}>Formulaire de contact</Text>
          <Text style={{paddingLeft: 20}}>Votre message</Text>
          <TextInput
            style={styles.textArea}
            onChangeText={(message) => this.onMessageChange(message)}
            underlineColorAndroid="transparent"
            placeholder="Votre message ici"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />

          <TouchableOpacity
            style={{backgroundColor: '#ffc80b',borderRadius: 2,alignSelf: 'center',marginTop: 20,}}
            onPress={() => this.submit()}>
            <View style={{justifyContent:'center'}}>
              <Text style={{justifyContent:'center',color: 'white',paddingTop: 15,paddingBottom: 15,fontSize: 18,marginLeft: 50,marginRight: 50}}>Envoyer</Text>
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    headerProfil: {
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: "#58d3ce",
      alignSelf: 'stretch',
    },
    title:{
      fontSize: 25,
      fontWeight: 'bold',
      paddingLeft: 50,
      paddingTop: 30,
      paddingBottom: 30
    },
    coordonates:{
      paddingLeft: 25,
      fontSize: 18,
      color: '#cdaf52'
    },
    textArea: {
      borderColor: 'grey',
      borderWidth: 1,
      height: 150,
      marginLeft: 30,
      marginRight: 30,
      marginTop: 30,
      paddingLeft: 20,
      paddingRight: 20
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
