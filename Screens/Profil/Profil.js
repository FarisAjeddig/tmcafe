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
    ScrollView
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';


export default class Profil extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
          firstName: '',
          url_photo: 'http://www.super-blagues.fr/assets/images/profil/profil_defaut.png'
        })
    }
    componentDidMount = () => {

      let keys = ['firstname', 'url_photo'];

        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            switch (store[i][0]) {
              case 'firstname':
                this.setState({firstname: store[i][1]})
                break;
              case 'url_photo':
                this.setState({url_photo: store[i][1]})
                break;
              default:
                break;
            }
          })
        })

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    deconnexion() {

        let keys = ['email', 'nom', 'firstname', 'url_photo'];
        AsyncStorage.multiRemove(keys, (err) => {
            this.props.navigation.navigate('Connexion');
        });

    }


    render() {

        console.log(this.artisan);

        return (
          <View style={styles.container}>
              <View style={styles.headerProfil}>
                  <Text style={{marginLeft: 50, fontSize: 18, flex: 1}}> Profil</Text>
                  <Image
                      style={{
                          alignSelf: 'center',
                          height: 60,
                          width: 60,
                          borderRadius: 100,
                          flex: 1
                          //borderWidth: 2,
                      }}
                      // source={{uri: 'http://10.0.2.2:80/restBeewe2/img/' + this.artisan[0].url_photo}}
                      source={{uri: this.state.url_photo}}
                      resizeMode="stretch"
                  />
                  <View style={{flex: 2, paddingLeft: 20, paddingTop: 20}}>
                    <View><Text style={{fontSize: 16}}> Bonjour {this.state.firstname}</Text></View>
                    <View>
                      <TouchableOpacity>
                        <Text>Éditer mon profil &nbsp; &nbsp; <Ionicons name="md-create" size={20} /> </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              </View>

              <ScrollView style={{flex: 4}}>


                <View style={styles.viewItem}>
                  <Ionicons name="md-send" size={30} style={styles.iconItem} />
                  <TouchableHighlight
                      style={styles.highLightItem}
                      onPress={() => this.props.navigation.navigate('InviteFriend')}>
                      <Text style={styles.textItem} >
                        Inviter des amis
                      </Text>
                  </TouchableHighlight>
                </View>


                <View style={styles.viewItem}>
                  <Ionicons name="md-briefcase" size={30} style={styles.iconItem} />
                  <TouchableHighlight
                      style={styles.highLightItem}
                      onPress={() => {}}>
                      <Text style={styles.textItem} >
                        Parrainer un artisan (Ne fait rien pour le moment)
                      </Text>
                  </TouchableHighlight>
                </View>

                <View
                  style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.5,
                    marginBottom: 15,
                    marginTop: 15
                  }}
                />

                <View>
                  <Text style={{fontSize: 15, color: 'gray', marginLeft: 20, marginBottom: 10}}> Beeshary </Text>
                </View>

                <View style={styles.viewItem}>
                  <Ionicons name="md-people" size={30} style={styles.iconItem} />
                  <TouchableHighlight
                      style={styles.highLightItem}
                      onPress={() => this.props.navigation.navigate('FirstLaunch')}>
                      <Text style={styles.textItem} >
                        Comment ça marche ?
                      </Text>
                  </TouchableHighlight>
                </View>

                <View style={styles.viewItem}>
                  <Ionicons name="logo-game-controller-a" size={30} style={styles.iconItem} />
                  <TouchableHighlight
                      style={styles.highLightItem}
                      onPress={() => this.props.navigation.navigate('WhoIsBeeShary')}>
                      <Text style={styles.textItem} >
                        Qui sommes nous ?
                      </Text>
                  </TouchableHighlight>
                </View>

                <View
                  style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.5,
                    marginBottom: 15,
                    marginTop: 15
                  }}
                />

                <View>
                  <Text style={{fontSize: 15, color: 'gray', marginLeft: 20, marginBottom: 10}}> Support </Text>
                </View>

                <View style={styles.viewItem}>
                  <Ionicons name="md-chatboxes" size={30} style={styles.iconItem} />
                  <TouchableHighlight
                      style={styles.highLightItem}
                      onPress={() => this.props.navigation.navigate('FAQ')}>
                      <Text style={styles.textItem} >
                        FAQ
                      </Text>
                  </TouchableHighlight>
                </View>

                <View style={styles.viewItem}>
                  <Ionicons name="md-flag" size={30} style={styles.iconItem} />
                  <TouchableHighlight
                      style={styles.highLightItem}
                      onPress={() => this.props.navigation.navigate('PrivacyPolicy')}>
                      <Text style={styles.textItem} >
                        Politique de confidentialité
                      </Text>
                  </TouchableHighlight>
                </View>

                <View style={styles.viewItem}>
                  <Ionicons name="md-mail" size={30} style={styles.iconItem} />
                  <TouchableHighlight
                      style={styles.highLightItem}
                      onPress={() => this.props.navigation.navigate('ContactUs')}>
                      <Text style={styles.textItem} >
                        Contactez-nous
                      </Text>
                  </TouchableHighlight>
                </View>

                <View style={styles.viewItem}>
                  <Ionicons name="md-log-out" size={30} style={styles.iconItem} />
                  <TouchableHighlight
                      style={styles.highLightItem}
                      onPress={() => this.deconnexion()}>
                      <Text style={styles.textItem} >
                        Déconnexion
                      </Text>
                  </TouchableHighlight>
                </View>


              </ScrollView>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerProfil: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#58d3ce",
        alignSelf: 'stretch',
        flex: 0.35,
        flexDirection: 'row'
    },
    viewItem: {
      flexDirection:'row',
      paddingLeft: 20,
      marginTop: 10,
      marginBottom: 5
    },
    iconItem: {
      flex: 1,
      paddingTop: 2,
      color: 'gray'
    },
    highLightItem: {
      flex: 5,
      marginTop: -2,
      marginBottom: 0
    },
    textItem: {
      fontSize: 12,
      paddingTop: 7
    }

});
