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
    Dimensions
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../constants/Colors.js';

const { width, height } = Dimensions.get('window')

export default class Profil extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
          username: '',
          email: '',
          id: ''
        })
    }

    componentDidMount = () => {
      let keys = ['username', 'email', 'id'];
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
        switch (store[i][0]) {
          case 'username':
            this.setState({username: store[i][1]})
            break;
          case 'email':
            this.setState({email: store[i][1]})
            break;
          case 'id  ':
            this.setState({id : store[i][1]})
            break;
          default:
            break;
          }
        })
      })
    }

    deconnexion() {
      let keys = ['email', 'username', 'id'];
      AsyncStorage.multiRemove(keys, (err) => {
        this.props.navigation.navigate('Connexion');
      });
    }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.headerProfil}>
            <View><Text style={{fontSize: 22, textAlign: 'center', color: 'white'}}> Bonjour {this.state.username}</Text></View>
            <View><Text style={{fontSize: 22, textAlign: 'center', color: 'white'}}> {this.state.email}</Text></View>
          </View>

          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 0.5,
              marginBottom: 15,
              marginTop: 0
            }}
          />

          <ScrollView style={{flex: 4}}>

            <View style={styles.viewItem}>
              <Ionicons name="md-person" size={30} style={styles.iconItem} />
              <TouchableHighlight
                style={styles.highLightItem}
                onPress={() => this.props.navigation.navigate('EditProfile')}>
                <Text style={styles.textItem} >
                  Changer les informations de mon profil
                </Text>
              </TouchableHighlight>
            </View>

            <View style={styles.viewItem}>
              <Ionicons name="md-lock" size={30} style={styles.iconItem} />
              <TouchableHighlight
                style={styles.highLightItem}
                onPress={() => this.props.navigation.navigate('EditPassword')}>
                <Text style={styles.textItem} >
                  Changer mon mot de passe
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
              <Text style={{fontSize: 15, color: 'gray', marginLeft: 20, marginBottom: 10}}> Thema Café Montpellier </Text>
            </View>

            <View style={styles.viewItem}>
              <Ionicons name="md-people" size={30} style={styles.iconItem} />
              <TouchableHighlight
                style={styles.highLightItem}
                onPress={() => this.props.navigation.navigate('WhoIsTCM')}>
                <Text style={styles.textItem} >
                  Qui sommes-nous ?
                </Text>
              </TouchableHighlight>
            </View>

            <View style={styles.viewItem}>
              <Ionicons name="md-contacts" size={30} style={styles.iconItem} />
              <TouchableHighlight
                style={styles.highLightItem}
                onPress={() => this.props.navigation.navigate('Partner')}>
                <Text style={styles.textItem} >
                  Les partenaires
                </Text>
              </TouchableHighlight>
            </View>

            <View style={styles.viewItem}>
              <Ionicons name="md-document" size={30} style={styles.iconItem} />
              <TouchableHighlight
                style={styles.highLightItem}
                onPress={() => this.props.navigation.navigate('RGPDCGV')}>
                <Text style={styles.textItem} >
                    RGPD et CGV
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
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: Colors.purpleLogo,
        alignSelf: 'center',
        flex: 0.15,
        flexDirection: 'column',
        width: width
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
