import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import React from 'react';
import { songs } from '../MusicData.js';
import MusiceListItem from '../common/MusiceListItem';

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>Music App</Text>
      </View>
      <FlatList
        data={songs}
        renderItem={({ item, index }) => {
          return (
            <MusiceListItem item={item} index={index} data={songs} />
          )
        }} />
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    width: '100%',
    elevation: 5,
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: 'red',
    marginLeft: 20
  }
})