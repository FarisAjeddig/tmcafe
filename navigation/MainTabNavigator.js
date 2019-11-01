import React, { Component } from 'react'
import {
 Text,
 View,
 Image,
 StatusBar,
 Dimensions
} from 'react-native'

import {
createStackNavigator,
createSwitchNavigator,
createBottomTabNavigator
} from 'react-navigation'

const { width, height } = Dimensions.get('window')
import Ionicons from 'react-native-vector-icons/Ionicons';

import FirstLaunch from '../Screens/FirstLaunch'
import Connexion from '../Screens/Connexion'
import LoadingScreen from '../Screens/LoadingScreen'
import ProfilScreen from '../Screens/Profil/Profil'
import SignUpScreen from '../Screens/Inscription'
import ConnexionPickerScreen from '../Screens/ChooseTypeConnexion'
import Home from '../Screens/Home'

import HomeDetails from '../Screens/Main/HomeDetails'

import Favoris from '../Screens/Favoris/Favoris'
import Activitys from '../Screens/Favoris/Activitys'

import EditProfile from '../Screens/Profil/EditProfile'
import WhoIsTCM from '../Screens/Profil/WhoIsTCM'
import EditPassword from '../Screens/Profil/EditPassword'
import RGPDCGV from '../Screens/Profil/RGPDCGV'
import ContactUs from '../Screens/Profil/ContactUs'
import Partner from '../Screens/Profil/Partner'


 const LoadingNavigator = createStackNavigator({
   Home: {
     screen: LoadingScreen,
     navigationOptions: {
       header: null
     }
   }
 });

 const FirstLaunchNavigator = createStackNavigator({
   Home: {
     screen: FirstLaunch,
     navigationOptions: {
       header: null
     }
   }
 });

 const AuthNavigator = createStackNavigator({
   ConnexionPicker: {
     screen: ConnexionPickerScreen,
     navigationOptions: {
       headerTransparent: true,
       headerTintColor: 'white'
     }

   },
   SignUp: {
     screen: SignUpScreen,
     navigationOptions: {
       headerTransparent: true,
       headerTintColor: 'white'
     }
   },
   Connexion: {
     screen: Connexion,
     navigationOptions: {
       headerTransparent: true,
       headerTintColor: 'white'
     }
   },
 });

 const FavorisNavigator = createStackNavigator({
   Activitys: {
     screen: Activitys,
     navigationOptions: {
       tabBarVisible: false
     }
   }
 });

 const HomeNavigator = createStackNavigator({
   MainHome: {
     screen: Home,
     navigationOptions: {
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                const iconName = `ios-home${!focused ? '' : ''}`;
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
            tabBarLabel: 'Accueil'
        }
   },
   HomeDetails: {
     screen: HomeDetails,
     navigationOptions: {
       header: null
     }
   }
 })

 const ProfilNavigator = createStackNavigator({
   Profil: {
     screen: ProfilScreen,
     navigationOptions: {
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                const iconName = `ios-settings${focused ? '' : '-outline'}`;
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            }
        }
   },
   EditProfile: {
     screen: EditProfile,
     navigationOptions: {
       title: 'Modifier ses informations personnelles'
       // header: true
     }
   },
   WhoIsTCM: {
     screen: WhoIsTCM,
     navigationOptions: {
       title: "Qui sommes-nous ?"
       // header: null
     }
   },
   EditPassword: {
     screen: EditPassword,
     navigationOptions: {
       title: 'Modifier son mot de passe'
       // header: null
     }
   },
   Partner: {
     screen: Partner,
     navigationOptions: {
       title: 'Les partenaires'
       // header: null
     }
   },
   ContactUs: {
     screen: ContactUs,
     navigationOptions: {
       title: 'Contactez-nous'
       // header: null
     }
   },
   RGPDCGV: {
     screen: RGPDCGV,
     navigationOptions: {
       title: 'RGPD & CGV'
       // header: null
     }
   }
 });

 const Navigator = createBottomTabNavigator({
   MainHome: {
     screen: HomeNavigator,
     navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                const iconName = `ios-home${!focused ? '' : ''}`;
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
            tabBarLabel: 'Accueil'
        }
   },
   Favoris: {
     screen: Favoris,
     navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                const iconName = `${focused ? 'ios-heart' : 'ios-heart-empty'}`;
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }
   },
   Profil: {
     screen: ProfilNavigator,
     navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                const iconName = `ios-person${!focused ? '' : ''}`;
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            }
        }
   }
 },
  {
    defaultNavigationOptions: ({ navigation }) => ({
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
  });




export default createSwitchNavigator({
  Loading: LoadingNavigator,
  FirstLaunch: FirstLaunchNavigator,
  Auth: AuthNavigator,
  MainApp: Navigator,
  Favoris: FavorisNavigator,
  ProfilNav: ProfilNavigator
},
{
  initialRouteName: 'Loading'
});
