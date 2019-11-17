import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class ChooseTypeConnexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
        });
    }

    componentDidMount = () => {
      AsyncStorage.getItem('email').then((value) => {
        if (value !== null){
          this.props.navigation.navigate('MainHome');
        }
      });
    }

    _goInscription() {
        this.props.navigation.navigate('SignUp');
    }

    _goConnexion() {
      this.props.navigation.navigate('Connexion');
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground
                    style={{flex: 1}}
                    source={require('../assets/images/fondecran.jpg')}>
                    <View style={styles.container}>
                        <Image
                            style={{alignSelf: 'center', width: 160, height: 160, marginTop: 50}}
                            source={{uri: 'https://www.thema-cafe.fr/images/8c64f68.jpg'}}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                          <TouchableOpacity
                              style={{marginTop:20,paddingTop:15,paddingBottom:15,paddingLeft:50,paddingRight:35, marginBottom:20,
                                backgroundColor:'rgb(227, 126, 33)',borderRadius:30,borderWidth: 0.2,borderColor: '#fff', alignItems:'center'}}
                              onPress={() => this._goConnexion()}
                           >
                            <Text style={{color:'#fff', textAlign:'center', fontSize: 25}}>Connexion  &nbsp; <Ionicons name="ios-arrow-dropright-circle" size={25} color="white" style={{}} /> </Text>
                           </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.account}>Vous n'avez pas encore de compte ? </Text>
                        <TouchableOpacity
                            style={styles.SeCoBtn}
                            onPress={() => this._goInscription()}>
                            <Text style={styles.TextButton}>S'inscrire</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 30,
    },
    account: {
        color: 'white',
        textAlign: 'center',
    },
    TextButton: {
        color: '#cdaf52',
    },
    SeCoBtn: {
        alignItems: 'center',
    }
});
