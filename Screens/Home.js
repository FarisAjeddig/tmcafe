import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TextInput,
    Button,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
            {/* Encadré en haut pour le champ "Où voulez-vous aller ?" et l'image"*/}
              <View style={{flex: 1.5, width: width}}>
                <ImageBackground
                source={require('../public/img/photo_large_temporaire.jpg')}
                style={{
                  alignItems: 'center',
                  flex: 1
                }}>
                <View style={{flex: 0.5}} />
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('HomeDetails')}
                    style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="md-search" size={30} color="grey" style={{paddingRight: 15, paddingLeft: 10, marginTop: 5, marginBottom: 5}} />
                    <Text style={{height: 40, color: 'gray', fontSize: 14, paddingRight: 100, paddingTop: 8, marginTop: 3, marginBottom: 0}}>Où voulez-vous aller ? </Text>
                    <View style={{backgroundColor: 'orange'}}><Ionicons name="md-locate" size={45} color="white" style={{marginLeft: 2, paddingRight: 1.5}} /></View>
                  </TouchableOpacity>
                </View>
                </ImageBackground>
              </View>
              {/*Les trois boutons pour accéder aux activités/artisans/manifestations*/}
              <ScrollView style={{flexDirection: 'column', flexGrow: 0.1, width: width}}>
                <View style={{flexDirection: 'row'}}>
                  {/*Première colonne*/}
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Profil')}
                      style={{margin: 10, backgroundColor: 'blue', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}
                    >
                      <Image
                        source={require('../public/img/bee-convi.png')}
                      />
                      <Text style={styles.text}> Trouver une activité </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Profil')}
                      style={{margin: 10, backgroundColor: '#FFDE75', flex: 1.5, justifyContent: 'center', alignItems: 'center', padding: 10}}
                    >
                      <Image
                        style={styles.button}
                        source={require('../public/img/bee-facile.png')}
                      />
                      <Text style={styles.text}> Découvrir les artisans autour de moi </Text>
                    </TouchableOpacity>
                  </View>

                  {/*Deuxième colonne*/}
                  <View style={{flex: 1, flexDirection: 'column'}}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Profil')}
                    style={{margin: 10, backgroundColor: 'orange', flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}
                  >
                    <Image
                      style={styles.button}
                      source={require('../public/img/bee-inso.png')}
                    />
                    <Text style={styles.text}> Connaître les manifestations locales </Text>
                  </TouchableOpacity>
                  <View style={{flex: 2}} />
                  </View>
                </View>
              </ScrollView>
            </View>
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
    text: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center'
    }
});
