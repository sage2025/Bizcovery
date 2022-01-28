import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class HomeItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={() => (this.props.loggedIn == 'true') ? this.props.navigate(this.props.action, {userId: this.props.userId}) : {}} underlayColor="#36454f">
        <View style={styles.view} >
          <Image style={styles.image} source={ this.props.image } />
          <Text style={styles.text}>{ this.props.title }</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  image: {
    width: 70, 
    height: 70
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
});