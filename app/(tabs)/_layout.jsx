import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from './../../constants/Colors'

export default function TabLayout() {
  return (
    
    <Tabs screenOptions={{
      headerShown : false,
      tabBarActiveTintColor : Colors.PRIMARY,
      tabBarInactiveTintColor : Colors.INACTIV
      }}>
      <Tabs.Screen name='Home' options={
        {
          tabBarLabel : 'Home',
          tabBarIcon : ({color}) => <Ionicons name="home" 
          size={24} color={color} />
        }
      }/>
      <Tabs.Screen name='Explore' options={
        {
          tabBarLabel : 'Explore',
          tabBarIcon : ({color}) => <Ionicons name="search" 
          size={24} color={color} />
        }
      }/>
      <Tabs.Screen name='Profil' options={
        {
          tabBarLabel : 'Profil',
          tabBarIcon : ({color}) => <Ionicons name="people-circle-outline" 
          size={24} color={color} />
        }
      }/>
    </Tabs>
  )
}

const styles = StyleSheet.create({})