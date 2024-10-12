import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Category from '../../components/home/Category'
import { Colors } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, Query, query, where } from 'firebase/firestore';
import { bd } from "@/config/FirebaseConfig";
import { useState, useEffect } from 'react';
import ExploreBusinessList from '../../components/explore/ExploreBusinessList';

export default function Explore() {

  const [businessList, setBusinessList] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    //mettre un delai
    const rebour = setTimeout(() => {
      searchBusiness() //appel de la fonction de recherche
    }, 500);
    return () => {
      clearTimeout(rebour) // netoyer le timeout si l'utilisateur continu de taper
    }
  }, [search])
  

  const searchBusiness = async () => {
    if (!search) {
      setBusinessList([]);
      return;
    }
    //Requête Firestore pour chercher les noms de boutiques qui contiennent la valeur de searchQuery
    const q = query(
      collection(bd, "BusinessList"),
      where("name", ">=", search),
      where("name", "<=", search + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);

    setBusinessList([])
    querySnapshot.forEach((docu)=>{
      setBusinessList(prev => [...prev, {id : docu.id, ...docu.data()}])
    })
  };

  const GetBusinessByCategory = async (category) => {
    setBusinessList([])
    const q = query(collection(bd, 'BusinessList'), where("category", "==", category))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((docu)=>{
      console.log('explore ',docu.data())
      setBusinessList(prev => [...prev, {id : docu.id, ...docu.data()}])
    })
  }

  return (
    <View style={tw` p-6 pt-10`}>
      <Text style={tw` font-bold text-2xl`}>Explore more</Text>

      {/* SearchBar */}

      <View style = {tw` flex flex-row gap-2 items-center bg-white p-2 my-4 mt-4 rounded-2xl border-2 border-[${Colors.PRIMARY}]`}>
      <Ionicons name="search" size={24} color={Colors.PRIMARY} />
      <TextInput
      style={tw` flex-1 p-2`}
      placeholder="Search for a business"
      value={search}
      onChangeText={(value)=> setSearch(value)}
       />
      </View>

      {/* Category */}

      <Category explore = {true} onCategorySelect={Category => GetBusinessByCategory(Category) }/>

      {/* BusinessList */}

        <ExploreBusinessList businessList={businessList} />

    </View>
  )
}

const styles = StyleSheet.create({})