import React from 'react';
import {
    StyleSheet,
    Text,
    View, ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage
} from 'react-native';


export default class BookPlaces extends React.Component {
    constructor(props) {
        super(props);
        this.placeTotal = 0;
        this.placeAperoConf = 0;
        this.placeAperoDinerParty = 0;
        this.placePartyOnly = 0;
        this.state = ({
          party: {}
        })
    }

    componentDidMount = () => {
      let id = this.props.navigation.getParam('id');
      this.placeTotal = this.props.navigation.getParam('placeTotal');
      this.placeAperoConf = this.props.navigation.getParam('placeAperoConf');
      this.placeAperoDinerParty = this.props.navigation.getParam('placeAperoDinerParty');
      this.placePartyOnly = this.props.navigation.getParam('placePartyOnly');

      return fetch('https://www.thema-cafe.fr/api/party/' + id )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({party: responseJson})
        // Vérifier que les places sont bien disponibles ?
        // console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    render() {
        return (
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
                    <Text style={styles.textTable2}>Toute la soirée</Text>
                    <Text style={styles.textTable1}>{this.placeTotal}</Text>
                    <Text style={styles.textTable}>{this.state.party.price}€</Text>
                    <Text style={styles.textTable}>{this.placeTotal * this.state.party.price}€</Text>
                  </View>
                  : <View></View>}
                {this.placeAperoConf > 0 ?
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textTable2}>Apéritif et conférence</Text>
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
            </ScrollView>
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
    }
});
