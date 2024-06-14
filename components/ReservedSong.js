import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, ScrollView } from "react-native";
import SongContext from "../contexts/SongContext";
import { useFonts } from "expo-font";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { Anton_400Regular } from "@expo-google-fonts/anton";

const ReservedSong = ({ nextMusic }) => {

    const { youtubeID, setYoutubeID, selectedSong, reservedSongs, setReservedSongs } = useContext(SongContext);

    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Anton_400Regular,
        Nunito_700Bold
      });
      if (!fontsLoaded) {
        return <Text>Loading...</Text>;
      }

    return (
        <View style={styles.overallReservedContainer}>
            <Text style={styles.titleText}>Reserved Songs:</Text>

            <ScrollView style={[
                styles.reservedContainer,
                { height: reservedSongs.length > 0 ? null : 100 }
            ]}>
                {reservedSongs.map((song, index) => {
                    return (
                        <Text
                            key={(song.youtubeID + index)}
                            style={{
                                backgroundColor: index === 0 ? '#ffcb61' : '#e6e6e6',
                                // fontWeight: index === 0 ? 'bold' : 'normal',
                                textAlign: "center",
                                padding: 5,
                                marginBottom: index === (reservedSongs.length - 1) ? 5 : 0,
                                marginTop: 5,
                                marginHorizontal: 5,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: "#898989",
                                fontFamily: index === 0 ? 'Nunito_700Bold' : 'Nunito_400Regular',
                            }}>
                            {song.title + " by " + song.artist}
                        </Text>
                    );
                })}
            </ScrollView>

            <TouchableOpacity
                style={styles.nextButton}
                onPress={nextMusic}>
                <Text style={styles.nextSong}>Next Song</Text>
            </TouchableOpacity>

        </View>
    )
}

export default ReservedSong;

const styles = StyleSheet.create({
    overallReservedContainer: {
        marginTop: 20,
    },
    titleText: {
        textAlign: "center",
        fontSize: 16,
        fontFamily: "Nunito_400Regular"
    },
    reservedContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#898989",
        marginHorizontal: 5,
        marginTop: 5,
        height: 170
    },
    nextSong: {
        textAlign: "center",
        padding: 5,
        paddingVertical: 7,
        // fontWeight: "bold",
        fontSize: 18,
        fontFamily: "Nunito_700Bold",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#898989",
        backgroundColor: "#ffcb61"
    },
    nextButton: {
        marginVertical: 40,
        width: 120,
        justifyContent: "center", 
        alignSelf: "center", 
    }
});