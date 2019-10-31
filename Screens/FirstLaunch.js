import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  ImageBackground
} from 'react-native'
// import Swiper from 'react-native-swiper'
import Video from 'expo'
import { BlurView } from 'expo'
import LoadingScreen from './LoadingScreen'
const { width, height } = Dimensions.get('window')

const styles = {
  wrapper: {
    backgroundColor: '#f00'
  },

  slide: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },

  container: {
    flex: 1,
  },

  imgBackground: {
    width,
    height,
    backgroundColor: 'transparent',
    position: 'absolute'
  },

  image: {
    width,
    height,
  },

  video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
  },

  buttonText: {
    backgroundColor: 'transparent',
    fontSize: 50,
    flexDirection: 'row',
    color: 'rgba(255,255,255,1)',
    // position: 'absolute',
    height,
    bottom: 0,
    // left: 0,
    // flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlignVertical: 'bottom',
    paddingBottom: 65,
    // zIndex: 4
  },

  imageCenter: {
      borderRadius: 5,
      justifyContent: 'center',
      // marginTop: 100,
  },

  textTitle: {
      fontSize: 38,
      textAlign: 'center',
      color: 'white',
    //  fontFamily: 'Lato-Regular',
      paddingBottom: 10,
  },

  backImage: {
      color: 'white',
      //fontFamily: 'HELR45W',
      fontSize: 16,
      textAlign: 'center',
  },

  myblur: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
    width,
    height,
  },

  PasserButton: {
    flex: 0.5,
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    height: 50,
    justifyContent: 'center'
  },

  TextButton : {
      //fontFamily: 'Roboto',
      color: 'white',
      fontSize: 16,
      textAlign: 'center'
  },

  buttonBottom: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width,
    position: 'absolute',
    bottom: 0,
    height: 50,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.5)'
  },

  textSignIn: {
    //fontFamily: 'Roboto',
    color: 'yellow',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    textAlignVertical: 'center'
  },

  textSignUp: {
    //fontFamily: 'Roboto',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center'
  },

  buttonSignIn: {
    alignItems: 'center',
    flex: 0.5,
    height: 35,
    justifyContent: 'center',
  },

  buttonSignUp: {
    alignItems: 'center',
    flex: 0.5,
    height: 35,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.5)',
  }

}

const styles2 = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
  },
  slide2: {
    flex: 1,
  },
  slide3: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center'
  }
});

export default class FirstLaunch extends Component {

  goConnexion() {
    // AsyncStorage.setItem('firstLaunch', 'abc');
    this.props.navigation.navigate('Auth');
  }

  goInscription() {
    // AsyncStorage.setItem('firstLaunch', 'abc');
    this.props.navigation.navigate('ConnexionPicker');
  }

  componentDidMount = () => {
    this.setFirstLaunchDone();
  }

  async setFirstLaunchDone() {
    AsyncStorage.setItem('firstLaunch', 'abc');
  }

  render () {
    return (
      <View></View>
    )
  }
}
