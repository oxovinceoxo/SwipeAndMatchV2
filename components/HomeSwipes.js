import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import axios from "axios";
import Swipes from "./Swipes";
import TopBar from "./TopBar";


/*
1 - installer expo : npm install --global expo-cli  et check la version expo -V + init projet : expo init my-project
2 - installer react native gesture handler : expo install react-native-gesture-handler
3 - installer axios requète http :  npm i axios
 */

function HomeSwipes(){

    //Tableau vide des utilisateurs
    //const utilisateurs = [] et son mutateur (setter) pour modifier l'etat locale de utilisateurs[]
    const [utilisateurs, setUtilisateurs] = useState([]);
    //Utilisateur courant = entier (integer) = 0 et son mutateur pour modifier l'index du tableau utilisateurIndex = 0
    const [utilisateurIndex, setUtilisateurIndex] = useState(0);

    //Fonction recup des utilisateurs via API REST et axios + methode GET + url
    //Retourne une promesse avec 2 elements (resolve (.then()) si la promesse est tenue et reject si il a une erreur (.catch())
    function getUtilisateurs() {
        axios.get("https://randomuser.me/api/?gender=female&results=50")
            .then(res => {
                //On rempli le tableau des utilisateurs avec les données de API json grace au mutateur (setter) hook react setUtilisateur (on passe les données en paramètres)
                setUtilisateurs(res.data['results']);
                //Debug f12 en mode web (npm run web ou expo start + Run in web Browser)
                //console.log(res.data['results']);
            })
            .catch(err => {
                //Si la requète plante on affiche une erreur
                //Ici une alerte popup
                //Alert.alert('Erreur de requète HTTP', '', [{ text: 'Recommencer', onPress: () => fetchUsers() }])
                console.log("Erreur " + err)
            })
    }

    //Cycle de vie apres React.componentDidMount() (apres le 1er render) pour les classes et React.useEffect() pour les fonctions et les hooks
    useEffect(() => {
        getUtilisateurs();
    }, [])
    //On jaoute un tableau vide a la fin pour eviter les rendus infinis

    //Fonction de rendus des utilisateurs

    const listUtilisateurs = () => {
        //Si la longueur du tableau est > a 1 on boucle (avec .map()) sur les elements du tableau et on recup un index pour avoir une cle unique
        return utilisateurs.length > 1 && utilisateurs.map((element, index) => {
            return (
                utilisateurIndex === index && (
                    <View key={index} style={styles.swipes}>
                        {
                            //Si utilisateur index = index on appel une vue et le composant Swipes.js
                            //On passe des paramètres soit : l'index + le tableau d'utilisateur + les fonctions handleLike et passe (qui incremente utilisateurIndex)
                            //Ces options sont passées en paramètre lors de la creation de la fonction pour recuperer les valeurs du composant parent
                            //function Swipes({utilisateurs, utilisateurIndex, handleLike, handlePasse})
                            //Donc le composant Swipes.js a acces aux variables et aux fonctions de App.js (son parent)
                        }
                        <Swipes
                            utilisateurIndex={utilisateurIndex}
                            utilisateurs={utilisateurs}
                            handleLike={handleLike}
                            handlePasse={handlePasse}
                        >
                        </Swipes>
                    </View>
                )
            );
        });
    };

    //Si on like (Swipe a Droite) : on appel la fonction utilisateurSuivant();
    function handleLike(){
        console.log("LIKE");
        utilisateurSuivant();
    }

    //Si on passe (Swipe a Gauche) : on appel la fonction utilisateurSuivant();
    function handlePasse(){
        console.log("PASSE");
        utilisateurSuivant();
    }


    //Utilisateur suivant
    function utilisateurSuivant(){
        /*
        Ici un ternaire qui est egale a :
        if(utilisateur.length - 2 === utilisateurIndex){
            utilisateurIndex = 0;
        }else{
            utilisateurIndex += 1;
        }
        En gros Quand on Swipe in incremente utilisateurIndex pour passer a l'elements suivant du tableau
        Le random est fait a l'aide de API : https://randomuser.me/api/?gender=female&results=50 qui s'appel randomuser.me
         */
        const indexSuivant = utilisateurs.length - 2 === utilisateurIndex ? 0 : utilisateurIndex + 1;
        //On change l'etat locale de utilisateurIndex a l'aide de son mutateur (setter = setUtilisateurIndex) et on passe l'element suivant en paramètre
        setUtilisateurIndex(indexSuivant);
        //Devug sur navigateur f12
        console.log(indexSuivant);
    }

    //Le JSX
    return (
        <View style={styles.container}>
            {
                //Appel du composant TopBar.js + la fonction qui boucle sur le tableau des utilisateurs
            }
            <TopBar/>
            {listUtilisateurs()}
        </View>

    );
}


//Du css a appelé dans les balises a l'aide style={styles.nom de la propriétée css} ou style={{ exemple backgroundColor: "#456789"}}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        margin: 10
    },
    swipes: {
        flex:1,
        padding:10,
    },
});

export default HomeSwipes