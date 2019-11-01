import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';

const { width, height } = Dimensions.get('window')


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      party: []
    }
  }

  componentDidMount = () => {
    return fetch('https://ce413d70.ngrok.io/api/party/6')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({party: responseJson})
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render(){
    const { width, height } = Dimensions.get('window')
    return (
      <View style={styles.container}>
        <ScrollView style={{flexDirection: 'column', width: width}}>
          <Image
            style={{width: width, height: 250}}
            source={{uri: 'https://ce413d70.ngrok.io/uploads/pictures/' + this.state.party.picture}}
          />
          <Text>{this.state.party.name}</Text>
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
  }
});
