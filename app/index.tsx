import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import tw from 'twrnc'

export default function Index() {
  return <Redirect href={'/Home'}></Redirect>
}
