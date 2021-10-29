import React from "react";
import {View, Text, Image,StyleSheet} from "react-native";

//recup des valeurs du composant Swipes.js
function SwipeableImage({utilisateur, vaAimer, vaPasser}){
    return(
        <View>
            {
                //Url de l'image
            }
            <Image source={{uri: utilisateur.picture.large}} style={styles.photo}/>

            {
                //Si on swipe a droite on affiche LIKE
            }

            {vaAimer && (
                <View style={styles.likeBox}>
                    <Text style={styles.textPrimary}>LIKE</Text>
                </View>
            )}

            {
                //Si on swipe a gauche on affiche PASSER
            }

            {vaPasser && (
                <View style={styles.passeBox}>
                    <Text style={styles.textPrimary}>PASSER</Text>
                </View>
            )}

            <View>
                {
                    //Le nom et prenom + age + ville (depuis API randomuser
                }


                <View style={styles.textRow}>
                    <Text style={styles.textPrimary}>{utilisateur.name.first} {utilisateur.name.last}</Text>
                </View>
                <View>
                    <Text style={styles.textSecondary}>{utilisateur.dob.age} ans</Text>
                    <Text style={styles.textSecondary}>Ville : {utilisateur.location.city}</Text>
                </View>
            </View>
        </View>
    )
}

//Propriété css parente appelée dans les enfants a l'ai de heritage css ...boxStyle
const boxStyle = {
    position: 'absolute',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    //borderRadius:10,
    borderWidth:5
}


const styles = StyleSheet.create({
    likeBox:{
        ...boxStyle,
        left:100,
        top:100,
        borderColor: '#657a4a',
        backgroundColor:'#657a4a',
        color:'white',
        textAlign:'center'
    },

    passeBox:{
        ...boxStyle,
        left:100,
        top:100,
        textAlign:"center",
        borderColor: '#853c3c',
        backgroundColor:'#853c3c',
        color:'white'
    },
    photo:{
        height:'75%',
        resizeMode:"cover",
        borderRadius:20,
        marginTop:20
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textPrimary: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign:'center'
    },
    textSecondary: {
        color: '#747478',
        marginLeft: 10,
        fontSize: 25,
        fontWeight:'bold'
    }
})


export default SwipeableImage