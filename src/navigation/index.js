import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../Screens/Splash';
import Sounds from '../Screens/bottomNavigation/bottomTabs/Sounds/Sound';
import Categories from '../Screens/bottomNavigation/bottomTabs/Categories/Categories';
import Setting from '../Screens/bottomNavigation/bottomTabs/Settings/Settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import variables from '../util/variables';
import PrivacyPolicy from '../Screens/bottomNavigation/bottomTabs/Settings/PrivacyPolicy';
import AboutUs from '../Screens/bottomNavigation/bottomTabs/Settings/AboutUs';
import {width_screen} from '../util/common/dimensions';
import {Image, StyleSheet} from 'react-native';
import Favourites from '../Screens/bottomNavigation/favourites/Favourites';
import {
  Categories_icon,
  Favourite_icon,
  Favourite_outline_icon,
  Settings_icon,
  Sounds_icon,
} from '../constants/constants';
import CustomTabBar from '../Screens/bottomNavigation/bottomTabs/CustomBottomTab';

const SplashNavigator = createStackNavigator();
const MainNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const SettingsNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabItems = [
  {
    name: 'CategoryTab',
    comp: Categories,
    icon: 'md-folder-open',
  },
  {
    name: 'SoundsTab',
    comp: Sounds,
    icon: 'musical-note',
  },
  {
    name: 'SettingTab',
    comp: Setting,
    icon: 'md-settings',
  },
];
function BottomTabs({route}) {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{headerShown: false}}
      initialRouteName="Category"
      activeColor={variables.colorWhite}
      inactiveColor={'#ffffff75'}
      labeled={true}
      shifting={false}
      barStyle={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name={'CategoryTab'}
        component={Categories}
        options={{
          tabBarLabel: 'Home',

          tabBarIcon: ({focused, color}) => (
            <Image
              source={Categories_icon}
              style={[
                styles.tabIcon,
                {
                  tintColor: focused
                    ? variables.colorWhite
                    : variables.colorWhiteDim,
                },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'FavouritesTab'}
        component={Favourites}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={!focused ? Favourite_icon : Favourite_outline_icon}
              style={[
                styles.tabIcon,
                {
                  tintColor: focused
                    ? variables.colorWhite
                    : variables.colorWhiteDim,
                },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'SoundsTab'}
        component={Sounds}
        options={{
          tabBarLabel: 'Sounds',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={Sounds_icon}
              style={[
                styles.tabIcon,
                {
                  tintColor: focused
                    ? variables.colorWhite
                    : variables.colorWhiteDim,
                },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'SettingTab'}
        component={Setting}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={Settings_icon}
              style={[
                styles.tabIcon,
                {
                  tintColor: focused
                    ? variables.colorWhite
                    : variables.colorWhiteDim,
                },
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function SplashStackNavigator() {
  return (
    <SplashNavigator.Navigator>
      <SplashNavigator.Screen
        options={{headerShown: false}}
        name="Splash"
        component={Splash}
      />
    </SplashNavigator.Navigator>
  );
}
function MainStackNavigator() {
  return (
    <MainNavigator.Navigator>
      <MainNavigator.Screen
        options={{headerShown: false}}
        name="BottomTabs"
        component={BottomTabs}
      />
      <MainNavigator.Screen
        options={{headerShown: false}}
        name="Settings"
        component={Setting}
      />
      <MainNavigator.Screen
        options={{
          headerTitle: 'Privacy Policy',
          headerShown: true,

          headerStyle: {
            backgroundColor: '#061431',
            elevation: 0,
          },
          headerTitleStyle: {
            color: variables.colorWhite,
            left: '50%',
          },
          headerTintColor: variables.colorWhite,
        }}
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
      <MainNavigator.Screen
        options={{
          headerShown: false,
        }}
        name="AboutUs"
        component={AboutUs}
      />
    </MainNavigator.Navigator>
  );
}
function HomeStackNavigator() {
  return (
    <HomeNavigator.Navigator>
      <HomeNavigator.Screen
        options={{headerShown: false}}
        name="Categories"
        component={Categories}
      />
      <HomeNavigator.Screen
        options={{headerShown: false}}
        name="Sounds"
        component={Sounds}
      />
    </HomeNavigator.Navigator>
  );
}
function SettingStackNavigator() {
  return (
    <SettingsNavigator.Navigator>
      <SettingsNavigator.Screen
        options={{headerShown: false}}
        name="Settings"
        component={Setting}
      />
    </SettingsNavigator.Navigator>
  );
}

function AppNavigator({splash}) {
  return splash ? <SplashStackNavigator /> : <MainStackNavigator />;
}

export default AppNavigator;

const styles = StyleSheet.create({
  tabBar: {},
  tabIcon: {
    height: 30,
    width: 30,
    bottom: 5,
    resizeMode: 'contain',
  },
});
