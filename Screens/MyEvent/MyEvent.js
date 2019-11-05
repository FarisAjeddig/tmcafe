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


export default class MyEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({})
    }

    render() {
        return (
            <View style={styles.container}>
              <Text>Bienvenue sur la page de vos événements - COMING SOON</Text>
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
