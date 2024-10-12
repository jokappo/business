import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Header from '../../components/home/Header'
import Slider from '../../components/home/Slider'
import Category from '../../components/home/Category'
import PopularBusiness from '../../components/home/PopularBusiness'

export default function Home() {
  return (
    <ScrollView style = {tw``}>
      {/* header */}
        <Header/>
      {/* sidebar */}
        <Slider/>
      {/* category */}
        <Category/>
      {/* popular list */}
      <PopularBusiness/>

      <View style={tw`h-10`}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})