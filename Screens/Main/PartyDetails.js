import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Image, Alert,
    Linking, TextInput,
    KeyboardAvoidingView
} from 'react-native';
import HTML from 'react-native-render-html';
import Api from '../../constants/Api';

const { width, height } = Dimensions.get('window')


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.numberPlaceTotal= 0;
    this.numberPlaceAperoConf= 0;
    this.numberPlaceAperoDinerParty= 0;
    this.numberPlacePartyOnly= 0;

    this.state = {
      party: {
        desc: '<p>Chargement...</p>'
      }
    }
  }

  componentDidMount = () => {
    let id = this.props.navigation.getParam('id');
    return fetch(Api + '/api/party/' + id )
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({party: responseJson})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  submit(){
    if (this.numberPlaceTotal + this.numberPlaceAperoConf + this.numberPlaceAperoDinerParty + this.numberPlacePartyOnly <= 0){
      Alert.alert('Vous n\'avez sélectionné aucune place');
    } else if (this.numberPlaceTotal > this.state.party.number_places_total || this.numberPlaceTotal < 0 ||
      this.numberPlaceAperoConf > this.state.party.number_places_apero_conf || this.numberPlaceAperoConf < 0 ||
      this.numberPlaceAperoDinerParty > this.state.party.number_places_apero_diner_party || this.numberPlaceAperoDinerParty < 0 ||
      this.numberPlaceAperoConf > this.state.party.number_places_apero_conf || this.numberPlaceAperoConf < 0
    ) {
      Alert.alert('Le nombre de place(s) sélectionné n\'est pas disponible. \n');
    } else {
      this.props.navigation.navigate('BookPlaces', {
        id: this.props.navigation.getParam('id'),
        placeTotal: this.numberPlaceTotal,
        placeAperoConf: this.numberPlaceAperoConf,
        placeAperoDinerParty: this.numberPlaceAperoDinerParty,
        placePartyOnly: this.numberPlacePartyOnly
      });
    }
  }

  render(){
    const { width, height } = Dimensions.get('window')
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView style={{flexDirection: 'column', width: width}}>
          <Image
            style={{width: width, height: 250}}
            source={{uri: Api + '/uploads/pictures/' + this.state.party.picture}}
          />
          <Text style={{fontSize: 20, color: 'rgba(70, 70, 70, 0.72)', marginLeft: 20, marginTop: 20, marginBottom: 20}}>{this.state.party.name}</Text>

          <View style={{marginLeft: 15, marginRight: 15}} >
            <HTML
            html={this.state.party.desc}
            imagesMaxWidth={Dimensions.get('window').width}
            imagesInitialDimensions={{width: Dimensions.get('window').width-30, height: Dimensions.get('window').width-30}}
            onLinkPress={(event, href)=>{
              Linking.openURL(href)
            }}
            />
          </View>

          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 0.5,
              marginBottom: 15,
              marginTop: 15
            }}
          />

          <Text style={{fontSize: 20, color: 'rgba(70, 70, 70, 0.72)', marginLeft: 20, marginTop: 20, marginBottom: 20}}>Réservez vos places</Text>
          <View style={{marginLeft: 10, marginRight: 10, paddingBottom: 20}}>
            <Text>Il existe différents forfaits pour les événements que l'on organise :</Text>
            {(this.state.party.price > 0 && this.state.party.number_places_total > 0) ?
            <View style={styles.forfaitView}>
              <Text style={{flex: 7}}>{this.state.party.type_event == null ? 'Toute la soirée :' : 'Une personne (un rôle danseur ou 1 rôle danseuse)' } ({this.state.party.price}€) - {this.state.party.number_places_total} places restantes</Text>
              <TextInput onChangeText={(number) => {this.numberPlaceTotal = number}} maxLength={2} keyboardType="numeric" defaultValue="0" style={styles.inputNumberPlaces} />
            </View>
            : <View></View>}
            {(this.state.party.price_apero_conf > 0 && this.state.party.number_places_apero_conf > 0) ?
              <View style={styles.forfaitView}>
                <Text style={{flex: 7}}>{this.state.party.type_event == null ? 'Conférence et apéritif :' : 'Un couple (un rôle danseur + 1 rôle danseuse)' } ({this.state.party.price_apero_conf}€) - {this.state.party.number_places_apero_conf} places restantes </Text>
                <TextInput onChangeText={(number) => {this.numberPlaceAperoConf = number}} maxLength={2} keyboardType="numeric" defaultValue="0" style={styles.inputNumberPlaces} />
              </View>
              : <View></View>}
              {(this.state.party.price_apero_diner_party > 0 && this.state.party.number_places_apero_diner_party > 0) ?
            <View style={styles.forfaitView}>
              <Text style={{flex: 7}}>Apéritif, dîner et soirée dansante : ({this.state.party.price_apero_diner_party}€) - {this.state.party.number_places_apero_diner_party} places restantes </Text>
              <TextInput onChangeText={(number) => {this.numberPlaceAperoDinerParty = number}} maxLength={2} keyboardType="numeric" defaultValue="0" style={styles.inputNumberPlaces} />
            </View>
            : <View></View>}
            {(this.state.party.price_party_only > 0 && this.state.party.number_places_party_only > 0) ?
            <View style={styles.forfaitView}>
              <Text style={{flex: 7}}>Soirée dansante uniqument : ({this.state.party.price_party_only}€) - {this.state.party.number_places_party_only} places restantes </Text>
              <TextInput onChangeText={(number) => {this.numberPlacePartyOnly = number}} maxLength={2} keyboardType="numeric" defaultValue="0" style={styles.inputNumberPlaces} />
            </View>
            : <View></View>}
            <TouchableOpacity
              style={{backgroundColor: '#ffc80b',borderRadius: 2,alignSelf: 'center',marginTop: 20,}}
              onPress={() => this.submit()}>
              <View style={{justifyContent:'center'}}>
                <Text style={{justifyContent:'center',color: 'white',paddingTop: 15,paddingBottom: 15,fontSize: 18,marginLeft: 50,marginRight: 50}}>Réserver</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      flexDirection:'column'
  },
  forfaitView: {
    flexDirection: 'row',
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
  inputNumberPlaces: {
    flex: 1,
    borderWidth: 0.5,
    textAlign: 'center',
    paddingLeft: 10
  }
});
