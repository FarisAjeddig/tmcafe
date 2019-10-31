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

export default class HomeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
              <View style={{ width: width, height: 150}}>
                <ImageBackground
                source={require('../../public/img/photo_large_temporaire.jpg')}
                style={{
                  alignItems: 'center',
                  flex: 1
                }}>
                <View style={{flex: 0.3}} />
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{height: 40, color: 'gray', fontSize: 14, paddingRight: 100, paddingLeft: 20, paddingTop: 8, marginTop: 3, marginBottom: 0}}>Nice - France </Text>
                    <Ionicons name="md-search" size={30} color="grey" style={{paddingRight: 15, paddingLeft: 10, marginTop: 5, marginBottom: 5}} />
                  </TouchableOpacity>
                </View>
                </ImageBackground>
              </View>
              <ScrollView style={{flexDirection: 'column', width: width}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.title}>
                      Activités artisanales
                    </Text>
                    <Text style={styles.seeMore}>
                      VOIR +
                    </Text>
                  </View>

                  {/* Volet "Activités artisanales" */}
                  <View style={{ height: 250, marginTop: 20 }}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <View style={styles.viewActivity}>
                        <View>
                          <ImageBackground
                          source={require('../../public/img/image_carre_temporaire.jpg')}
                          style={{
                            width: '100%',
                            height: '100%',
                            flexDirection: 'column'
                          }}>
                            <Text style={styles.categorie}>CATÉGORIE</Text>
                            <Text style={styles.priceOne}>À partir de </Text>
                            <Text style={styles.priceTwo}>12€</Text>
                          </ImageBackground>
                        </View>
                        <View style={styles.textUnderActivityPicture}>
                          <Text style={styles.activityName}>Nom de l'activité</Text>
                          <Text style={styles.activityPlace}>Adresse de l'activité</Text>
                          <View style={styles.viewActivityWith}>
                            <Image
                            source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png'}}
                            style={{width: 40, height: 40, borderRadius: 150/2}}
                            />
                            <Text style={styles.activityWith}> Avec Faris </Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.viewActivity}>
                        <View>
                          <ImageBackground
                          source={require('../../public/img/fond_ecran_temporaire.jpg')}
                          style={{
                            width: '100%',
                            height: '100%',
                            flexDirection: 'column'
                          }}>
                            <Text style={styles.categorie}>CATÉGORIE</Text>
                            <Text style={styles.priceOne}>À partir de </Text>
                            <Text style={styles.priceTwo}>12€</Text>
                          </ImageBackground>
                        </View>
                        <View style={styles.textUnderActivityPicture}>
                          <Text style={styles.activityName}>Nom de l'activité</Text>
                          <Text style={styles.activityPlace}>Adresse de l'activité</Text>
                          <View style={styles.viewActivityWith}>
                            <Image
                            source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png'}}
                            style={{width: 40, height: 40, borderRadius: 150/2}}
                            />
                            <Text style={styles.activityWith}> Avec Faris </Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.viewActivity}>
                        <View>
                          <ImageBackground
                          source={require('../../public/img/photo_large_temporaire.jpg')}
                          style={{
                            width: '100%',
                            height: '100%',
                            flexDirection: 'column'
                          }}>
                            <Text style={styles.categorie}>CATÉGORIE</Text>
                            <Text style={styles.priceOne}>À partir de </Text>
                            <Text style={styles.priceTwo}>12€</Text>
                          </ImageBackground>
                        </View>
                        <View style={styles.textUnderActivityPicture}>
                          <Text style={styles.activityName}>Nom de l'activité</Text>
                          <Text style={styles.activityPlace}>Adresse de l'activité</Text>
                          <View style={styles.viewActivityWith}>
                            <Image
                            source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png'}}
                            style={{width: 40, height: 40, borderRadius: 150/2}}
                            />
                            <Text style={styles.activityWith}> Avec Faris </Text>
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </View>

                  {/* Volet "Manifestations locales" */}
                  <View style={{flexDirection: 'row'}}>
                    <Text style={stylesManif.title}>
                      Manifestations locales
                    </Text>
                    <Text style={stylesManif.seeMore}>
                      VOIR +
                    </Text>
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
