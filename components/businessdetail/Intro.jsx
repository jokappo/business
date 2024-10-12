import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { deleteDoc, doc } from "firebase/firestore";
import { bd } from "@/config/FirebaseConfig";
import Toast from "react-native-toast-message";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const router = useRouter();
  const { user } = useUser();

  const onDelete = () => {
    Alert.alert(
      "Supprimer la boutique ???",
      "voulez vous vraiment supprimer la boutique?",
      [
        {
          text: "cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };

  const deleteBusiness = async () => {
    // Delete business logic here
    console.log("delete business");
    await deleteDoc(doc(bd, "BusinessList", business?.id));
    router.back();
    Toast.show({
      type: "success",
      text1: "delete sucess",
      text2: "Tout a ete supprime avec succes ;)",
      position: "top",
    });
  };

  return (
    <View style={tw``}>
      <View
        style={tw` absolute z-10 flex flex-row justify-between w-full pt-10 px-2`}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>

        <Ionicons name="heart-circle-outline" size={40} color="black" />
      </View>

      <Image source={{ uri: business.imageUrl }} style={tw` w-full h-95`} />

      <View
        style={tw` flex flex-row justify-between p-5 -mt-5 bg-white rounded-t-2xl`}
      >
        <View style={tw` pt-5 -mt-5 bg-white rounded-t-2xl`}>
          <Text style={tw`text-3xl font-bold`}>{business.name}</Text>

          <Text style={tw`text-base font-medium text-[${Colors.GRAY}] `}>
            {business.address}
          </Text>
        </View>

        {user?.primaryEmailAddress?.emailAddress == business?.useEmail && 
        <TouchableOpacity
          style={tw`flex items-center justify-center`}
          onPress={() => onDelete()}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
