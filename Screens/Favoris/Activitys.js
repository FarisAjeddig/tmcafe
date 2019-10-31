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


export default class Activitys extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({})
    }

    render() {
        return (
            <View style={styles.container}>
              <Text>Bienvenue sur la page des activités</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});
