import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TextInput,
    Button,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
              <ScrollView style={{flexDirection: 'column', width: width}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row', paddingTop: 40}}>
                    <Text style={styles.title}>
                      Les prochaines soirées
                    </Text>
                    {/*<Text style={styles.seeMore}>
                      VOIR +
                    </Text>*/}
                  </View>

                  {/* Volet "Activités artisanales" */}
                  <View style={{ height: 250, marginTop: 20 }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                      <View style={stylesManif.viewActivity}>
                        <View>
                          <ImageBackground
                          source={require('../../public/img/image_carre_temporaire.jpg')}
                          style={{width: '100%',height: '100%'}}>
                          </ImageBackground>
                        </View>
                        <View style={stylesManif.textUnderActivityPicture}>
                          <View style={{flexDirection:'column', flex: 4}}>
                            <Text style={stylesManif.typePlaces}>FÊTE LOCALE</Text>
                            <Text style={stylesManif.activityName}>Le marché au fleur du ...</Text>
                            <Text style={stylesManif.dayPlaceActivity}>jeu 18:00 - Cours Saleya - Nice </Text>
                          </View>
                          <View style={stylesManif.viewActivityWith}>
                            <Text style={stylesManif.dayActivity}> 20 </Text>
                            <Text style={stylesManif.monthActivity}> JUN </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={stylesManif.title}>
                      Les prochains stages
                    </Text>
                    {/*<Text style={styles.seeMore}>
                      VOIR +
                    </Text>*/}
                  </View>
                  <View style={{ height: 250, marginTop: 20 }}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <View style={stylesManif.viewActivity}>
                        <View>
                          <ImageBackground
                          source={require('../../public/img/image_carre_temporaire.jpg')}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}>
                          </ImageBackground>
                        </View>
                        <View style={stylesManif.textUnderActivityPicture}>
                            <View style={{flexDirection:'column', flex: 4}}>
                              <Text style={stylesManif.typePlaces}>FÊTE LOCALE</Text>
                              <Text style={stylesManif.activityName}>Le marché au fleur du ...</Text>
                              <Text style={stylesManif.dayPlaceActivity}>jeu 18:00 - Cours Saleya - Nice </Text>
                            </View>
                          <View style={stylesManif.viewActivityWith}>
                            <Text style={stylesManif.dayActivity}> 20 </Text>
                            <Text style={stylesManif.monthActivity}> JUN </Text>
                          </View>
                        </View>
                      </View>

                      <View style={stylesManif.viewActivity}>
                        <View>
                          <ImageBackground
                          source={require('../../public/img/fond_ecran_temporaire.jpg')}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}>
                          </ImageBackground>
                        </View>
                        <View style={stylesManif.textUnderActivityPicture}>
                          <View style={{flexDirection:'column', flex: 4}}>
                            <Text style={stylesManif.typePlaces}>MARCHE ARTISANALE</Text>
                            <Text style={stylesManif.activityName}>Le marché au fleur du ...</Text>
                            <Text style={stylesManif.dayPlaceActivity}>jeu 18:00 - Cours Saleya - Nice </Text>
                          </View>
                          <View style={stylesManif.viewActivityWith}>
                            <Text style={stylesManif.dayActivity}> 20 </Text>
                            <Text style={stylesManif.monthActivity}> JUN </Text>
                          </View>
                        </View>
                      </View>

                      <View style={stylesManif.viewActivity}>
                        <View>
                          <ImageBackground
                          source={require('../../public/img/photo_large_temporaire.jpg')}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}>
                          </ImageBackground>
                        </View>
                        <View style={stylesManif.textUnderActivityPicture}>
                          <View style={{flexDirection:'column', flex: 4}}>
                            <Text style={stylesManif.typePlaces}>MARCHE ARTISANALE</Text>
                            <Text style={stylesManif.activityName}>Le marché au fleur du ...</Text>
                            <Text style={stylesManif.dayPlaceActivity}>jeu 18:00 - Cours Saleya - Nice </Text>
                          </View>
                          <View style={stylesManif.viewActivityWith}>
                            <Text style={stylesManif.dayActivity}> 20 </Text>
                            <Text style={stylesManif.monthActivity}> JUN </Text>
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </View>

                </View>

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
    },
    title: {
      paddingLeft: 20,
      fontSize: 25,
      marginTop: 20,
      fontWeight: '500'
    },
    seeMore: {
      position: 'absolute',
      right: 10,
      top: 30,
      color: '#87CEEB',
      fontSize: 11
    },
    categorie: {
      color: 'white',
      fontWeight: '500',
      paddingLeft: 5,
      fontSize: 16
    },
    priceOne: {
      color: 'white',
      position: 'absolute',
      bottom: 2,
      right: 42
    },
    priceTwo: {
      color: 'white',
      position: 'absolute',
      bottom: 0,
      right: 5,
      fontSize: 22,
      fontWeight: '500'
    },
    viewActivity: {
      margin: 5,
      marginRight: 5,
      marginLeft: 15,
      paddingRight: -5,
      height: 160,
      width: 160
    },
    activityName: {
      textAlign: 'right',
      fontWeight: '500',
      paddingRight: 5
    },
    activityPlace: {
      textAlign: 'right',
      fontStyle:'italic',
      paddingRight: 3
    },
    activityWith: {
      paddingTop: 10,
      paddingLeft: 10,
      color: '#87CEEB'
    },
    viewActivityWith: {
      flexDirection: 'row',
      marginTop: 3,
      paddingBottom: 2,
      paddingLeft: 5
    },
    textUnderActivityPicture: {
      borderWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: "#dddddd"
    }
});

const stylesManif = StyleSheet.create({
    title: {
      paddingLeft: 20,
      fontSize: 25,
      marginTop: 20,
      fontWeight: '500'
    },
    seeMore: {
      position: 'absolute',
      right: 10,
      top: 30,
      color: '#87CEEB',
      fontSize: 11
    },
    viewActivity: {
      margin: 5,
      marginRight: 5,
      marginLeft: 15,
      paddingRight: -5,
      height: 150,
      width: 220
    },
    typePlaces: {
      textAlign: 'left',
      fontWeight: '500',
      fontSize: 10,
      marginLeft: 10,
      marginTop: 15
    },
    activityName: {
      textAlign: 'left',
      fontStyle:'normal',
      marginLeft: 10
    },
    dayPlaceActivity: {
      marginLeft: 10,
      fontWeight: '100',
      fontStyle: 'italic',
      fontSize: 10,
      marginBottom: 20
    },
    dayActivity: {
      flex: 1,
      position: 'absolute',
      bottom: 35,
      fontSize: 25,
      right: 9
    },
    monthActivity: {
      flex: 1,
      position: 'absolute',
      bottom: 18,
      right: 10,
      fontSize: 15,
      color: '#f1c643'
    },
    viewActivityWith: {
      flexDirection: 'column',
      flex: 1,
      marginTop: 3,
      paddingBottom: 2,
      paddingLeft: 5
    },
    textUnderActivityPicture: {
      borderWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: "#dddddd",
      flexDirection: 'row'
    }
});
