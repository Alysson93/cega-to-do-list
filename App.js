import React, {useState,useEffect} from 'react';
import {View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './components/Main';
import CriaTask from './components/CriaTask';
import EditaTask from './components/EditaTask';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cega To do list" component={Main} />
        <Stack.Screen name="Criar task" component={CriaTask} /> 
        <Stack.Screen name="Editar task" component={EditaTask} />            
      </Stack.Navigator>
    </NavigationContainer>   
  );
}