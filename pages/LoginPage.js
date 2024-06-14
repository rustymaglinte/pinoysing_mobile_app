import { TextInput, Text, View,ScrollView, StyleSheet, TouchableOpacity, Dimensions, Linking } from "react-native";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";
import { useState, useContext, isValidElement } from "react";
import SongContext from "../contexts/SongContext";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const LoginPage = () => {

    const [passkey, setPasskey] = useState('');
    const [isValid, setIsValid] = useState('none')

    const { isCorrectKey, setIsCorrectKey } = useContext(SongContext);

    const password = "ilovekaraoke";

    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold
    });
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    const handleChange = (text) => {
        setPasskey(text);
    }


    const passkeyConfirm = () => {
        if (passkey === password) {
            setIsCorrectKey(true);
            setIsValid("none")
        } else {
            setIsCorrectKey(false);
            setIsValid("flex")
        }
    }

    const handleOpenURL = (url) => {
        Linking.openURL(url);
    };

    return (
        <ScrollView contentContainerStyle={styles.login}>
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter passkey.."
                    onChangeText={handleChange}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={passkeyConfirm}
                >
                    <Text style={styles.buttonText}>Enter app</Text>
                </TouchableOpacity>
            </View>
            <View><Text style={{ color: "red", display: isValid, fontSize: 13 }}>Enter valid passkey</Text></View>
            <View>
                <Text style={styles.instruction1}>Don't know passkey?</Text>
                {/* <Text style={styles.instruction2}>1. Follow the official PinoySing FB page.</Text> */}
                <Text style={styles.instruction2}>Join private group below and look in the Featured section.</Text>
                <TouchableOpacity onPress={() => handleOpenURL('https://www.facebook.com/groups/916709123513482')}>
                    <Text style={styles.instruction3}>PinoySing Group link</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default LoginPage;

const styles = StyleSheet.create({
    login: {
        height: (screenHeight + 100),
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffedc7",
    },
    input: {
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: "#898989",
        backgroundColor: "#e6e6e6",
        height: 50,
        width: 120,
        paddingHorizontal: 5,
        fontFamily: "Nunito_400Regular"
    },
    button: {
        borderWidth: 1,
        height: 50,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: "center",
        backgroundColor: "#ffcb61",
        borderColor: "#898989",
    },
    buttonText: {
        paddingHorizontal: 5,
        fontFamily: "Nunito_700Bold",
        fontSize: 16
    },
    instruction1: {
        textAlign: "center",
        paddingVertical: 20,
        fontFamily: "Nunito_700Bold",
    },
    instruction2: {
        textAlign: "center",
        fontFamily: "Nunito_400Regular",
        fontSize: 13,
        paddingVertical: 3,
        color: "#686868",
    },
    instruction3: {
        textAlign: "center",
        fontFamily: "Nunito_400Regular",
        fontSize: 13,
        color: "#6195ff",
        marginTop: 20,
        textDecorationLine: "underline",
        fontFamily: "Nunito_700Bold",
    },
})

