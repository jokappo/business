import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function PopularBusinessCards({ business }) {
  const router = useRouter()
  return (
    <TouchableOpacity 
    onPress={()=>router.push('/businessdetail/'+business.id)}
    style={tw` p-2 m-2 rounded-lg bg-white`}>
      <Image
        source={{ uri: business?.imageUrl }}
        style={tw` w-70 h-40 rounded-md`}
      />

      <View style={tw``}>
        <Text style={tw` text-base font-bold`}>{business.name}</Text>
        <Text style={tw` text-xs text-[${Colors.GRAY}] `}>
          {business.address}
        </Text>
        <View style={tw` flex flex-row justify-between`}>
          <View style={tw` flex flex-row items-center gap-1`}>
            <Image
              source={require("@/assets/images/star.png")}
              style={tw` w-3 h-3`}
            />
            <Text style={tw``}>4.5</Text>
          </View>
          <Text style={tw` text-xs text-white bg-[${Colors.PRIMARY}] p-1 rounded-lg overflow-hidden`}>{business.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
