import React, { Component } from 'react'
import { Dimensions } from 'react-native'

import {
createStackNavigator,
createSwitchNavigator,
createBottomTabNavigator
} from 'react-navigation'

const { width, height } = Dimensions.get('window')
import Ionicons from 'react-native-vector-icons/Ionicons';

import Connexion from '../Screens/Connexion'
import LoadingScreen from '../Screens/LoadingScreen'
import ProfilScreen from '../Screens/Profil/Profil'
import SignUpScreen from '../Screens/Inscription'
import ConnexionPickerScreen from '../Screens/ChooseTypeConnexion'
import Home from '../Screens/Main/Home'


import MyEvent from '../Screens/MyEvent/MyEvent'

import EditProfile from '../Screens/Profil/EditProfile'
import WhoIsTCM from '../Screens/Profil/WhoIsTCM'
import EditPassword from '../Screens/Profil/EditPassword'
import RGPDCGV from '../Screens/Profil/RGPDCGV'
import ContactUs from '../Screens/Profil/ContactUs'
import Partner from '../Screens/Profil/Partner'

// Écran d'attente lorsqu'on ouvre l'application
 const LoadingNavigator = createStackNavigator({
   Home: {
     screen: LoadingScreen,
     navigationOptions: {
       header: null
     }
   }
 });


// Stack pour les premières fenetres : Choix de l'inscription/connexion, inscription, et connexion
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

 const MyEventNavigator = createStackNavigator({
   MyEvent: {
     screen: MyEvent,
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
   }
 })

// Stack pour toutes les pages du profil
const ProfilNavigator = createStackNavigator({
 Profil: {
   screen: ProfilScreen,
   navigationOptions: {
          header: null,
          tabBarIcon: ({ focused, tintColor }) => {
              const iconName = `ios-person${focused ? '' : '-outline'}`;
              return <Ionicons name={iconName} size={25} color={tintColor} />;
          }
      }
 },
 EditProfile: {
   screen: EditProfile,
   navigationOptions: {
     title: 'Modifier ses informations personnelles'
   }
 },
 WhoIsTCM: {
   screen: WhoIsTCM,
   navigationOptions: {
     title: "Qui sommes-nous ?"
   }
 },
 EditPassword: {
   screen: EditPassword,
   navigationOptions: {
     title: 'Modifier son mot de passe'
   }
 },
 Partner: {
   screen: Partner,
   navigationOptions: {
     title: 'Les partenaires'
   }
 },
 ContactUs: {
   screen: ContactUs,
   navigationOptions: {
     title: 'Contactez-nous'
   }
 },
 RGPDCGV: {
   screen: RGPDCGV,
   navigationOptions: {
     title: 'RGPD & CGV'
   }
 }
});

// Stack "générale" qui comprend les trois onglets, et leurs "sous-navigation"
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
 MyEvent: {
   screen: MyEvent,
   navigationOptions: {
          tabBarIcon: ({ focused, tintColor }) => {
              const iconName = `${focused ? 'md-star' : 'md-star-outline'}`;
              return <Ionicons name={iconName} size={25} color={tintColor} />;
          },
          tabBarLabel: 'Mes événements'
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
  Auth: AuthNavigator,
  MainApp: Navigator,
  MyEvent: MyEventNavigator,
  ProfilNav: ProfilNavigator
},
{
  initialRouteName: 'Loading'
});
