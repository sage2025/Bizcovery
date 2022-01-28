import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <Image source={ this.props.image } style={ styles.image }></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 20,
    resizeMode: 'contain',
  },
  image: {
    width: 100,
    height: 100,
  }
});