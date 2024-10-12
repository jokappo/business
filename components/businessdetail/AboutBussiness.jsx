import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

export default function AboutBussiness({business}) {
  return (
    <View style={tw` p-5 bg-white `}>
      <Text style={tw` font-bold text-xl`}>About</Text>
      <Text style={tw` leading-relaxed text-base`}>{business.about}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})