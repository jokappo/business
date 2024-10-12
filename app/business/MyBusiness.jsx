import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { bd } from "@/config/FirebaseConfig";
import { useEffect } from 'react'
import BusinessListcard from '../../components/explore/BusinessListcard'


export default function MyBusiness() {
  const {user} = useUser()
  const [businessList, setBusinessList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    user && GetUserBusiness()
  }, [user])
  
  /**
   * utilisé pour recuperer la liste des business selon l'email des utilisateur
   */

  const GetUserBusiness = async () => {
    setLoading(true)
    setBusinessList([])
    const q = query(collection(bd, 'BusinessList'), where('useEmail', '==', user?.primaryEmailAddress?.emailAddress))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(
        (docu) => {
            console.log(user?.primaryEmailAddress?.emailAddress,docu.data())
            setBusinessList(prev => [...prev, {id:docu.id, ...docu.data()}])
        }
    )
    setLoading(false)
  }

  return (
    <View style = {tw` p-6 pt-10`}>
      <Text style = {tw` font-bold text-xl`}>MyBusiness</Text>

      <FlatList
      data={businessList}
      onRefresh={GetUserBusiness}
      refreshing={loading}
      keyExtractor={(index) => index.toString()}
      renderItem={({item}) => <BusinessListcard business={item}/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({})