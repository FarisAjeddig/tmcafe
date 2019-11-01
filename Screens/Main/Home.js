import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';

const { width, height } = Dimensions.get('window')

Item = ({ name, price, url_picture, date, id, navigation }) => {
  monthToLetter = (number) => {
    array = ["JANV", "FEV", "MARS", "AVRIL", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DEC"];
    return array[number];
  }
  var days = String(String(date).split(' ')[0]).split('-');
  month = monthToLetter(+days[1]-1);
  day = days[2].split('T')[0];
  console.log(this);
  return (
    <TouchableOpacity onPress={() => navigation.navigate('PartyDetails')}>
      <View style={styles.viewActivity}>
        <View>
          <ImageBackground
          source={{uri: 'https://ce413d70.ngrok.io/uploads/pictures/' + url_picture}}
          style={{width: '100%',height: '100%'}}>
          </ImageBackground>
        </View>
        <View style={styles.textUnderActivityPicture}>
          <View style={{flexDirection:'column', flex: 4}}>
            <Text style={styles.typePlaces}>Réservez maintenant</Text>
            <Text style={styles.activityName}>{name}</Text>
            <Text style={styles.dayPlaceActivity}>À partir de {price}€ </Text>
          </View>
          <View style={styles.viewActivityWith}>
            <Text style={styles.dayActivity}> {day} </Text>
            <Text style={styles.monthActivity}> {month} </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataParty: [],
      dataStage: []
    }
  }

  componentDidMount = () => {
    fetch('https://ce413d70.ngrok.io/api/partys')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({dataParty: responseJson})
    })
    .catch((error) => {
      console.error(error);
    });
 // Remplacer "partys" par "stages" quand ce sera en place
    return fetch('https://ce413d70.ngrok.io/api/partys')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({dataStage: responseJson})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render(){
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

            <View style={{ height: 250, marginTop: 20 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <FlatList
                  data={this.state.dataParty}
                  horizontal={true}
                  renderItem={({ item }) => <Item name={item.name} price={item.price} url_picture={item.picture} date={item.day} id={item.id} navigation={this.props.navigation} />}
                  keyExtractor={item => item.id}
                />

              </ScrollView>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.title}>
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
              <FlatList
                data={this.state.dataStage}
                horizontal={true}
                renderItem={({ item }) => <Item name={item.name} price={item.price} url_picture={item.picture} date={item.day} id={item.id} />}
                keyExtractor={item => item.id}
              />

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
