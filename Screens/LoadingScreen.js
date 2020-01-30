import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
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
})

export default class LoadingScreen extends Component {
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
        source={require('../assets/images/logo.png')}/>
      </View>
    )
  }
}
