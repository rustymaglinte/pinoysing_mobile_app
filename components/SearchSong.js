import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, ScrollView } from "react-native";
import SongContext from "../contexts/SongContext";
import axios from "axios";
import _ from "lodash";
import { useFonts } from "expo-font";
import { Nunito_400Regular, Nunito_400Regular_Italic } from "@expo-google-fonts/nunito";
import { Anton_400Regular } from "@expo-google-fonts/anton";
import NetInfo from "@react-native-community/netinfo";


const SearchSong = () => {

    const [allSongs, setAllSongs] = useState([]);
    const [query, setQuery] = useState('')
    const [searchResult, setSearchResult] = useState([]);
    const [songResult, setSongResult] = useState([]);
    const [isConnected, setIsConnected] = useState(true);

    const { setSelectedSong } = useContext(SongContext);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('https://projectsbackend-7113dc7e820d.herokuapp.com/pinoysing');
                setAllSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, [isConnected]);


    const handleChange = (text) => {
        setQuery(text);

        const typedSong = text.toLowerCase()

        const filteredSongs = allSongs.filter((item) =>
            (item.title + item.artist).toLowerCase().includes(typedSong)
        );

        setSongResult(filteredSongs);

    }

    useEffect(() => {
        if (query) {
            setSearchResult(songResult);
        }
        if (!query) {
            setSearchResult([]);
        }
        // console.log(searchResult);
    }, [query]);

    const handleSongSelect = (chosenSong) => {
        // console.log("Selected Song:", chosenSong.title);
        setSelectedSong(chosenSong)
        setQuery("");
        setSearchResult([]);
    }

    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Anton_400Regular,
        Nunito_400Regular_Italic
      });
      if (!fontsLoaded) {
        return <Text>Loading...</Text>;
      }


    return (
        <View>
            <Text style={styles.textStyle}>Select a Song</Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="🔍 Search title or artist.."
                    selectionColor={"#ffcb61"}
                    onChangeText={handleChange}
                    value={query}
                />

                <View style={{ zIndex: 99999 }}>
                    {(searchResult.length !== 0) ? (
                        <FlatList
                            style={styles.options}
                            data={searchResult}
                            keyExtractor={(item) => item.youtubeID}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSongSelect(item)}>
                                    <Text style={styles.song}>{item.title + " by " + item.artist}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <View />
                    )}
                </View>
                {/* <ScrollView style={styles.optionsContainer}>
                    {searchResult.map((song) => (
                        <TouchableOpacity key={song.youtubeID} onPress={() => handleSongSelect(song)}>
                            <Text style={styles.song}>{song.title} by {song.artist}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView> */}
            </View>
        </View>
    )
}

export default SearchSong;

const styles = StyleSheet.create({
    textStyle: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        fontFamily: "Nunito_400Regular"
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: "center",
        textAlignVertical: "center",
        marginTop: 5,
        marginHorizontal: 5,
        borderColor: "#898989",
        position: "relative",
        fontFamily: "Nunito_400Regular"
    },
    song: {
        textAlign: "center",
        paddingVertical: 12,
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#898989",
        marginHorizontal: 5,
        // fontStyle: "italic",
        fontFamily: "Nunito_400Regular_Italic",
        color: "#4E4E4E"
    },
    options: {
        // position: "absolute",
        width: "100%",
        backgroundColor: "#e6e6e6",
        zIndex: 999999,
        fontFamily: "Nunito_400Regular"
        // height: 250
    },
});
