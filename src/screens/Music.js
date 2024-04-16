import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { songs } from '../MusicData';
import TrackPlayer, { Capability, usePlaybackState, useProgress, State } from 'react-native-track-player';




const { height, width } = Dimensions.get('window');

const Music = () => {
  // const { title, singer, image, song } = route.params.data;
  // const { index } = route.params.index;
  const route = useRoute();
  const playbackState = usePlaybackState();
  const [currentSong, setCurrentSong] = useState(route.params.index);
  const ref = useRef();
  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({
        animated: true,
        index: currentSong,
      });
    }, 100)

  }, []);

  useEffect(() => {
    setupPlayer();
  }, [])

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        // Media controls capabilities
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],

      });
      await TrackPlayer.add(songs);

    } catch (error) {

    }
  }

  const togglePlayBack = async () => {
    const currentPlaybackState = await TrackPlayer.getState();
    console.log(currentPlaybackState)
    if (currentPlaybackState === State.Paused || currentPlaybackState === State.Ready || currentPlaybackState === State.Buffering || currentPlaybackState === State.Connecting) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };


  return (
    <View style={styles.container}>
      <View>
        <FlatList
          ref={ref}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={songs}
          // onScroll={async e => {
          //   const x = e.nativeEvent.contentOffset.x / width;
          //   setCurrentSong(parseInt(x.toFixed(0)));
          //   await TrackPlayer.skip(parseInt(x.toFixed(0)));
          //   togglePlayBack();
          // }}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.bannerView}>
                <Image source={item.artwork} style={styles.banner} />
                <Text style={styles.name}>{item.title}</Text>
              </View>
            );
          }}
          getItemLayout={(data, index) => ({
            length: width, // Width of each item
            offset: width * index, // Start position of the item
            index, // Index of the item
          })}
        />

      </View>
      <Text style={styles.name}>{route.params.title}</Text>
      <Text style={styles.name}>{route.params.singer}</Text>
      <Slider style={styles.sliderView} />
      <View style={styles.btnArea}>
        <TouchableOpacity onPress={async () => {
          if (currentSong >= 0) {
            setCurrentSong(currentSong - 1);
            ref.current.scrollToIndex({
              animated: true,
              index: currentSong - 1,
            });
            await TrackPlayer.skipToPrevious();
            togglePlayBack();

          }
        }}>
          <Image source={require('../images/app-1646213_1280.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
          // await TrackPlayer.skip(1)
          await togglePlayBack();
          // await togglePlayBack(playbackState);
        }}>
          <Image source={require('../images/play.png')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={async () => {
          if (songs.length - 1 > currentSong) {
            setCurrentSong(currentSong + 1);
            ref.current.scrollToIndex({
              animated: true,
              index: currentSong + 1,
            });
            await TrackPlayer.skipToNext();
            togglePlayBack();
          }
        }}>
          <Image source={require('../images/app-1646214_1280.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Music;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerView: {

    width: width,
    height: height / 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 10
  },
  banner: {
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
  },

  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
    color: '#000',
  },
  sliderView: {
    marginTop: 10,
    alignSelf: 'center',
    width: '90%'
  },
  btnArea: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 50,
  },
  icon: {
    width: 30,
    height: 30,
  },
});