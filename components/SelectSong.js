import { useState, useEffect, useContext } from "react";
import SongContext from "../contexts/SongContext";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";

const SelectSong = () => {

    const { selectedSong, setSelectedSong, setReservedSongs, scoring } = useContext(SongContext);

    const reserve = () => {
        setSelectedSong({})
        setReservedSongs(prev => [...prev, selectedSong]);
    }

    const remove = () => {
        setSelectedSong({})
    }

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    const selectEmpty = isEmpty(selectedSong);

    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold
      });
      if (!fontsLoaded) {
        return <Text>Loading...</Text>;
      }

    return (
        <View style={styles.selectContainer}>
            <Text style={styles.title}>Selected Song:</Text>

            <View style={[
                styles.overallContainer,
                { height: !selectEmpty ? null : 80 }
            ]}
            >
                {(selectEmpty === false) ? (
                    <View style={styles.songContainer}>
                        <Text style={styles.selectedMusic}>
                            {selectedSong.title + " by " + selectedSong.artist}
                        </Text>
                        <View style={styles.reserveRemove}>

                            {!scoring ? (
                                <TouchableOpacity onPress={reserve}>
                                    <Text style={styles.button1}>Reserve</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.wait}>Please wait a moment...</Text>
                            )}

                            <TouchableOpacity
                                onPress={remove}
                            >
                                <Text style={styles.button2}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View />
                )}
            </View>
        </View>
    )
}

export default SelectSong;

const styles = StyleSheet.create({
    selectContainer: {
        marginTop: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 16,
        fontFamily: "Nunito_400Regular"
    },
    overallContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#898989",
        // height: 90,
        marginHorizontal: 5,
        marginTop: 5
    },
    songContainer: {
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 5
    },
    reserveRemove: {
        flexDirection: "row"
    },
    selectedMusic: {
        textAlign: "center",
        marginTop: 8,
        // fontWeight: "bold",
        fontFamily: "Nunito_700Bold"
    },
    button1: {
        textAlign: "center",
        padding: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#898989",
        backgroundColor: "#ffcb61",
        // fontWeight: "bold",
        fontFamily: "Nunito_700Bold"
    },
    button2: {
        textAlign: "center",
        padding: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#898989",
        fontFamily: "Nunito_400Regular"
    },
    wait: {
        color: "red",
        fontStyle: "italic",
        fontFamily: "Nunito_400Regular",
        textAlign: "center",
        padding: 5,
        marginHorizontal: 10,
        marginVertical: 10,
    }
})

