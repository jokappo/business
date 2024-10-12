import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useRouter } from 'expo-router'

export default function BusinessListcard({business}) {
    const router = useRouter()
  return (
    <TouchableOpacity 
    onPress={()=>router.push('/businessdetail/'+business?.id)}
    style={tw` bg-white mt-2 rounded-xl`}>
        <Image source={{ uri: business?.imageUrl }} style={tw` w-full h-45 rounded-t-xl mt-2`} />
        <View style={tw` p-2`}>
            <Text style={tw`text-lg font-bold text-gray-800`}>{business?.name}</Text>
            <Text style={tw`text-sm text-gray-500`}>{business?.address}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})