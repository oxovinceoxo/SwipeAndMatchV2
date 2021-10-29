
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeSwipes from "./components/HomeSwipes";
import Accueil from "./components/Accueil";
import EntrepriseForm from "./components/EntrepriseForm";
import InfluenceurForm from "./components/InfluenceurForm";

//lancer: json-server --watch db.json pour la db en json et  expo start pour la simulation web et mobile
//Navigation container est un composant qui gere la navigation et l'etat des composant
//App.js appel les autres composants

const Stack = createNativeStackNavigator();

export default function App() {

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Accueil" component={Accueil}/>
                <Stack.Screen name="EntrepriseForm" component={EntrepriseForm}/>
                <Stack.Screen name="InfluenceurForm" component={InfluenceurForm}/>
                <Stack.Screen name="HomeSwipes" component={HomeSwipes}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}




