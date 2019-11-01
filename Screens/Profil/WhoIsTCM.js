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


export default class WhoIsTCM extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({})
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{fontSize: 16}}>
        J’ai créé les soirées THEMA CAFE MONTPELLIER© pour concilier mes 2 passions que sont la philosophie et la danse.{"\n"}{"\n"}
        Ces soirées s’organisent en 3 temps comme dans la dialectique hégélienne{"\n"}{"\n"}
        - le 1er temps, le temps de la thèse, qui est une conférence{"\n"}
        - puis, comme une articulation et non pas une antithèse, vient le 2nd temps, qui est le moment gastronomique{"\n"}
        - et enfin le 3ème temps, comme une synthèse, le temps de la fête avec la soirée dansante qui s’ouvre sur un cours d’initiation au NEW tango ou au rock "simplifié"
        {"\n"}{"\n"}{"\n"}
        Eric Bastardie{"\n"}
        Président de THEMA CAFE MONTPELLIER©
        </Text>
        <Image
          style={{alignSelf: 'center', width: 160, height: 160, marginTop: 50, marginBottom: 50}}
          source={{uri: 'https://www.thema-cafe.fr/images/8c64f68.jpg'}}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingRight: 40,
        paddingLeft: 40
    }
});
