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
    ToastAndroid
} from 'react-native';


export default class FAQ extends React.Component {


    constructor(props) {
        super(props);

        this.state = ({})
    }
    componentDidMount() {

        AsyncStorage.multiGet(['email', 'nom']).then((data) => {
            let emailSession = data[0][1];
            let nomSession = data[1][1];

            if (emailSession !== null && nomSession !== null) {

            }
            else {
                this.props.navigation.navigate('Connexion');
            }
        });
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }


    render() {
        return (
            <View style={styles.container}>

                <Text>Bientôt il y aura toutes les questions et réponses posées généralement.</Text>

                <TouchableOpacity
                onPress={ () => {this.props.navigation.navigate('Profil')}}>
                  <Text>Revenir au profil</Text>
                </TouchableOpacity>

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
    headerProfil: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#58d3ce",
        alignSelf: 'stretch',
    },
});
