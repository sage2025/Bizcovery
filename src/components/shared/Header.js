import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <Image source={require("../../../assets/logo.png")} style={styles.logo}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    padding: 10,
    resizeMode: 'contain'
  },
  logo: {
    resizeMode: 'contain',
    height: 50
  }
});