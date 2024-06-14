import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, SectionList, StatusBar } from "react-native";
import VideoFrame from "../components/VideoFrame";
import SearchSong from "../components/SearchSong";
import SelectSong from "../components/SelectSong";
import SongContext from "../contexts/SongContext";
import ReservedSong from "../components/ReservedSong";
import { useFonts } from "expo-font";
import { Nunito_400Regular } from "@expo-google-fonts/nunito";
import { Anton_400Regular } from "@expo-google-fonts/anton";
import LoginPage from "./LoginPage";

const { height: viewportHeight } = Dimensions.get('window')+100;


const LandingPage = () => {

    const [selectedSong, setSelectedSong] = useState({});
    const [youtubeID, setYoutubeID] = useState('');
    const [reservedSongs, setReservedSongs] = useState([]);
    const [scoring, setScoring] = useState(false)
    const [isCorrectKey, setIsCorrectKey] = useState(false)

    const nextMusic = () => {
        if (reservedSongs.length > 0) {
            const updatedReservedSongs = reservedSongs.slice(1);
            setReservedSongs(updatedReservedSongs);
            // console.log(updatedReservedSongs);
        }
    }


    const [fontsLoaded] = useFonts({
        Anton_400Regular,
        Nunito_400Regular
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    const data = [
        {
            title: 'Search',
            data: [<SearchSong key="search" />],
        },
        {
            title: 'Select',
            data: [<SelectSong key="select" />],
        },
        {
            title: 'Reserved',
            data: [<ReservedSong key="reserved" nextMusic={nextMusic} />],
        },
    ];

    const renderItem = ({ item }) => item;

    return (
        <SongContext.Provider
            value={{
                selectedSong, setSelectedSong,
                youtubeID, setYoutubeID,
                reservedSongs, setReservedSongs,
                scoring, setScoring,
                isCorrectKey, setIsCorrectKey
            }}>
            <View>
                {isCorrectKey ?
                    (
                        <View style={styles.landingContainer}>
                            <VideoFrame nextMusic={nextMusic} />
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>PinoySing</Text>
                            </View>
                            <SectionList
                                sections={data}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => item + index}
                            />
                        </View>
                    ) : (
                        <View>
                            <LoginPage />                       
                        </View>
                    )}

            </View>
        </SongContext.Provider>
    )
}

export default LandingPage;

const styles = StyleSheet.create({
    landingContainer: {
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "#e6e6e6",
        height: viewportHeight,

    },
    title: {
        textAlign: "center",
        fontFamily: "Anton_400Regular",
        fontSize: 25,
        letterSpacing: 1.5,
        paddingBottom: 5
    },
    titleContainer: {
        backgroundColor: "#ffcb61",
        justifyContent: "center",
    },


});