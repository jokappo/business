import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { Colors } from "@/constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { bd } from "@/config/FirebaseConfig";
import PopularBusinessCards from "./PopularBusinessCards";

export default function PopularBusiness() {
    const [popularBusiness, setPopularBusiness] = useState([]);
  useEffect(() => {
    GetBusinessList();
  }, []);

  const GetBusinessList = async () => {
    setPopularBusiness([])
    const q = query(collection(bd, "BusinessList"), limit(10));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docu) => {
      console.log(docu.data());
      setPopularBusiness((prev) => [...prev, {id:docu.id, ...docu.data()}]);
    });
  };
  return (
    <View>
      <View style={tw`mt-2 pl-4  flex flex-row justify-between items-center`}>
        <Text style={tw`text-lg font-bold`}>Popular Business</Text>
        <Text style={tw`text-[${Colors.GRAY}] font-medium`}>View All</Text>
      </View>
      <FlatList
        data={popularBusiness}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw``}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <PopularBusinessCards 
        business={item}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
