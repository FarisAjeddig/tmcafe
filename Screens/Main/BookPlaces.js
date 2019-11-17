import React from 'react';
import {
    StyleSheet,
    Text,
    View, ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage, Alert,
    KeyboardAvoidingView
} from 'react-native';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import Api from '../../constants/Api';
import Stripe from '../../constants/Stripe';


export default class BookPlaces extends React.Component {
    constructor(props) {
        super(props);
        this.placeTotal = 0;
        this.placeAperoConf = 0;
        this.placeAperoDinerParty = 0;
        this.placePartyOnly = 0;
        this.state = ({
          party: {},
          amount: 0
        })
    }

    _onChange = (formData) => {
      this.dataCard = formData
    };
    _onFocus = (field) => console.log("focusing", field);


    componentDidMount = () => {
      AsyncStorage.getItem('email').then((value) => {
        this.email = value;
      });
      AsyncStorage.getItem('id').then((value) => {
        this.idUser = value;
      });

      this.id = this.props.navigation.getParam('id');
      this.placeTotal = this.props.navigation.getParam('placeTotal');
      this.placeAperoConf = this.props.navigation.getParam('placeAperoConf');
      this.placeAperoDinerParty = this.props.navigation.getParam('placeAperoDinerParty');
      this.placePartyOnly = this.props.navigation.getParam('placePartyOnly');


      return fetch(Api + '/api/party/' + this.id )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({party: responseJson})
        this.amount = 100 * (this.placeTotal * this.state.party.price + this.placeAperoConf * this.state.party.price_apero_conf +
        this.placeAperoDinerParty * this.state.party.price_apero_diner_party + this.placePartyOnly * this.state.party.price_party_only);
        this.setState({amount: this.amount})
        // Vérifier que les places sont bien disponibles ?
        // console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    submit(){
      if (this.dataCard.status.number !== "valid"){
        Alert.alert("Numéro de carte invalide");
      } else if (this.dataCard.status.expiry !== "valid"){
        Alert.alert("Date d'expiration invalide");
      } else if (this.dataCard.status.cvc !== "valid"){
        Alert.alert("CVC invalide");
      } else {
        (this.submitToAPI());
      }
    }

    submitToAPI(){
      var details = {
        'card[number]': '5555555555554444',
        'card[exp_month]': '12',
        'card[exp_year]': '21',
        'card[cvc]': '597'
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: formBody,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + Stripe.SECRET_KEY
        }
      };

