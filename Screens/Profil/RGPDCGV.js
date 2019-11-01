import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Modal,
    TouchableHighlight,
    AsyncStorage,
    BackHandler,
    ToastAndroid
} from 'react-native';


export default class RGPDCGV extends React.Component {


    constructor(props) {
        super(props);

        this.state = ({})
    }

    render() {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>RGPD</Text>
          <Text style={{fontStyle: 'italic', fontSize: 8, paddingLeft: 60, paddingBottom: 20}}>Version 1.0 du 16/04/2019</Text>
          <Text style={styles.text}>
          Cette charte décrit la politique de confidentialité et de traitement des données personnelles
          mise en place sur le site internet de THEMA CAFE MONTPELLIER©. {"\n"}{"\n"}
          Lorsque vous utilisez le site internet de THEMA CAFE MONTPELLIER©, voici les types de
          données personnelles qui peuvent être collectés {"\n"}
          &nbsp; &nbsp; • Les données que vous nous communiquez lorsque vous créez un compte (e.g. adresse
          email, mot de passe){"\n"}
          &nbsp; &nbsp; &nbsp; &nbsp; o Nota : les serveurs qui hébergent le site internet de THEMA CAFE
          MONTPELLIER© ne stockent pas votre numéro de carte de crédit lorsque vous
          réalisez un achat d’une formule d’une soirée{"\n"}
          &nbsp; &nbsp; • Des informations relatives à vos visites et à votre utilisation du site internet de THEMA
          CAFE MONTPELLIER© (e.g. votre adresse IP et votre emplacement géographique, la
          date et l’heure de votre visite){"\n"}{"\n"}
          Vos données personnelles sont stockées sur les serveurs de l’hébergeur OVH
          &nbsp; &nbsp; • Nous conservons ces données aussi longtemps que nécessaire pour réaliser les
          activités décrites dans cette charte RGPD{"\n"}{"\n"}
          En utilisant la page qui décrit votre profil, vous pouvez accéder à vos données personnelles
          pour les modifier{"\n"}
          &nbsp; &nbsp; • Suivant la loi RGPD, vous avez le droit de nous demander de rectifier ou de supprimer
          vos données personnelles{"\n"}
          &nbsp; &nbsp; &nbsp; &nbsp; o Pour exercer ce droit, vous pouvez nous contacter via le formulaire de contact
          disponible sur le site internet de THEMA CAFE MONTPELLIER© ou en utilisant
          l’adresse email : bastardie.eric@orange.fr{"\n"}{"\n"}
          Nous nous efforçons de protéger au mieux vos données personnelles, mais il est à noter que
          la transmission de ces données se fait à vos risques et périls car les transmissions de données
          sur l’internet ne sont pas totalement sécurisées{"\n"}
          &nbsp; &nbsp; • A réception de vos données personnelles, nous mettons en œuvre des procédures
          fiables et des dispositifs de sécurité applicables à ces données (e.g. votre mot de passe
          est conservé sous une forme cryptée dans notre base de données){"\n"}{"\n"}
          Nous utilisons vos données personnelles dans le but de vous fournir de manière optimum les
          services que vous nous sollicitez{"\n"}
          &nbsp; &nbsp; • THEMA CAFE MONTPELLIER© ne vendra pas vos données personnelles, comme par
          exemple votre adresse email{"\n"}
          &nbsp; &nbsp; &nbsp; &nbsp; o En utilisant l’adresse email que vous nous avez donnée et avec votre accord,
          nous pouvons vous notifier des nouvelles soirées de THEMA CAFE
          MONTPELLIER©{"\n"}
          &nbsp; &nbsp; &nbsp; &nbsp; o Dans le cas de la loi RGPD, nous pouvons avoir à communiquer vos données
          personnelles aux autorités gouvernementales{"\n"}{"\n"}
          </Text>
          <Text style={styles.title}>CGV</Text>
          <Text style={styles.text}>Incoming</Text>
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title:{
      fontSize: 25,
      fontWeight: 'bold',
      paddingLeft: 50,
      paddingTop: 30,
    },
    text:{
      paddingLeft: 25,
      paddingRight: 25,
      fontSize: 18
    }
});
