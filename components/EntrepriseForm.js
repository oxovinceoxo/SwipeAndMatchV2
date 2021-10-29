import React, {useState} from "react";
import {View, TextInput, TouchableOpacity,ScrollView, Text, StyleSheet} from "react-native";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";


function EntrepriseForm({navigation}){

    const initEntrepriseData = {
        id:null,
        nom:"",
        email:"",
        telephone:"",
        domaine:"",
        password:"",
        password_repeat:""
    }

    //Les hooks
    //Creer une entreprise dans db.json let entreprise = Objet initEntrepriseData
    const [entreprise, setEntreprise] = useState(initEntrepriseData);
    //Booleen par defaut est false (formulaire non valider) let valider = false
    const [valider, setValider] = useState(false);

    //Test de react-hook-form
    const { control, handleSubmit } = useForm();
    const onSubmit =  data => {
        //On creer un nouvelle objet similaire a initEntrepriseData pour le remplir
        //Chaque nouvelle valeur entrer dans le formulaire est egale a la valeur de l'objet initial
        //Creation de la requète http axios + methode + url + promesse
        axios.post("http://localhost:3000/entreprises", data)
            .then(response => {
                //On rempli l'objet entreprise avec le mutatuer setEntreprise du hook
                setEntreprise({
                    id: response.data.id,
                    nom: response.data.nom,
                    email: response.data.email,
                    telephone: response.data.telephone,
                    domaine: response.data.domaine,
                    password: response.data.password,
                    password_repeat: response.data.password_repeat
                });
                //Le booleen valider passe a true
                setValider(true);
                console.log(response.data);
                return data
                //Debug

            })
            //Sinon on declenche une erreur
            .catch(err => {
                console.log("Erreur lors de la creation du profil entreprise ! " + err);
            });
    }


    return(
        <ScrollView>

            {valider ? (
                <View style={styles.container}>
                    <Text style={styles.title}>Vous êtes inscrits</Text>
                    <TouchableOpacity style={styles.buttonValider} onPress={() => navigation.navigate("HomeSwipes")}>
                        <Text style={styles.textBtnValider}>
                            COMMENCER
                        </Text>
                    </TouchableOpacity>
                </View>
            ):(
                <View style={styles.container}>
                    <Text style={styles.title}>
                        ENTREPRISE
                    </Text>
                    <Controller
                        control={control}
                        render={({
                                     field:{onChange, onBlur, value}
                                 }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                placeholder={'NOM'}
                                placeholderTextColor="white"
                                value={value}
                            />
                        )}
                        name="nom"/>


                    <Controller
                        control={control}
                        render={({
                                     field:{onChange, onBlur, value}
                                 }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                placeholder={'EMAIL'}
                                placeholderTextColor="white"
                                value={value}
                            />
                        )}
                        name="email"/>


                    <Controller
                        control={control}
                        render={({
                                     field:{onChange, onBlur, value}
                                 }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                placeholder={'TELEPHONE'}
                                placeholderTextColor="white"
                                value={value}
                            />
                        )}
                        name="telephone"/>


                    <Controller
                        control={control}
                        render={({
                                     field:{onChange, onBlur, value}
                                 }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                placeholder={'NOM DOMAINE'}
                                placeholderTextColor="white"
                                value={value}
                            />
                        )}
                        name="domaine"/>

                    <Controller
                        control={control}
                        render={({
                                     field:{onChange, onBlur, value}
                                 }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                placeholder={'MOT DE PASSE'}
                                placeholderTextColor="white"
                                value={value}
                            />
                        )}
                        name="password"/>


                    <Controller
                        control={control}
                        render={({
                                     field:{onChange, onBlur, value}
                                 }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                placeholder={'CONFIRMER MOT DE PASSE'}
                                placeholderTextColor="white"
                                value={value}
                            />
                        )}
                        name="password_repeat"/>

                    <TouchableOpacity style={styles.buttonValider} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.textBtnValider}>
                            VALIDER
                        </Text>
                    </TouchableOpacity>
                </View>
            )}


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
        justifyContent: "center",
        backgroundColor: "#1f1e1e",
    },
    title:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#ef6e05",
        borderRadius: 40,
        padding: 20,
        width:300,
        color: "white",
        fontSize:24,
        textAlign:"center",
        marginTop:20
    },
    input: {
        width: 300,
        height: 60,
        padding: 10,
        borderWidth: 1,
        borderBottomColor: 'white',
        marginBottom: 10,
        color:"white",
        fontSize:20,
        marginTop:20
    },
    buttonValider:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#ef6e05",
        borderRadius: 40,
        padding: 20,
        width:300,
        marginTop:20
    },
    textBtnValider:{
        color: "white",
        fontSize:24,
        textAlign:"center"
    },
});

export default EntrepriseForm