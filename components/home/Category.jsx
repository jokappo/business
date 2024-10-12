import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import tw from "twrnc";
import { bd } from "@/config/FirebaseConfig";
import { Colors } from "@/constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category({explore = false, onCategorySelect}) {
  const [categories, setCategories] = React.useState([]);
  const router = useRouter()

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    setCategories([])
    const q = query(collection(bd, "Category"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docu) => {
      console.log(docu.data());
      setCategories(prev =>[...prev, docu.data()]);
    });
  };

  const onCategoryPressHandle = (item) => {
    if (!explore) {
      router.push('/businesslist/' + item.name)
    }
    else 
    {
      onCategorySelect(item.name)
    }
  }

  return (
    <View>
      {!explore && 
      <View style={tw`mt-2 p-4  flex flex-row justify-between items-center`}>
        <Text style={tw`text-lg font-bold`}>Category</Text>
        <Text style={tw`text-[${Colors.GRAY}] font-medium`}>View All</Text>
      </View>
      }
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw` `}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <CategoryItem 
        category={item}
        key={index}
        onPressCat={(category) => 
          onCategoryPressHandle(item)} />}
      />

    </View>
  );
}

const styles = StyleSheet.create({});
