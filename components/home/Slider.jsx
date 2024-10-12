import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { bd } from "@/config/FirebaseConfig";
import tw from 'twrnc'

export default function Slider() {
    const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
          setSliderList([])
    try {
      console.log("Getting Slider List...");
      const q = query(collection(bd, "slider"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      querySnapshot.forEach((docu) => {
        console.log(docu.data());
        setSliderList(prev => [...prev, docu.data()]);
    });

    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  return (
    <View>
      <Text style = {tw` font-bold text-xl pt-3 pl-2 mb-2`}>
        #specialement pour vous
      </Text>

      <FlatList
      horizontal
      data={sliderList}
      showsHorizontalScrollIndicator = {false}
      style = {tw` pl-4`}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item})=>(
        <Image source={{uri : item.imageUrl}}
        style = {tw` h-38 w-70 rounded-lg mr-3`}/>
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