      return fetch('https://api.stripe.com/v1/tokens', data)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.error) {
          Alert.alert('La carte de crédit n\'est pas bonne. Vérifiez les identifiants.');
        } else {
          var details = {
            'amount': this.amount,
            'currency': 'eur',
            'description': "Paiement de la soirée : " + this.state.party.name + " avec les forfaits et nombre de place suivant : \n " +
          		"Toute la soirée : " + this.placeTotal + " place(s)  \n" +
          		"Conférence et apéritif : "+ this.placeAperoConf + " place(s) \n " +
          		"Apéritif, dîner et soirée dansante : "+ this.placeAperoDinerParty + " place(s), \n " +
          		"Soirée dansante uniquement : "+ this.placePartyOnly + " place(s) \n " +
          		"\n Par l'utilisateur " + this.email +
          		"\n \n Montant H.T. : " + this.amount*0.8 + "€ \n" +
          		"TVA (20%) : " + this.amount*0.2 + "€ \n Montant total : " + this.amount*1 + "€" +
              "\n SASU THEMA CAFE MONTPELLIER - 6, rues des Cèdres 30900 Nîmes \n SIRET : 845 359 736 00012  --- APE : 9329Z \n",
            'receipt_email': this.email,
            'source': responseJson.id
          };
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");

          let data = {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: formBody,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + Stripe.SECRET_KEY
            }
          };
          return fetch('https://api.stripe.com/v1/charges', data)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("LOG AFTER CHARGES");
            console.log(responseJson);
            switch (responseJson.status) {
              case 'succeeded':
                Alert.alert("Votre paiement a bien été pris en compte.")
                let data = {
                  method: 'POST',
                  credentials: 'same-origin',
                  mode: 'same-origin',
                  body: JSON.stringify({
                    idParty: this.id,
                    idUser: this.idUser,
                    placesTotal: this.placesTotal,
                    placesAperoConf: this.placesAperoConf,
                    placesAperoDinerParty: this.placesAperoDinerParty,
                    placesPartyOnly: this.placesPartyOnly
                  }),
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                };

                return fetch(Api + '/api/buyparty', data)
                  .then((response) => response.json())
                  .then((responseJson) => {
                    console.log(responseJson);
                  })
                  .catch((error) => {
                    console.log(error);
                    console.error(error);
                  });
                this.props.navigation.navigate('MyEvent');
                break;
              default:
                Alert.alert("Le paiement n'a pas été pris en compte, veuillez réessayer.")

            }
          })
          .catch((error) => {
            console.log("LOG ERROR CHARGES");
            console.log(error);
            console.error(error);
          });
        }
        console.log('LOG AFTER TOKEN');
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
        console.error(error);
      });
    }

    render() {
        return (
          <KeyboardAvoidingView behavior="padding" enabled style={{flex: 1}}>
            <ScrollView style={styles.container}>
              <Text style={{paddingTop: 30, paddingBottom: 40, textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Récapitulatif des achats</Text>
              <View style={{flexDirection: 'column', marginLeft: 10, marginRight: 10, borderWidth: .5, borderColor: 'rgb(125,125,125)'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textTable2}>#</Text>
                  <Text style={styles.textTable1}><Text style={{fontWeight: '500'}}>Nombre de place</Text></Text>
                  <Text style={styles.textTable}><Text style={{fontWeight: '500'}}>Prix unitaire</Text></Text>
                  <Text style={styles.textTable}><Text style={{fontWeight: '500'}}>Prix total</Text></Text>
                </View>
                {this.placeTotal > 0 ?
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textTable2}>{this.state.party.type_event == null ? 'Toute la soirée' : 'Une personne'}</Text>
                    <Text style={styles.textTable1}>{this.placeTotal}</Text>
                    <Text style={styles.textTable}>{this.state.party.price}€</Text>
                    <Text style={styles.textTable}>{this.placeTotal * this.state.party.price}€</Text>
                  </View>
                  : <View></View>}
                {this.placeAperoConf > 0 ?
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textTable2}>{this.state.party.type_event == null ? 'Apéritif et conférence' : 'Un couple'}</Text>
                    <Text style={styles.textTable1}>{this.placeAperoConf}</Text>
                    <Text style={styles.textTable}>{this.state.party.price_apero_conf}€</Text>
                    <Text style={styles.textTable}>{this.placeAperoConf * this.state.party.price_apero_conf}€</Text>
                  </View>
                  : <View></View>}
                {this.placeAperoDinerParty > 0 ?
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textTable2}>Apéritif, dîner et soirée dansante</Text>
                    <Text style={styles.textTable1}>{this.placeAperoDinerParty}</Text>
                    <Text style={styles.textTable}>{this.state.party.price_apero_diner_party}€</Text>
                    <Text style={styles.textTable}>{this.placeAperoDinerParty * this.state.party.price_apero_diner_party}€</Text>
                  </View>
                  : <View></View>}
                {this.placePartyOnly > 0 ?
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textTable2}>Soirée dansante uniquement</Text>
                    <Text style={styles.textTable1}>{this.placePartyOnly}</Text>
                    <Text style={styles.textTable}>{this.state.party.price_party_only}€</Text>
                    <Text style={styles.textTable}>{this.placePartyOnly * this.state.party.price_party_only}€</Text>
                  </View>
                  : <View></View>}
              </View>

              <View style={{marginTop: 20}}></View>
              <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 16}}> Montant Total : {this.state.amount/100}€ </Text>
              <View style={{marginTop: 20}}></View>

              <CreditCardInput
              requiresCVC
              labels={{
                number: "Numéro de carte",
                expiry: "Expiration",
                cvc: "CVC"
              }}
              cardScale={0.8}
              labelStyle={styles.label}
              inputStyle={styles.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />


              <TouchableOpacity
                style={{backgroundColor: 'rgb(208, 118, 231)',borderRadius: 2,alignSelf: 'center',marginTop: 20,}}
                onPress={() => this.submit()}>
                <View style={{justifyContent:'center'}}>
                  <Text style={{justifyContent:'center',color: 'white',paddingTop: 15,paddingBottom: 15,fontSize: 18,marginLeft: 50,marginRight: 50}}>Payer</Text>
                </View>
              </TouchableOpacity>
              <View style={{height: 60}}></View>
            </ScrollView>
          </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#fff'
    },
    textTable: {
      borderWidth: .5,
      borderColor: 'rgb(125, 125, 125)',
      padding: 4,
      flex: 1
    },
    textTable1: {
      borderWidth: .5,
      borderColor: 'rgb(125, 125, 125)',
      padding: 4,
      flex: 1.5
    },
    textTable2: {
      borderWidth: .5,
      borderColor: 'rgb(125, 125, 125)',
      padding: 4,
      flex: 1.5,
      fontWeight: '700'
    },
    label: {
      color: "black",
      fontSize: 11,
    },
    input: {
      fontSize: 14,
      color: "black",
    }
});
