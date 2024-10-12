import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import { Rating } from "react-native-ratings";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import tw from "twrnc";
import { Colors } from "@/constants/Colors";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { bd } from "@/config/FirebaseConfig";
import Toast from 'react-native-toast-message'; // Remplacer ToastAndroid par Toast


export default function Review({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState();
  const { user } = useUser();

  const onSubmit = async () => {
    try {
      const docRef = doc(bd, "BusinessList", business?.id);
      const reviewData = {
        rating: rating,
        userName: user?.fullName || "Utilisateur anonyme",  // Nom par défaut si non défini
        user: user?.primaryEmailAddress?.emailAddress || "Email non disponible",        // Email par défaut
        comment: userInput || "Pas de commentaire",         // Commentaire par défaut si vide
        userImage: user?.imageUrl || null,                  // Null si pas d'image
      };
  
      await updateDoc(docRef, {
        Review: arrayUnion(reviewData),
      });

      // Utiliser Toast pour afficher le message de succès
      Toast.show({
        type: 'success',
        text1: 'Succès',
        text2: 'Commentaire envoyé avec succès 👌',
        position: 'bottom',
      });
      setUserInput('')
      //ToastAndroid.show('Commentaire envoyé avec succès', ToastAndroid.SHORT);
      console.log(user?.fullName, 'comment : ', userInput, ' , ', rating);
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire :", error);
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: "Erreur lors de l'envoi du commentaire 😔",
        position: 'bottom',
      });
      //ToastAndroid.show("Erreur lors de l'envoi du commentaire", ToastAndroid.LONG);
    }
  };
  

  return (
    <View style={tw`bg-white p-5 flex-1`}>
      <Text style={tw`font-bold text-xl`}>Review</Text>

      <View>
        <Rating
          showRating={false}
          imageSize={30}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
          fractions={2}
        />
        <TextInput
          multiline
          onChangeText={(value) => setUserInput(value)}
          numberOfLines={4}
          placeholder="Saisir votre commentaire"
          style={[
            tw`p-5 border border-gray-400 rounded-md`,
            { textAlignVertical: "top" },
          ]}
          value={userInput}
        />
        <TouchableOpacity
          disabled={!userInput}
          onPress={() => onSubmit()}
          style={[
            tw`rounded-lg p-3 mt-3`,
            userInput ? tw`bg-[${Colors.PRIMARY}]` : tw`bg-gray-300`,
          ]}
        >
          <Text style={tw`text-lg text-center text-white`}>Envoyer</Text>
        </TouchableOpacity>
      </View>

      {/* display previous review */}
      <View >
        {business?.Review?.map((item, index)=>(
          <View key={index} style={tw`flex flex-row mb-2 mt-2 gap-2 items-center p-2 border border-[${Colors.PRIMARY}] rounded-xl`} >
            <Image source={{uri:item.userImage}}
            style={tw` w-12 h-12 rounded-full`}/>
            <View style={tw` flex`}>
              <Text style={tw`font-bold text-lg mb-1`}>{item.userName}</Text>
              <Rating
              startingValue={item.rating}
              readonly
              imageSize={20}
              fractions={2}
              style = {{alignSelf : 'flex-start', marginBottom:5}}
              />
              <Text>{item.comment}</Text>
            </View>

          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
