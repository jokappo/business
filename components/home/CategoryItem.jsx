import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "@/constants/Colors";

export default function CategoryItem({ category, onPressCat }) {
  return (
    <TouchableOpacity onPress={()=>{onPressCat(category)}}>
      <View>
        <View style={tw` p-3 bg-[${Colors.ICONBG}] rounded-full mx-2`}>
          <Image source={{ uri: category.icon }} style={tw` w-10 h-10`} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
