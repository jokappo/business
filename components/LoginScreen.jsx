import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import * as WebBrowser from 'expo-web-browser'
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import {useWarmUpBrowser} from "@/hooks/useWarmUpBrowser"
import { Colors } from '@/constants/Colors'


WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = 
        await startOAuthFlow()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <View style = {tw``}>
      <View style = {tw` flex items-center`}>
        <Image 
        style = {tw` w-50 h-120 mt-20 rounded-2xl border-4 border-black`}
        source={require('./../assets/images/login.png')}/>
      </View>

      <View style = {tw``}>
        <Text style = {tw`pt-4 bg-white text-center text-3xl font-extrabold -mt-10`}>
          your ultimate
          <Text style = {tw` text-[${Colors.PRIMARY}]`}> community business directory </Text>
          app
        </Text>
        <Text style = {tw` text-[${Colors.GRAY}] text-center p-3`}>finf your favorite business near you and post your own business to your community</Text>
      </View>

      <TouchableOpacity
      onPress={onPress}
      style = {tw` bg-[${Colors.PRIMARY}]  h-20 rounded-full p-5 m-4 `}>
        <Text style = {tw` text-center text-3xl text-white`}>
          let's get started
        </Text>
      </TouchableOpacity>
      
    </View>
  )
}