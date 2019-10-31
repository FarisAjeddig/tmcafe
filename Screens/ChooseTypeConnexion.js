import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage,
    Button,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class ChooseTypeConnexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            mail: "",
            pass: "",
            modalVisible: false,
        });
    }

    componentDidMount = () => {
      AsyncStorage.getItem('email').then((value) => {
        if (value !== null){
          this.props.navigation.navigate('Profil');
        }
      });
    }

    _goInscription() {
        this.props.navigation.navigate('SignUp');
    }

    _goConnexion() {
      this.props.navigation.navigate('Connexion');
    }

    getDatasArtisansForFB() {
        let data = {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify({
                email: this.state.user['profile']['email'],
                firstname: this.state.user['profile']['first_name'],
                lastname: this.state.user['profile']['last_name'],
                idfb: this.state.user['profile']['id'],
                token: this.state.user['credentials']['token'],
                picture: this.state.user['profile']['picture']['data']['url'],


            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
        //console.log(data);
        //console.log(this.state);
        return fetch('https://dev.beeshary.com/restBeewe2/SignUpWithFB.php', data)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({artisansInfos: responseJson});

                console.log(responseJson[0].email);
                console.log(responseJson[0].lastname);

                if (responseJson == '') {
                    this.setState({modalVisible: true});
                }
                else {

                    AsyncStorage.multiSet([

                        ["email", responseJson[0].email],
                        ["nom", responseJson[0].lastname]
                    ]);

                    this.props.navigation.navigate('Profil', {
                        artisan: responseJson
                    });
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground
                    style={{flex: 1}}
                    source={{uri: 'https://dev.beeshary.com/restBeewe2/img/leatherWorkBlur.jpg'}}>
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
    btnCompte: {
        backgroundColor: 'white',
        height: 50,
        borderRadius: 3,
        paddingTop: 11,
        alignSelf: 'stretch',
        marginTop: 15,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
    },
    modalErr: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        paddingLeft: 60,
        paddingRight: 60
    },
    modalErr2: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        paddingBottom: 60,
        paddingRight: 10,
        paddingLeft: 10
    },
    backImage: {
        color: 'white',
        //fontFamily: 'HELR45W',
        fontSize: 16,
        textAlign: 'center',
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
