import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Surface, Text, useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuScreen from '../screens/MenuScreen';
import GroceryScreen from '../screens/GroceryScreen';
import MenuHistoryScreen from '../screens/MenuHistoryScreen';
import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';

type CustomBottomTabNavigatorProps = {loading: boolean; error: string};
const Tab = createMaterialTopTabNavigator();

const CustomBottomTabNavigator = ({
  loading,
  error,
}: CustomBottomTabNavigatorProps) => {
  const {colors} = useTheme();
  if (loading) {
    return (
      <Surface style={styles.loading}>
        <ActivityIndicator />
      </Surface>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        ...styles.container,
      }}>
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => {
            let iconName;

            if (route.name === 'Menu') {
              iconName = 'list-alt';
            } else if (route.name === 'Spesa') {
              iconName = 'shopping-cart';
            } else {
              iconName = 'history';
            }

            return <MaterialIcons name={iconName} size={20} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.onBackground,
          tabBarStyle: {backgroundColor: colors.background},
          tabBarIndicatorStyle: {backgroundColor: colors.primary},
        })}
        sceneContainerStyle={{
          backgroundColor: colors.background,
        }}>
        <Tab.Screen name="Menu" component={MenuScreen} />
        <Tab.Screen name="Spesa" component={GroceryScreen} />
        <Tab.Screen name="Archivio" component={MenuHistoryScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomBottomTabNavigator;
