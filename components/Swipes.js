import React, {useState} from "react";
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {StyleSheet} from "react-native-web";
import {RectButton} from "react-native-gesture-handler";
import SwipeableImage from './SwipeableImage'

/*
1 - Importer import Swipeable from 'react-native-gesture-handler/Swipeable'
2 - Passer les props du parent App.js en paramètre de la fonction pour y acceder
3 - Creer des hooks booleen vaAimer et son mutateur et vaPasser
4 - Creer 2 fonctions swipe a droite et swipe a gauche
 */

//Recup des valeurs du composants parent App.js = tableau utilisateur + index + 2 fonctions liker et passer
function Swipes({utilisateurs, utilisateurIndex, handleLike, handlePasse}){

    //Hooks d'action is on va aimer ou passer faux par defaut vaAimer = false vaPasser = false
    const [vaAimer, setVaAimer] = useState(false);
    const [vaPasser, setVaPasser] = useState(false);

    //Fontion image vers la gauche

    const renderLeftActions = () => {
        return(
            <RectButton>
                {
                    //Appel du composant SwipeableImage.js + passage en paramètre tableau[index + 1]
                }
                <SwipeableImage utilisateur={utilisateurs[utilisateurIndex + 1]}/>
            </RectButton>
            )

    }

    const renderRightActions = () => {
        return(
            <RectButton>
                {
                    //Idem Appel du composant SwipeableImage.js + passage en paramètre tableau[index + 1]
                }
                <SwipeableImage utilisateur={utilisateurs[utilisateurIndex + 1]}/>
            </RectButton>
        )

    }


    //Les elements de la librairie gesture handler
    //1 - Force du doight (friction) et lacher la carte (leftThreshold) + appel des 2 fonctions keft et right
    //2 - Par defaut tous est false
    //3 - Dans le futur (WillOpen) on change les valeurs booléene grace au mutateur du hook
    //4 - Enfin on appel le composant <SwipeableImage avec en props le tableau utilisateur et son index et les 2 variables hook vaAimer etvaPasser (a false par defaut)


    return(
        <Swipeable
            friction={1}
            leftThreshold={20}
            rightThreshold={20}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableLeftOpen={() => {
                setVaAimer(false)
                handleLike()
            }}
            onSwipeableRightOpen={() => {
                setVaPasser(false)
                handlePasse()
            }}
            onSwipeableLeftWillOpen={() => setVaAimer(true)}
            onSwipeableRightWillOpen={() => setVaPasser(true)}

        >
            <SwipeableImage utilisateur={utilisateurs[utilisateurIndex]} vaAimer={vaAimer} vaPasser={vaPasser}/>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default Swipes;