import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Colors } from "@/constants/Colors";
import React from 'react'
import tw from 'twrnc'
import { useRouter } from 'expo-router';

export default function BusinessListCard({business}) {
  const router = useRouter()

  return (
    <TouchableOpacity 
    onPress={()=> router.push('/businessdetail/' + business.id)}
    style={tw` flex flex-row gap-2 p-2 m-2 rounded-xl bg-slate-200 `}>
      <Image source={{ uri: business.imageUrl }} style={tw` w-30 h-30 rounded-lg `} />
      <View style={tw` flex-1`}>
        <Text style={tw` font-bold text-lg`}>{business.name}</Text>
        <Text style={tw`text-[${Colors.GRAY}] text-base`}>{business.address}</Text>
        <View style={tw` flex flex-row items-center gap-1`}>
            <Image
              source={require("@/assets/images/star.png")}
              style={tw` w-3 h-3`}
            />
            <Text style={tw``}>4.5</Text>
          </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})