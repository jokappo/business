import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Share } from "react-native";
import React from "react"
import tw from 'twrnc'
import { Linking } from "react-native";

export default function ActionButton({ business }) {
    const actionButtonMenu = [
        {
            id: 1,
            name: "call",
            icon: require('@/assets/images/call.png'),
            url: "tel:" + business?.contact,
        },
        {
            id: 2,
            name: "location",
            icon: require('@/assets/images/pin.png'),
            url: "https://www.google.com/maps/search/?api=1&query=" + business?.address,
        },
        {
            id: 3,
            name: "web",
            icon: require('@/assets/images/web.png'),
            url: business?.website,
        },
        {
            id: 4,
            name: "share",
            icon: require('@/assets/images/share.png'),
            url: "tel:" + business?.contact,
        }
    ];

    const handleOnpress = (item)=>{
        if (item.name === "share") {
            Share.share(
                {
                    message: business?.name + "\n Address : " + business?.address + '\n plus de detail dans business directory app by Gédéon...',
                }
            )
            return;
        }
        Linking.openURL(item.url)
    }

    return (
        <View style={tw`bg-white p-5`}>
            <FlatList
                data={actionButtonMenu}
                numColumns={4}
                scrollEnabled={false}
                columnWrapperStyle = {{justifyContent : 'space-between'}}
                renderItem={({ item, index }) => (
                    
                        <TouchableOpacity key={index} style={tw` `}
                            onPress={() => handleOnpress(item)}
                        >
                            <Image source={item.icon} style={tw`w-15 h-15`} />
                            <Text style={tw`text-sm text-center mt-3`}>{item.name}</Text>

                        </TouchableOpacity>

                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({});
