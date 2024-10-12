import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import tw from "twrnc";
import { Colors } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  const { user } = useUser();

  return (
    <View style={tw` p-6 pt-15 bg-[${Colors.PRIMARY}] rounded-b-xl`}>
      <View style={tw` flex flex-row items-center gap-2`}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={tw` w-10 h-10 rounded-full`}
        />

        <View>
          <Text style={tw` text-white `}>Welcome</Text>
          <Text style={tw` text-base font-medium text-white `}>
            {user?.fullName}
          </Text>
        </View>
      </View>

      <View style = {tw` flex flex-row gap-2 items-center bg-white p-2 my-2 mt-4 rounded-2xl`}>
      <Ionicons name="search" size={24} color={Colors.PRIMARY} />
      <TextInput
       placeholder="search..."/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
