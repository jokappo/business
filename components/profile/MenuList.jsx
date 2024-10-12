import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useAuth } from '@clerk/clerk-expo';

export default function MenuList() {
  const {signOut} = useAuth()

    const router = useRouter();

    const menuList = [
        {
            id: 1,
            name: "Add Business",
            icon: require('@/assets/images/add.png'),
            path: "/business/AddBusiness",
        },
        {
            id: 2,
            name: "My Business",
            icon: require('@/assets/images/business-and-trade.png'),
            path: "/business/MyBusiness",
        },
        {
            id: 3,
            name: "Share App",
            icon: require('@/assets/images/share_1.png'),
            path: "share",
        },
        {
            id: 4,
            name: "Logout",
            icon: require('@/assets/images/logout.png'),
            path: "logout",
        }
    ];

    const onMenuClick = (item) => {
      if(item.path === "share"){
        Share.share({
          message: 'telechargez votre app de gestion de boutique par JOKAPPO ;)',
        })
        return
      }
      if (item.path === "logout") {
        signOut()
        return
      }

        router.push(item.path);
    }

  return (
    <View 
    style={tw` mt-14`}>
      <FlatList
        data={menuList}
        numColumns={2}
        keyExtractor={(index) => index.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={()=>onMenuClick(item)}
           style={tw` flex-1 flex-row items-center gap-2 p-2 border-2 border-slate-400 rounded-xl m-2 bg-slate-200`}>
            <Image source={item.icon} style={tw`w-15 h-15`} />
            <Text style={tw` flex-1 font-medium text-base`}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={tw` text-center mt-10 text-gray-500`}>developed by JOKAPPO @ 2024</Text>

      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({})