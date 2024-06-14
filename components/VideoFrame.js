import { constants } from "buffer";
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Dimensions, StyleSheet, Text, Animated, Image } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import SongContext from "../contexts/SongContext";
import { useFonts } from "expo-font";
import { Nunito_400Regular, Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import NetInfo from "@react-native-community/netinfo";

const { width: viewportWidth } = Dimensions.get('window');

const screenWidth = Dimensions.get('window').width;
const aspectRatio = 16 / 9;

const playerHeight = screenWidth / aspectRatio;

const VideoFrame = ({ nextMusic }) => {

    const { youtubeID, setYoutubeID, reservedSongs, setScoring } = useContext(SongContext);
    const moveAnimation = useRef(new Animated.Value(0)).current;
    const [isConnected, setIsConnected] = useState(true);
    const [isPlayerReady, setIsPlayerReady] = useState(false)

    useEffect(() => {
        try {
            if (reservedSongs.length > 0) {
                const currentSong = (reservedSongs[0])
                setYoutubeID(currentSong.youtubeID.split('?')[0])
            } else {
                setYoutubeID('')
            }
        } catch (error) {
            console.log(error);
        }

    }, [reservedSongs])

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleStateChange = (state) => {
        if (state === "ended") {

            setScoring(true)

            const score = Math.floor(Math.random() * 14) + 87;
            const youtubeIds = {
                87: 'hNFa1MMEq30',
                88: '4z7FAK9Gf9g',
                89: 'mXelEZtT7lA',
                90: '027WqqHPzm0',
                91: '9Ash_etugqw',
                92: 'BxzXYgff8Mk',
                93: 'fYvHu2bwdrg',
                94: 'sXXVuoNdaKc',
                95: 'B9wUswWo3ig',
                96: 'N33nkBWWi88',
                97: 'tG2-cczJBE4',
                98: 'HyCmZ1gisM4',
                99: 'RoFxKIliIQQ',
                100: '9vcfpoYuSVE'
            };

            setYoutubeID(youtubeIds[score] || '40-3so6UqpI');

            setTimeout(() => {
                nextMusic();
                setTimeout(() => {
                    setScoring(false)
                }, 11000)
            }, 9000)
        }
    };

    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_600SemiBold
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.videoContainer}>
            {(youtubeID) ? (
                <View style={styles.totalContainer}>
                    <View style={styles.connectContainer}>
                        <Image
                            style={styles.connecting}
                            source={require("../assets/connecting.gif")}
                        />
                        <Text
                            style={styles.connectText}
                        >
                            Connecting
                        </Text>
                    </View>
                    <View style={styles.youtubePlayerContainer}>
                        <YoutubePlayer
                            videoId={youtubeID}
                            height={playerHeight}
                            width={"100%"}
                            play={true}
                            onChangeState={handleStateChange}
                            style={[styles.youtubePlayer, StyleSheet.absoluteFillObject]}
                            forceAndroidAutoplay
                        />
                    </View>
                </View>
            ) : (
                <View>
                    {isConnected ?
                        (
                            <Text style={styles.select}>Select a song</Text>
                        ) : (
                            <Text style={styles.select}>⚠️ No internet connection</Text>
                        )}
                </View>
            )}
        </View>
    )
}

export default VideoFrame;

const styles = StyleSheet.create({
    videoContainer: {
        backgroundColor: "#000000",
        height: (playerHeight + 40),
        width: viewportWidth,
        alignItems: "center",
        justifyContent: "center"
    },
    select: {
        color: "#cffa00",
        fontFamily: "Nunito_400Regular",
        fontSize: 20
    },
    connectContainer: {
        backgroundColor: "#000000",
        height: (playerHeight + 40),
        width: viewportWidth,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    connecting: {
        width: 30,
        height: 30
    },
    connectText: {
        color: "#cffa00",
        fontFamily: "Nunito_400Regular",
    },
    totalContainer: {
        flex: 1,
        height: playerHeight
    },
    youtubePlayer: {
        flex: 1,
        zIndex: 9999
    },
    youtubePlayerContainer: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center"
    },
});

