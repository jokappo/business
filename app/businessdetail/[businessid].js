import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { bd } from "@/config/FirebaseConfig";
import tw from 'twrnc'
import Intro from "@/components/businessdetail/Intro";
import ActionButton from "@/components/businessdetail/ActionButton";
import AboutBussiness from "../../components/businessdetail/AboutBussiness";
import Review from "@/components/businessdetail/Review";
import Toast from 'react-native-toast-message';

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    getDetailById();
  }, []);

  /***
   * used to get detail by id
   */
  const getDetailById = async () => {
    setLoading(true);
    const docRef = doc(bd, "BusinessList", businessid);
    const docu = await getDoc(docRef);
    if (docu.exists()) {
      console.log("Document data:", docu.data());
      setBusiness({id:docu.id, ...docu.data()});
      setLoading(false);
    } else {
      // docu.data() will be undefined in this case
      console.log("No such document!");
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size={"large"} style={tw` mt-10`} />
      ) : (
        <View style={tw``}>
          {/* intro */}
            <Intro business = {business}/>
          {/* buttons */}
            <ActionButton business = {business}/>
          {/* about */}
          <AboutBussiness business = {business}/>
          {/* Review */}
          <Review business={business} />
        </View>
      )}
      <Toast />
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({});
