import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native';

export default class Menu extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      userId: '',
    }

    this.getAuth();
  }

  getAuth() {
    try {
      AsyncStorage.getItem('user_id').then(res => {
        if (res != null) {
          this.setState({userId: res});
        } else {
          this.setState({userId: ''});
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  navigate() {
    this.props.navigation.navigate(
      this.props.action, { 
        parenttitle: this.props.parenttitle, 
        subtitle: this.props.title, 
        topimage: this.props.topimage, 
        userId: this.state.userId,
        formid: this.props.formid,
        urgent: this.props.urgent,
        urgentLen: this.props.urgentLen,
        routine: this.props.routine,
        routineLen: this.props.routineLen,
        urgentBatch: this.props.urgentBatch,
        routineBatch: this.props.routineBatch,
        entries: this.props.entries,
      });
  }

  render() {
    return (
      <View style={ styles.container }>
        <TouchableHighlight onPress={() => this.navigate()} 
        style={ styles.button }>
          <Text style={ styles.text }>{ this.props.title } &gt;</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e36f2c',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    margin: 10,
    height: 50
  },
  button: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  }
});