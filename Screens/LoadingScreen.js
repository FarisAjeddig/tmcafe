import React, { Component } from 'react'
import {
  View,
  Image,
  StatusBar,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native'

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageCenter: {
      borderRadius: 5,
      flex: 5,
      justifyContent: 'center',
      height: 300,
      width: 300,
      resizeMode: 'contain'
  },

}

export default class FirstLaunch extends Component {
  constructor() {
    super();
  }

  componentDidMount(){
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    this.props.navigation.navigate('ConnexionPicker');
  };


  render () {
    return (
      <View
        style={styles.container}>
        <Image
        style={styles.imageCenter}
        source={{uri: 'https://www.thema-cafe.fr/images/8c64f68.jpg'}}/>
      </View>
    )
  }
}
