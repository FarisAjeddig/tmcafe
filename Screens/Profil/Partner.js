import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Linking
} from 'react-native';


export default class Partner extends React.Component {


    constructor(props) {
        super(props);

        this.state = ({})
    }


    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.textPartner} onPress={() => Linking.openURL('https://www.accorhotels.com/gb/hotel-3043-mercure-montpellier-centre-comedie-hotel/index.shtml')}>Hotel MERCURE LA COMEDIE Montpellier</Text>
          <Text style={styles.textPartner} onPress={() => Linking.openURL('https://www.le-cabanon-montpellier.com/')}>Restaurant LE CABANON Montpellier</Text>
          <Text style={styles.textPartner} onPress={() => Linking.openURL('https://www.tang-emocion.com/')}>Ecole Tang'Emocion</Text>
          <Text style={styles.textPartner} onPress={() => Linking.openURL('https://apmsa.fr/')}>APMSA (Application du Plan de Maîtrise Sanitaire Alimentaire)</Text>
          <Text style={styles.textPartner} onPress={() => Linking.openURL('https://www.facebook.com/BistrotdAlco/')}>Restaurant Bistrot d'Alco</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    textPartner: {
      paddingTop: 30,
      paddingBottom: 20,
      fontSize: 16,
      paddingLeft: 15,
      paddingRight: 15,
      textAlign: 'center',
      color: 'rgb(12, 143, 208)'
    }
});
