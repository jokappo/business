import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import MenuList from '../../components/profile/MenuList';
import UserIntro from '../../components/profile/UserIntro';
import { Colors } from "@/constants/Colors";
import { useUser } from '@clerk/clerk-expo';


export default function Profil() {

  return (
    <View style={tw` p-6 pt-10`}>

      <Text style={tw` text-2xl font-bold`}>User Profile</Text>

      {/* userIntro */}
      <UserIntro/>

      {/* SearchBar */}
      <MenuList/>

    </View>
  )
}

const styles = StyleSheet.create({})