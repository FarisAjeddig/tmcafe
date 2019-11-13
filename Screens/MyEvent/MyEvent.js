import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage,
    ScrollView,
    Dimensions,
    FlatList
} from 'react-native';
import Api from '../../constants/Api';
const { width, height } = Dimensions.get('window')

ItemMyEvent = ({ name, price, url_picture, date, id, navigation, numberPlaces, forfait }) => {
  monthToLetter = (number) => {
    array = ["JANV", "FEV", "MARS", "AVRIL", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DEC"];
    return array[number];
  }
  var days = String(String(date).split(' ')[0]).split('-');
  month = monthToLetter(+days[1]-1);
  day = days[2].split('T')[0];
  console.log(this);
  return (
    <TouchableOpacity onPress={() => navigation.navigate('PartyDetails', {id: id})}>
      <View style={styles.viewActivity}>
        <View style={{height: '70%'}}>
          <ImageBackground
          source={{uri: Api + '/uploads/pictures/' + url_picture}}
          style={{width: '100%',height: '100%'}}>
          </ImageBackground>
        </View>
        <View style={styles.textUnderActivityPicture}>
          <View style={{flexDirection:'column', flex: 4}}>
            <Text style={styles.typePlaces}>{numberPlaces} place(s) réservé(s)</Text>
            <Text style={styles.activityName}>{name}</Text>
            <Text style={styles.dayPlaceActivity}>Forfait : {forfait} </Text>
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

export default class MyEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({})
  }

  componentDidMount(){
    AsyncStorage.getItem('id').then((value) => {
      return fetch(Api + '/api/getMyEvent/' + value)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({data: responseJson});
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flexDirection: 'column'}}>
          <Text style={styles.title}>
            Mes événements
          </Text>

          <View style={{width: width, marginTop: 20, marginBottom: 20 }}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => <ItemMyEvent name={item[1]} price={item[3]} url_picture={item[7]} id={item[0]} date={item[5]} navigation={this.props.navigation} numberPlaces={item[4]} forfait={item[2]} />}
              keyExtractor={item => item[8].toString()}
            />
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
      fontWeight: '500',
      paddingTop: 40
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
      height: width-100,
      width: width-30
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
