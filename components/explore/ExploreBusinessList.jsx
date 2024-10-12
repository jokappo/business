import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import BusinessListcard from './BusinessListcard'

export default function ExploreBusinessList({businessList}) {
  return (
    <ScrollView style={tw` mt-4`}>
        <FlatList
        data={businessList}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <BusinessListcard business={item}/>
        )}
        />
        <View style={tw` h-46`}>

        </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({})