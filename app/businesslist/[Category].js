import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import tw from "twrnc";
import { bd } from "@/config/FirebaseConfig";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";

export default function BusinessListByCategory() {
  const [businessList, setBusinessList] = useState([]);

  // voir l"entete
  const navigation = useNavigation();
  const { Category } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: Category,
      headerBackTitle: "Retour",
    });
    getBusinessList();
  }, []);

  /***
   * pour afficher les choses par category
   */

  const getBusinessList = async () => {
    setLoading(true);
    const q = query(
      collection(bd, "BusinessList"),
      where("category", "==", Category)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docu) => {
      console.log(docu.data());
      setBusinessList((prev) => [...prev, {id : docu.id, ...docu.data()}]);
    });
    setLoading(false)
  };

  return (
    <View>
      {businessList?.length > 0 && loading == false ? 
        <FlatList
          data={businessList}
          onRefresh={getBusinessList}
          refreshing = {loading}
          showsVerticalScrollIndicator={false}
          style={tw``}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} index={index} />
          )}
        />
       : 
        loading ? <ActivityIndicator
        size={'large'}/> :
        <Text
          style={tw` text-center mt-60 text-xl text-[${Colors.GRAY}] text-opacity-50 `}
        >
          Pas de commerce ici pour le moment
        </Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({});
