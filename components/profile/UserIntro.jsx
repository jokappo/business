import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import tw from 'twrnc'

export default function UserIntro() {

    const {user} = useUser()

  return (
    <View style={tw` flex items-center justify-center mt-20`}>
      <Image
          source={{ uri: user?.imageUrl }}
          style={tw` w-30 h-30 rounded-full`}
        />

            <Text style={tw`text-lg font-bold pt-5`}>{user?.fullName}</Text>
            <Text style={tw`text-base text-gray-400 pt-2`}>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})