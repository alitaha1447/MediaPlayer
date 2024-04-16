import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');



const MusiceListItem = ({ item, index, data }) => {

  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.container]}
      onPress={() => navigation.navigate('Music', { data: item, index: index })}>
      <Image source={item.artwork} style={styles.songImage} />
      <View style={styles.nameView}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.name}>{item.singer}</Text>
      </View>
      <TouchableOpacity>
        <Image source={require('../images/play.png')} style={styles.play} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MusiceListItem;
const styles = StyleSheet.create({
  container: {
    width: width - 20,
    height: 100,
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  songImage: {
    width: 100,
    height: 90,
    resizeMode: "cover",
    borderRadius: 10,
    marginLeft: 7,
  },
  nameView: {
    paddingLeft: 15,
    width: '55%'
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black'
  },
  play: {
    width: 30,
    height: 30
  }
})