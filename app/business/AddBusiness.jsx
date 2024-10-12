import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
  } from "react-native";
  import RNPickerSelect from "react-native-picker-select";
  import React, { useEffect, useState } from "react";
  import * as ImagePicker from "expo-image-picker";
  import { bd } from "@/config/FirebaseConfig";
  import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
  } from "firebase/firestore";
  import tw from "twrnc";
  import { Colors } from "@/constants/Colors";
  import { storage } from "../../config/FirebaseConfig";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import { useUser } from "@clerk/clerk-expo";
  import Toast from "react-native-toast-message";
  
  export default function AddBusiness() {
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [contact, setContact] = useState(null);
    const [website, setWebsite] = useState(null);
    const [about, setAbout] = useState(null);
    const [category, setCategory] = useState(null);
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      GetCategoryList();
    }, []);
  
    const onImagePick = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      } else {
        alert("You did not select any image.");
      }
    };
  
    const GetCategoryList = async () => {
      setCategories([]);
      try {
        const q = query(collection(bd, "Category"));
        const snapShot = await getDocs(q);
        snapShot.forEach((docu) => {
          setCategories((prev) => [
            ...prev,
            {
              label: docu.data().name,
              value: docu.data().name,
            },
          ]);
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };
  
    const addNewBusiness = async () => {
      if (!name || !address || !contact || !image || !category) {
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: "Vous devez remplir tous les champs 😔",
          position: "bottom",
        });
        return;
      }
      setLoading(true);
      try {
        const fileName = Date.now().toString() + ".jpg";
        const resp = await fetch(image);
        const blob = await resp.blob();
        const imageRef = ref(storage, "business-app/" + fileName);
  
        await uploadBytes(imageRef, blob);
        const downloadUrl = await getDownloadURL(imageRef);
        await saveBusinessDetail(downloadUrl);
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image :", error);
      } finally {
        setLoading(false);
      }
    };
  
    const saveBusinessDetail = async (imageUrl) => {
      try {
        await setDoc(doc(bd, "BusinessList", Date.now().toString()), {
          name,
          address,
          contact,
          about,
          website,
          category,
          userName: user?.fullName,
          useEmail: user?.primaryEmailAddress?.emailAddress,
          imageUrl,
          userImage: user?.imageUrl,
        });
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: "Business ajouté avec succès 👌",
          position: "bottom",
        });
  
        // Réinitialiser les champs
        setName(null);
        setAddress(null);
        setContact(null);
        setImage(null);
        setWebsite(null);
        setAbout(null);
        setCategory(null);
      } catch (error) {
        console.error("Erreur lors de l'ajout du business :", error);
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: "Erreur lors de l'ajout du business 😔",
          position: "bottom",
        });
      }
    };
  
    return (
      <View style={tw` p-5`}>
        <Text style={tw` font-bold text-xl`}>Add New Business</Text>
        <Text style={tw` text-gray-400`}>
          Fill all details to add new business
        </Text>
  
        <TouchableOpacity onPress={() => onImagePick()}>
          {!image ? (
            <Image
              source={require("@/assets/images/placeholder.png")}
              style={tw` w-32 h-32 mt-3`}
            />
          ) : (
            <Image source={{ uri: image }} style={tw`  h-32 mt-3 rounded-xl`} />
          )}
        </TouchableOpacity>
  
        <View>
          <TextInput
            placeholder="name"
            placeholderTextColor="gray"
            onChangeText={(v) => setName(v)}
            style={tw` mt-5 p-2 rounded-lg text-lg border border-gray-400 h-12`}
          />
  
          <TextInput
            placeholder="address"
            placeholderTextColor="gray"
            onChangeText={(v) => setAddress(v)}
            style={tw` mt-5 p-2 rounded-lg text-lg border border-gray-400 h-12`}
          />
  
          <TextInput
            placeholder="contact"
            keyboardType="numeric"
            placeholderTextColor="gray"
            onChangeText={(v) => setContact(v)}
            style={tw` mt-5 p-2 rounded-lg text-lg border border-gray-400 h-12`}
          />
  
          <TextInput
            placeholder="website"
            autoCapitalize="none"
            placeholderTextColor="gray"
            onChangeText={(v) => setWebsite(v)}
            style={tw` mt-5 p-2 rounded-lg text-lg border border-gray-400 h-12`}
          />
  
          <View
            style={tw` mt-5 p-3 rounded-lg text-xl border border-gray-400 h-12`}
          >
            <RNPickerSelect
              onValueChange={(value) => setCategory(value)}
              items={categories}
              style={{
                inputIOS: { fontSize: 17 },
                inputAndroid: { fontSize: 17 },
              }}
            />
          </View>
  
          <TextInput
            placeholder="about"
            multiline
            numberOfLines={5}
            placeholderTextColor="gray"
            onChangeText={(v) => setAbout(v)}
            style={tw` mt-5 p-2 h-20 rounded-lg text-lg border border-gray-400 `}
          />
  
          <View style={tw` flex items-center `}>
            <TouchableOpacity
              disabled={loading}
              onPress={() => addNewBusiness()}
              style={tw`mt-5 p-4 rounded-lg w-2/3 border border-[${Colors.PRIMARY}] bg-[${Colors.PRIMARY}]`}
            >
              {loading ? (
                <ActivityIndicator size={"large"} color={"#fff"} />
              ) : (
                <Text style={tw` text-white text-center font-semibold`}>
                  Add New Business
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Toast/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({});
  