import React from 'react';
import { View, Text, StyleSheet, Dimensions } from "react-native";

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const LocationCard = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Text style={styles.header}>{item['3.1']}</Text>
      <Text style={styles.body}>{item['3.2']}</Text>
      <Text style={styles.body}>{item['3.3']}, {item['3.4']} {item['3.5']}</Text>
      <Text style={styles.body}>{item['3.6']}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10
  },
  body: {
    color: "#222",
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10
  }
})

export default LocationCard