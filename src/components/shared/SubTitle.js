import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Menu extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>{ this.props.subtitle }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000000',
    height: 50
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center'
  }
});